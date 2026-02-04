"use client";

import { User } from "lucide-react";
import Logo from "../../component/Logo";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({
  activeTab = "asset-vault",
  onTabChange,
  isOpen = false,
  onClose,
}: SidebarProps & { isOpen?: boolean; onClose?: () => void }) {
  const menuItems = [
    { id: "emotional-will", label: "Emotional Will" },
    { id: "asset-vault", label: "Asset Vault" },
    { id: "collaborations", label: "Collaborations" },
    { id: "my-contacts", label: "My contacts" },
    { id: "storage", label: "Storage" },
    { id: "subscription", label: "Subscription" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-gradient-to-b from-[#1C1F3B] to-[#1C1F3B] text-white h-screen flex flex-col shadow-lg
        fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:inset-auto md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-white border-opacity-10">
          <div className="flex items-center gap-2 h-full w-full object-contain">
            <Logo isNav={true} className="text-3xl" routeTo="/legacy-vault" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 py-8 flex flex-col gap-2 `}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={`px-4 py-6 rounded-r-xl transition text-center ${
                activeTab === item.id
                  ? "bg-[#B2C3F8] text-[#1C1F3B] scale-120 border-1 border-[#0866FF]"
                  : "text-white hover:bg-white hover:text-black hover:bg-opacity-10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer Profile Section */}
        <div className="px-4 py-6 ">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg ">
            <div className="w-10 h-10 rounded-full border-2  border-opacity-50 flex items-center justify-center flex-shrink-0">
              <User />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                Name Surname
              </p>
              <p className="text-white text-xs opacity-70 truncate">subtitle</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
