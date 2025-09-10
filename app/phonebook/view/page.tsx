"use client";

import Link from "next/link";
import Sidebar from "../../../components/sidebar2";
import { useSidebarStore } from "../../../lib/store/sidebar"; 
import { useEffect, useState, useMemo } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Import icons

// define type for your data
interface Parent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  childName: string;
}

function Page() {
  const isOpen = useSidebarStore((state) => state.isOpen);

  // tell TS that `parents` is an array of Parent objects
  const [parents, setParents] = useState<Parent[]>([]);
  const [filteredParents, setFilteredParents] = useState<Parent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");

  useEffect(() => {
    fetch("/api/parents")
      .then((res) => res.json())
      .then((data: Parent[]) => {
        setParents(data);
        setFilteredParents(data);
      });
  }, []);

  // Apply filters when any filter value changes
  useEffect(() => {
    let result = parents;
    
    if (nameFilter) {
      result = result.filter(parent => 
        parent.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    if (emailFilter) {
      result = result.filter(parent => 
        parent.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }
    
    if (phoneFilter) {
      result = result.filter(parent => 
        parent.phone.includes(phoneFilter)
      );
    }
    
    if (studentFilter) {
      result = result.filter(parent => 
        parent.childName.toLowerCase().includes(studentFilter.toLowerCase())
      );
    }
    
    setFilteredParents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [nameFilter, emailFilter, phoneFilter, studentFilter, parents]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredParents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParents.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Handle filter submission (optional - could be used if you prefer button-based filtering)
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect above already handles filtering in real-time
    // This function is kept if you want to switch to button-based filtering
  };

  // Handle delete action
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this parent?")) {
      // Navigate to delete page or call API directly
      window.location.href = `/phonebook/delete/${id}`;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content resizes */}
      <div
        className={`transition-all duration-300 overflow-y-auto ${
          isOpen ? "flex-1" : "flex-[3]"
        }`}
      >
        <h1 className="p-4 sticky top-0 bg-gray-200 z-10">
          Phone Book //{" "}
          <Link href="/phonebook/add">
            <button className="cursor-pointer rounded-md bg-gray-300 px-2 py-1 hover:bg-gray-400 transition-colors">add</button>
          </Link>{" "}
          <Link href="/phonebook/view">
            <button className="bg-blue-500 text-white cursor-pointer rounded-md px-2 py-1 hover:bg-blue-600 transition-colors">view</button>
          </Link>
        </h1>

        {/* make this tall to test scrolling */}
        <div className="flex flex-col min-h-[150vh]">
          {/* top wrapper */}
          <div className="flex-[1/2] p-4 flex flex-col">
            <form onSubmit={handleFilter} className="flex gap-[150px] pl-6 h-full max-sm:flex-col max-sm:gap-[10px]">
              {/* 1st split */}
              <div className="flex-[1] flex flex-col ">
                <div className="mb-4">
                  <span className="mr-5 block mb-1">Parent Name</span>{" "}
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                    type="text"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </div>
                <div>
                  <span className="mr-18 block mb-1">Email</span>{" "}
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                    type="text"
                    value={emailFilter}
                    onChange={(e) => setEmailFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* 2nd split */}
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="block mb-1">Phone No</span>{" "}
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                    type="text"
                    value={phoneFilter}
                    onChange={(e) => setPhoneFilter(e.target.value)}
                  />
                </div>
                <div>
                  <span className="mr-4 block mb-1">Student</span>{" "}
                  <input
                    className="border border-gray-300 rounded-md p-2 w-full max-w-xs"
                    type="text"
                    value={studentFilter}
                    onChange={(e) => setStudentFilter(e.target.value)}
                  />
                </div>
                {/* push button to bottom-right */}
                <div className="mr-5 mt-8 flex items-end justify-end">
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white rounded-md p-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                    Find
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setNameFilter("");
                      setEmailFilter("");
                      setPhoneFilter("");
                      setStudentFilter("");
                    }}
                    className="ml-2 bg-gray-500 text-white rounded-md p-2 px-4 hover:bg-gray-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* bottom wrapper */}
          <div className="flex-[2]">
            <div className="overflow-y-auto h-full pt-4 w-full">
              <div className="flex justify-between items-center mb-4 px-8">
                <div className="text-sm text-gray-600">
                  Showing {filteredParents.length === 0 ? 0 : indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredParents.length)} of{" "}
                  {filteredParents.length} entries
                </div>
                
                <div className="flex items-center space-x-2">
                  <span>Rows per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border rounded p-1"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              
              <table className="mx-auto w-[90%]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Parent Name</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone No</th>
                    <th className="border px-4 py-2">Student</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item._id}>
                        <td className="border px-4 py-2">{item.name}</td>
                        <td className="border px-4 py-2">{item.email}</td>
                        <td className="border px-4 py-2">{item.phone}</td>
                        <td className="border px-4 py-2">{item.childName}</td>
                        <td className="border px-4 py-2">
                          <div className="flex justify-center space-x-2">
                            {/* Edit icon that links to edit page */}
                            <Link href={`/phonebook/view/edit/${item._id}`}>
                              <FiEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                            </Link>
                            {/* Delete icon with confirmation */}
                            <FiTrash2 
                              className="text-red-500 cursor-pointer hover:text-red-700" 
                              onClick={() => handleDelete(item._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="border px-4 py-4 text-center">
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>  
              </table>
              
              {/* Pagination controls */}
              <div className="flex justify-between items-center mt-4 px-8 pb-8">
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border ${
                      currentPage === 1 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>
                  
                  {/* Page number dropdown */}
                  <select
                    value={currentPage}
                    onChange={(e) => paginate(Number(e.target.value))}
                    className="border rounded px-3 py-1"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <option key={page} value={page}>
                        {page}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages || totalPages === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;