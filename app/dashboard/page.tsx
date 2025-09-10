"use client";

import Sidebar from "../../components/sidebar2";
import { useSidebarStore } from "../../lib/store/sidebar"; // adjust path

function Page() {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content resizes */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "flex-1" : "flex-[3]"
        } bg-amber-200`}
      >
        <h1 className="p-4">Main Content Area</h1>
      </div>
    </div>
  );
}

export default Page;
