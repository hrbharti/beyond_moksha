"use client";

import { useState, useEffect } from "react";
import AssetCard from "./AssetCard";
import AssetModal from "./AssetModal";
import Image from "next/image";
import {
  Landmark,
  PiggyBank,
  Building2,
  Vault,
  ShieldCheck,
  Coins,
  TrendingUp,
  Home,
  Car,
  Lightbulb,
  Copyright,
  Banknote,
  MoreHorizontal,
  Briefcase,
  Gem,
  Building,
  Binary,
  Bitcoin,
  Trash2,
  Loader2
} from "lucide-react";
import api from "@/lib/api/api";
import { ASSET_SCHEMAS } from "../utils/assetSchemas";
import { toast } from "sonner";

interface AssetVaultPageProps {
  ownerId?: string;
}

interface VaultAsset {
  id: string;
  assetType: string;
  details?: Record<string, unknown>;
  notes?: string;
  attachments?: string[];
  updatedAt?: string;
}

export default function AssetVaultPage({ ownerId }: AssetVaultPageProps) {
  const [activeTab, setActiveTab] = useState<"categories" | "my-assets">("categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<VaultAsset | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState<VaultAsset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);

  const isReadOnly = !!ownerId;

  const fetchAssets = async () => {
    try {
      setLoadingAssets(true);
      const url = ownerId ? `/vault/assets?ownerId=${ownerId}` : '/vault/assets';
      const res = await api.get(url);
      setAssets(res.data.assets);
    } catch (error) {
      console.error("Failed to fetch assets", error);
      toast.error("Failed to fetch assets");
    } finally {
      setLoadingAssets(false);
    }
  };

  useEffect(() => {
    if (activeTab === "my-assets") {
      fetchAssets();
    }
  }, [activeTab, ownerId]);

  const handleDeleteAsset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    try {
      await api.delete(`/vault/assets/${id}`);
      toast.success("Asset deleted");
      fetchAssets();
    } catch (error) {
      console.error("Failed to delete asset", error);
      toast.error("Failed to delete asset");
    }
  };

  const handleAssetClick = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const greenAssets = [
    {
      label: "Bank Account",
      color: "green" as const,
      icon: <Landmark className="w-8 h-8 text-[#2E8B57]" />,
    },
    {
      label: "Deposit Accounts",
      color: "green" as const,
      icon: <PiggyBank className="w-8 h-8 text-[#2E8B57]" />,
    },
    {
      label: "Post-Office Saving Scheme",
      color: "green" as const,
      icon: <Building2 className="w-8 h-8 text-[#2E8B57]" />,
    },
    {
      label: "Bank Locker",
      color: "green" as const,
      icon: <Vault className="w-8 h-8 text-[#2E8B57]" />,
    },
    {
      label: "Insurance",
      color: "green" as const,
      icon: <ShieldCheck className="w-8 h-8 text-[#2E8B57]" />,
    },
  ];

  const pinkAssets = [
    {
      label: "Retirement & Pension Accounts",
      color: "pink" as const,
      icon: <Coins className="w-8 h-8 text-[#BD4B8B]" />,
    },
    {
      label: "Securities",
      color: "pink" as const,
      icon: <TrendingUp className="w-8 h-8 text-[#BD4B8B]" />,
    },
    {
      label: "Real Estate",
      color: "pink" as const,
      icon: <Home className="w-8 h-8 text-[#BD4B8B]" />,
    },
    {
      label: "Vehicles",
      color: "pink" as const,
      icon: <Car className="w-8 h-8 text-[#BD4B8B]" />,
    },
    {
      label: "Intellectual Property",
      color: "pink" as const,
      icon: <Lightbulb className="w-8 h-8 text-[#BD4B8B]" />,
    },
  ];

  const purpleAssets = [
    {
      label: "Copyrights",
      color: "purple" as const,
      icon: <Copyright className="w-8 h-8 text-[#7B4BBD]" />,
    },
    {
      label: "Loan Track",
      color: "purple" as const,
      icon: <Banknote className="w-8 h-8 text-[#7B4BBD]" />,
    },
    {
      label: "Other",
      color: "purple" as const,
      icon: <MoreHorizontal className="w-8 h-8 text-[#7B4BBD]" />,
    },
    {
      label: "Investment Accounts",
      color: "purple" as const,
      icon: <Briefcase className="w-8 h-8 text-[#7B4BBD]" />,
    },
    {
      label: "Jewelry & Precious Metals",
      color: "purple" as const,
      icon: <Gem className="w-8 h-8 text-[#7B4BBD]" />,
    },
  ];

  const beigeAssets = [
    {
      label: "Private Company",
      color: "beige" as const,
      icon: <Building className="w-8 h-8 text-[#BDB54B]" />,
    },
    {
      label: "Digital Assets",
      color: "beige" as const,
      icon: <Binary className="w-8 h-8 text-[#BDB54B]" />,
    },
    {
      label: "Cryptocurrencies",
      color: "beige" as const,
      icon: <Bitcoin className="w-8 h-8 text-[#BDB54B]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC] overflow-x-hidden relative">
      <div className="absolute top-0 left-0 hidden lg:block pointer-events-none">
        <Image src="/svgs/vector.svg" alt="Vector" width={500} height={500} />
      </div>
      <div className="absolute top-0 right-0 hidden lg:block pointer-events-none">
        <Image src="/svgs/vector.svg" alt="Vector" width={500} height={500} />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 pt-16 pb-8 relative z-10">
        <div className="text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F3A52] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-[#0866FF]">
                {isReadOnly
                  ? "Shared Asset Vault"
                  : "Welcome to your Asset Vault"}
              </span>
              {!isReadOnly && (
                <p className="text-gray-600 mt-2 text-base md:text-lg font-normal">
                  Manage and view your assets securely
                </p>
              )}
              {isReadOnly && (
                <p className="text-gray-600 mt-2 text-base md:text-lg font-normal">
                  You have read-only access to this vault.
                </p>
              )}
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/Frame.png"
                alt="Vector"
                width={150}
                height={150}
              />
            </div>
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 mt-8">
            <button
              onClick={() => setActiveTab("categories")}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${activeTab === "categories"
                ? "text-[#0866FF]"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Add New Asset
              {activeTab === "categories" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0866FF] rounded-t-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("my-assets")}
              className={`pb-4 px-2 text-lg font-medium transition-colors relative ${activeTab === "my-assets"
                ? "text-[#0866FF]"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              My Assets
              {activeTab === "my-assets" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0866FF] rounded-t-full" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "categories" ? (
          <div className="space-y-8">
            {/* Green Section */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                {greenAssets.map((asset, idx) => (
                  <AssetCard
                    key={idx}
                    onClick={() => handleAssetClick(asset.label)}
                    icon={asset.icon}
                    label={asset.label}
                    color={asset.color}
                  />
                ))}
              </div>
            </div>

            {/* Pink Section */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                {pinkAssets.map((asset, idx) => (
                  <AssetCard
                    key={idx}
                    onClick={() => handleAssetClick(asset.label)}
                    icon={asset.icon}
                    label={asset.label}
                    color={asset.color}
                  />
                ))}
              </div>
            </div>

            {/* Purple Section */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                {purpleAssets.map((asset, idx) => (
                  <AssetCard
                    key={idx}
                    onClick={() => handleAssetClick(asset.label)}
                    icon={asset.icon}
                    label={asset.label}
                    color={asset.color}
                  />
                ))}
              </div>
            </div>

            {/* Beige Section */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                {beigeAssets.map((asset, idx) => (
                  <AssetCard
                    key={idx}
                    onClick={() => handleAssetClick(asset.label)}
                    icon={asset.icon}
                    label={asset.label}
                    color={asset.color}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#1F3A52] mb-6">My Assets</h2>

            {loadingAssets ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#0866FF]" />
              </div>
            ) : assets.length > 0 ? (
              <div className="flex flex-col gap-4">
                {assets.map((asset) => {
                  let IconComponent = Landmark;
                  // Try to match icon based on category logic roughly
                  if (pinkAssets.find(a => a.label === asset.assetType)) IconComponent = Coins;
                  else if (purpleAssets.find(a => a.label === asset.assetType)) IconComponent = Briefcase;
                  else if (beigeAssets.find(a => a.label === asset.assetType)) IconComponent = Building;

                  return (
                    <div
                      key={asset.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow relative bg-white group flex flex-col sm:flex-row items-start sm:items-center gap-4 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(asset.assetType);
                        setSelectedAsset(asset);
                        setIsModalOpen(true);
                      }}
                    >
                      {/* Left: Icon Box */}
                      <div className="w-16 h-16 rounded-xl border border-gray-100 flex items-center justify-center bg-white shadow-sm shrink-0">
                        <IconComponent className="w-8 h-8 text-[#4299E1]" />
                      </div>

                      {/* Middle: Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#1F3A52]">
                          {((asset.details as any)?.nickname || (asset.details as any)?.accountNickname || (asset.details as any)?.vehicleNickname || asset.assetType || "Unnamed Asset")}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {`Last Edited: ${asset.updatedAt ? new Date(asset.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "08 Mar 2026"}`}
                        </p>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-6 shrink-0 mt-2 sm:mt-0 self-end sm:self-auto">
                        {!isReadOnly && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAsset(asset.id);
                            }}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 absolute bottom-2 sm:bottom-auto right-2 sm:right-16"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-200">
                  <Vault className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No assets found</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  {isReadOnly
                    ? "This user hasn't saved any assets yet."
                    : "You haven't saved any assets to your vault yet. Switch to the Add tab to begin."}
                </p>
                {!isReadOnly && (
                  <button
                    onClick={() => setActiveTab("categories")}
                    className="px-6 py-2.5 bg-[#0866FF] text-white rounded-xl hover:bg-[#0756d6] transition-colors font-medium shadow-sm inline-flex items-center gap-2"
                  >
                    Add Your First Asset
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Illustration Section */}
      <div className="max-w-6xl mx-auto flex justify-end ">
        <div className="bg-[#F1F8FC] rounded-lg p-8 text-center">
          <Image
            src="/images/info.png"
            alt="Asset Illustration"
            width={600}
            height={400}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Asset Form Modal */}
      {selectedCategory && (
        <AssetModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            if (activeTab === "my-assets") fetchAssets();
          }}
          category={selectedCategory}
          ownerId={ownerId}
          asset={selectedAsset}
          onDelete={selectedAsset && !isReadOnly ? () => {
            handleDeleteAsset(selectedAsset.id);
            setIsModalOpen(false);
          } : undefined}
        />
      )}
    </div>
  );
}
