"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import AssetVaultPage from "./AssetVaultPage";
import EmotionalWillPage from "./EmotionalWillPage";
import CollaborationsPage from "./CollaborationsPage";
import MyContactsPage from "./MyContactsPage";
import StoragePage from "./StoragePage";
import SubscriptionPage from "./SubscriptionPage";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("asset-vault");

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
    <div className="flex gap-0">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1  bg-red-400">{renderContent()}</div>
    </div>
  );
}
