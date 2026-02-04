"use client";

import { useState } from "react";
import AssetCard from "./AssetCard";
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
} from "lucide-react";

export default function AssetVaultPage() {
  const [country, setCountry] = useState("India");

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
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-12 pb-8 relative z-10">
        <div className="text-left mb-8 mt-10 md:mt-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1F3A52] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              Welcome to your{" "}
              <span className="text-[#0866FF]">Asset Vault</span>
              <p className="text-gray-600 mt-2 text-base md:text-lg font-normal">
                Fill the details below to list your assets
              </p>
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
        </div>

        {/* Country Selector */}
        <div className="mb-8 md:mb-12">
          <label className="block text-sm font-semibold text-[#1F3A52] mb-3">
            Select your Assets location
          </label>
          <div className="relative max-w-md">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-6 py-2 border-2 border-gray-300 rounded-lg appearance-none bg-white text-[#1F3A52] font-medium focus:outline-none focus:border-[#2471B6]"
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#1F3A52"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Asset Categories Grid */}
        <div className="space-y-8">
          {/* Green Section */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
              {greenAssets.map((asset, idx) => (
                <AssetCard
                  key={idx}
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
                  icon={asset.icon}
                  label={asset.label}
                  color={asset.color}
                />
              ))}
            </div>
          </div>
        </div>
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
    </div>
  );
}
