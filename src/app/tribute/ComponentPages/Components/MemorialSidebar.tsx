"use client";

import React from "react";
import { X } from "lucide-react";
import Logo from "@/app/components/utils/Logo";

interface MemorialSidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

const MemorialSidebar: React.FC<MemorialSidebarProps> = ({
  isOpen = false,
  toggleSidebar,
}) => {
  const navItems = [
    { name: "Memorial", href: "#memorial" },
    { name: "Timeline", href: "#timeline" },
    { name: "Gallery", href: "#gallery" },
    { name: "Memory Wall", href: "#memory-wall" },
    { name: "Family Tree", href: "#family-tree" },
    { name: "Events", href: "#events" },
  ];

  /* Active Highlight Logic */
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for sticky headers/comfort

      // Find the current section
      let current = "";
      for (const item of navItems) {
        const id = item.href.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            current = item.href;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-md flex flex-col pt-8 z-50
        transition-transform duration-500 ease-in-out
        ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0" // Removed md: checks to allow full collapse
        }`}
      >
        {/* Close Button) */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={toggleSidebar}
            className="text-[#1F3A4B] hover:text-[#D4A043] transition-colors p-1"
          >
            <X size={26} />
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8 mt-2 scale-[0.65] origin-center w-full">
          <Logo isNav={true} />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-start space-y-2 pl-6 font-serif text-[#1F3A4B] w-full">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center w-full px-4 py-3 rounded-l-lg transition-all duration-300 relative group text-lg
                  ${
                    isActive
                      ? "text-white bg-[#D4A043] shadow-md translate-x-1"
                      : "hover:text-[#D4A043] hover:bg-gray-50"
                  }`}
              >
                {/* Active Indicator Line (Optional design choice, removing simpler highlight above) */}
                <span
                  className={`font-medium tracking-wide ${isActive ? "ml-2" : ""}`}
                >
                  {item.name}
                </span>

                {/* Chevron or indicator if active (optional) */}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white/20 rounded-l-full mr-1" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto mb-8 text-xs text-[#1F3A4B]/60 text-center">
          © {new Date().getFullYear()} Beyond Moksha
        </div>
      </aside>
    </>
  );
};

export default MemorialSidebar;
