"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AssetVaultPage from "./AssetVaultPage";
import EmotionalWillPage from "./EmotionalWillPage";
import CollaborationsPage from "./CollaborationsPage";
import MyContactsPage from "./MyContactsPage";
import StoragePage from "./StoragePage";
import SubscriptionPage from "./SubscriptionPage";
import Logo from "../../component/Logo";
import { Menu } from "lucide-react";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("asset-vault");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "emotional-will":
        return <EmotionalWillPage />;
      case "collaborations":
        return <CollaborationsPage />;
      case "my-contacts":
        return <MyContactsPage />;
      case "storage":
        return <StoragePage />;
      case "subscription":
        return <SubscriptionPage />;
      case "asset-vault":
      default:
        return <AssetVaultPage />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <Logo isNav={true} className="text-xl" routeTo="/legacy-vault" />
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-[#1C1F3B]"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 w-full overflow-x-hidden">{renderContent()}</div>
    </div>
  );
}
