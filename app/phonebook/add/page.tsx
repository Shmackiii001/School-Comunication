"use client";
import Link from "next/link";
import Sidebar from "../../../components/sidebar2";
import { useSidebarStore } from "../../../lib/store/sidebar"; 
import { useEffect,useState } from "react";

function Page() {
  const [isSmall, setSmall] = useState(false);
  const [users, setUsers] = useState([]);
  const [parent, setParent] = useState({
    name: "",
    phone: "",
    email: "",
    childName: "",
  });

  useEffect(() => {
    document.addEventListener("resize", () => {
      if (window.innerWidth <= 640) {
        setSmall(true);
      }
    });
  }, []);

  const handleAdd = async () => {
    if (!parent.name || !parent.phone || !parent.email || !parent.childName) {
      alert("Please fill all fields");
      return;
    }
    const res = await fetch("/api/parents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parent),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setParent({ name: "", phone: "", email: "", childName: "" });
      alert("User added successfully");
    }
  };

  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={`transition-all duration-300 overflow-y-auto ${
          isOpen ? "flex-1" : "flex-[3]"
        }`}
      >
        {/* Keep Header */}
        <h1 className="p-4 sticky top-0 bg-gray-200">
          Phone Book //{" "}
          <Link href="/phonebook/add">
            <button className="px-2 py-1 hover:bg-blue-600 cursor-pointer bg-blue-500 text-white rounded-md">
              add
            </button>
          </Link>{" "}
          <Link href="/phonebook/view">
            <button className="px-2 py-1 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-md">
              view
            </button>
          </Link>
        </h1>

        {/* Card */}
        <div className="flex justify-center items-start mt-8 px-4">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Add Parent & Student
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Parent Name</label>
                  <input
                    onChange={(e) => setParent({ ...parent, name: e.target.value })}
                    value={parent.name}
                    className="w-full border border-gray-300 rounded-md p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email</label>
                  <input
                    onChange={(e) => setParent({ ...parent, email: e.target.value })}
                    value={parent.email}
                    className="w-full border border-gray-300 rounded-md p-2"
                    type="email"
                  />
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 mt-4">
                  Excel Upload
                </button>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone No</label>
                  <input
                    onChange={(e) => setParent({ ...parent, phone: e.target.value })}
                    value={parent.phone}
                    className="w-full border border-gray-300 rounded-md p-2"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Student</label>
                  <input
                    onChange={(e) => setParent({ ...parent, childName: e.target.value })}
                    value={parent.childName}
                    className="w-full border border-gray-300 rounded-md p-2"
                    type="text"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 mt-4 self-end"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
