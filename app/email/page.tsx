"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar2";
import { useSidebarStore } from "../../lib/store/sidebar";

// Define TypeScript interfaces
interface Contact {
  _id: string;
  name: string;
  phone: string;
  childName:string;
  email:string;
  // Add other fields as needed from your MongoDB schema
}

function Page() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/parents");
        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)||contact.childName.toLowerCase().includes(searchTerm.toLocaleLowerCase())||
    contact.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  // Handle contact selection
  const toggleContact = (contact: Contact) => {
    if (selectedContacts.some(c => c._id === contact._id)) {
      setSelectedContacts(selectedContacts.filter(c => c._id !== contact._id));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  // Select all contacts
  const selectAllContacts = () => {
    setSelectedContacts([...contacts]);
  };

  // Remove selected contact
  const removeContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter(c => c._id !== contactId));
  };

  // Send message via Twilio API
  const sendMessage = async () => {
    if (selectedContacts.length === 0 || !message.trim()) {
      alert("Please select at least one contact and enter a message");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contacts: selectedContacts,
          message: message.trim(),
        }), 
      });
      const result = await response.json();
      
      if (response.ok) {
        alert("Message sent successfully!");
        setMessage("");
        setSelectedContacts([]);
      } else {
        alert(`Failed to send message: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending the message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "flex-1" : "flex-[3]"
        }`}
      >
        <div className="flex gap-4 p-4 h-full max-sm:flex-col">
          {/* Left section - Selected contacts and message */}
          <div className="flex-1 flex flex-col max-sm:order-2 ">
            <div className="bg-white rounded-lg shadow p-4 mb-4 flex-1">
              <button 
                onClick={selectAllContacts}
                className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition-colors mb-4"
              >
                Select All
              </button>
              
              <div className="bg-gray-100 rounded-lg p-3 h-64 overflow-y-auto">
                {selectedContacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">
                    No contacts selected. Select contacts from the right or click "Select All".
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedContacts.map(contact => (
                      <div 
                        key={contact._id} 
                        className="bg-blue-100 text-blue-800 rounded-full py-1 px-3 flex items-center"
                      >
                        <span>{contact.name}</span>
                        <button 
                          onClick={() => removeContact(contact._id)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex-1">
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
              />
            </div>
          </div>
          
          {/* Right section - Search and contact list */}
          <div className="w-80 flex flex-col max-sm:order-1 ">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search contacts..."
              />
              
              <div className="bg-gray-100 rounded-lg p-3 mt-3 h-64 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500 text-center py-10">Loading contacts...</p>
                ) : filteredContacts.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">
                    {searchTerm ? "No contacts found" : "No contacts available"}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {filteredContacts.map(contact => (
                      <li 
                        key={contact._id}
                        onClick={() => toggleContact(contact)}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          selectedContacts.some(c => c._id === contact._id)
                            ? "bg-blue-100 text-blue-800"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-600">{contact.phone}</div>
                        <div className="text-sm text-gray-600">{contact.childName}</div>
                        <div className="text-sm text-gray-600">{contact.email}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <div className="max-sm:absolute max-sm:bottom-[-60px] flex justify-center items-center bg-white rounded-lg shadow p-4 mt-auto">
              <button 
                onClick={sendMessage}
                disabled={sending || selectedContacts.length === 0 || !message.trim()}
                className={`py-2 px-6 rounded-lg transition-colors ${
                  sending || selectedContacts.length === 0 || !message.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;