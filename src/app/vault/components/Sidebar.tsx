"use client";

import { useState } from "react";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ activeTab = "asset-vault", onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "emotional-will", label: "Emotional Will" },
    { id: "asset-vault", label: "Asset Vault" },
    { id: "collaborations", label: "Collaborations" },
    { id: "my-contacts", label: "My contacts" },
    { id: "storage", label: "Storage" },
    { id: "subscription", label: "Subscription" },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#1F3A52] to-[#2C4A65] text-white min-h-screen sticky top-0 flex flex-col shadow-lg">
      {/* Logo Section */}
      <div className="p-6 border-b border-white border-opacity-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold">
              Beyond <span className="font-light">Moksha</span>
            </h1>
            <p className="text-xs text-blue-200">Legacy Vault</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange?.(item.id)}
            className={`px-4 py-3 rounded-lg transition text-left ${
              activeTab === item.id
                ? "bg-blue-400 text-white"
                : "text-white hover:bg-white hover:bg-opacity-10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer Text */}
      <div className="px-4 py-6 text-center text-xs text-blue-200 border-t border-white border-opacity-10">
        <p>© 2024 Beyond Moksha</p>
      </div>
    </div>
  );
}
