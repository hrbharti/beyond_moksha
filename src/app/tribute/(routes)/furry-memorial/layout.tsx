"use client";
import Footer from "@/app/components/Footer"
import Navbar from "../../ComponentPages/Components/Navbar";
import Sidebar from "../../ComponentPages/Components/Sidebar";
import { Suspense } from "react";

import React, { useState } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar toggleSidebar={toggleSidebar} />
      <Suspense fallback={<div>Loading hero section...</div>}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Suspense>

      {/* Main content */}
      <main className="flex-1 mt-[72px] md:mr-72 px-5 md:px-10 py-10 transition-all duration-300">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
