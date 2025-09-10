"use client";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Link from "next/link";
import { LayoutDashboard, Phone, Mail, Menu as Ham } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useState } from "react";

export default function SidebarComponent() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="pt-9 h-screen">
      <Ham
        className="mb-3"
        height={32}
        width={32}
        onClick={() => {
          setCollapse((prev) => !prev);
        }}
      />

      <img className="mb-5" src="/mainflow.jpg" alt="Logo" />

      <Sidebar width="150px" backgroundColor="" collapsed={collapse}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem
            icon={<LayoutDashboard />}
            component={<Link href="/dashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<img src="/phone.svg" alt="Phone" />}
            component={<Link href="/phonebook" />}
          >
            PhoneBook
          </MenuItem>
          <MenuItem
            icon={<img src="/whatsapp.svg" alt="WhatsApp" />}
            component={<Link href="/whatsapp" />}
          >
            Whats App
          </MenuItem>
          <MenuItem icon={<Mail />} component={<Link href="/email" />}>
            Email
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
