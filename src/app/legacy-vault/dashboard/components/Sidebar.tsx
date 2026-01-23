"use client";

import Logo from "../../component/Logo";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({
  activeTab = "asset-vault",
  onTabChange,
}: SidebarProps) {
  const menuItems = [
    { id: "emotional-will", label: "Emotional Will" },
    { id: "asset-vault", label: "Asset Vault" },
    { id: "collaborations", label: "Collaborations" },
    { id: "my-contacts", label: "My contacts" },
    { id: "storage", label: "Storage" },
    { id: "subscription", label: "Subscription" },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-[#1C1F3B] to-[#1C1F3B] text-white h-screen sticky top-0 flex flex-col shadow-lg">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="8"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
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
  );
}
