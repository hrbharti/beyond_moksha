"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import AssetVaultPage from "./AssetVaultPage";
import EmotionalWillPage from "./EmotionalWillPage";
import CollaborationsPage from "./CollaborationsPage";
import MyContactsPage from "./MyContactsPage";
import StoragePage from "./StoragePage";
import SubscriptionPage from "./SubscriptionPage";
import Logo from "../../component/Logo";
import { Menu } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("asset-vault");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewingVaultId, setViewingVaultId] = useState<string | null>(null);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/legacy-vault");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    // If viewing shared vault, restrict tabs or pass viewingId
    if (viewingVaultId) {
      // Only Asset Vault and Storage available for shared view for now
      if (activeTab === "asset-vault")
        return <AssetVaultPage ownerId={viewingVaultId} />;
      if (activeTab === "storage")
        return <StoragePage ownerId={viewingVaultId} />;
      if (activeTab === "my-contacts")
        return <MyContactsPage ownerId={viewingVaultId} />;
      return (
        <div className="p-8 text-center text-gray-500">
          This section is not available in shared view.
        </div>
      );
    }

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
        onVaultSelect={(vaultId) => {
          setViewingVaultId(vaultId);
          setIsSidebarOpen(false);
        }}
        viewingVaultId={viewingVaultId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 w-full overflow-x-hidden flex flex-col">
        {viewingVaultId && (
          <div className="bg-[#D4A043] text-white px-6 py-2 text-center text-sm font-medium">
            You are viewing a shared vault (Read Only)
          </div>
        )}
        {renderContent()}
      </div>
    </div>
  );
}
