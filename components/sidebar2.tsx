"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "../lib/store/sidebar"; 

function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebarStore();

  return (
    <div
      className={`${isOpen? "w-[250px] transition-all duration-300": "w-[60px] transition-all duration-300"}bg-gray-200  sticky top-0 h-[100vh] self-start`}
       style={{ width: isOpen ? "250px" : "60px",transition:"all 300ms ease-in-out" }}
    >
      {/* Hamburger */}
      <div className="pl-2 pb-4 pt-1">
        <img
          src="/ham.svg"
          alt="hamburger"
          height={24}
          width={24}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Logo */}
      <div className={`${isOpen? "w-[190px]": "w-[60px]"} flex justify-center `}>
        <img src="/mainflow.jpg" alt="mainflow" />
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 pt-[100px]">
        <Link
          className={`flex items-center w-full px-4 py-2 ${
            pathname === "/dashboard" ? "bg-blue-300" : ""
          }`}
          href="/dashboard"
        >
          <img src="/dashboard.svg" alt="dashboard" height={24} width={24} />
          {isOpen && <span className="ml-3">Dashboard</span>}
        </Link>

        <Link
          className={`flex items-center w-full px-4 py-2 ${
            pathname === "/phonebook/add" || pathname === "/phonebook/view" ? "bg-blue-300" : ""
          }`}
          href="/phonebook/add"
        >
          <img src="/phone.svg" alt="PhoneBook" height={24} width={24} />
          {isOpen && <span className="ml-3">PhoneBook</span>}
        </Link>

        <Link
          className={`flex items-center w-full px-4 py-2 ${
            pathname === "/whatsapp" ? "bg-blue-300" : ""
          }`}
          href="/whatsapp"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" height={24} width={24} />
          {isOpen && <span className="ml-3">WhatsApp</span>}
        </Link>

        <Link
          className={`flex items-center w-full px-4 py-2 ${
            pathname === "/email" ? "bg-blue-300" : ""
          }`}
          href="/email"
        >
          <img src="/email.svg" alt="Email" height={24} width={24} />
          {isOpen && <span className="ml-3">Email</span>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
