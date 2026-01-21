"use client";

import React, { useState } from "react";
import MemorialSidebar from "../../ComponentPages/Components/MemorialSidebar";
import Footer from "@/app/components/Footer";
import { Menu } from "lucide-react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col bg-white min-h-screen relative">
      {/* Sidebar */}
      <MemorialSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 text-[#1F3A4B] bg-white border border-[#1F3A4B]/20 px-3 py-2 rounded-md shadow-sm transition-all duration-300 ${
          isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Menu />
      </button>

      {/* Main Content */}
      <main
        className={`flex flex-col flex-1 overflow-x-hidden transition-all duration-500 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-0"
        }`}
      >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
