"use client";

import React from "react";
import { X, Settings, Palette, ChevronLeft } from "lucide-react";
import Logo from "@/app/components/utils/Logo";

interface ProfileSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  isEditing: boolean;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isOpen,
  toggleSidebar,
  accentColor,
  setAccentColor,
  isEditing,
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
      const scrollPosition = window.scrollY + 150;

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
    handleScroll();
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
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 shadow-2xl flex flex-col pt-8 z-50
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors md:hidden"
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8 px-6">
          <Logo isNav={true} routeTo="/tribute" />
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-2 text-gray-500 hover:text-gray-800 transition-colors bg-gray-50 rounded-lg"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-8">
          {/* Navigation Links */}
          <nav className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
              Menu
            </h3>
            {navItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 group
                    ${
                      isActive
                        ? "text-white shadow-lg shadow-gray-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  style={{
                    backgroundColor: isActive ? accentColor : undefined,
                  }}
                >
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {isEditing && (
            <div className="space-y-6 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 flex items-center gap-2">
                <Settings size={14} /> Personalization
              </h3>

              {/* Colors */}
              <div className="space-y-4 px-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Palette size={16} /> Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="h-10 w-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                    />
                    <span className="text-xs text-gray-500 font-mono">
                      {accentColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 text-xs text-gray-400 text-center border-t border-gray-100 mt-auto">
          © {new Date().getFullYear()} Beyond Moksha
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;
