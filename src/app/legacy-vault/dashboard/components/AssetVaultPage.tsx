"use client";

import { useState } from "react";
import AssetCard from "./AssetCard";
import Image from "next/image";

export default function AssetVaultPage() {
  const [country, setCountry] = useState("India");

  const greenAssets = [
    { label: "Bank Account", color: "green" as const },
    { label: "Deposit Accounts", color: "green" as const },
    { label: "Post-Office Saving Scheme", color: "green" as const },
    { label: "Bank Locker", color: "green" as const },
    { label: "Insurance", color: "green" as const },
  ];

  const pinkAssets = [
    { label: "Retirement & Pension Accounts", color: "pink" as const },
    { label: "Securities", color: "pink" as const },
    { label: "Real Estate", color: "pink" as const },
    { label: "Vehicles", color: "pink" as const },
    { label: "Intellectual Property", color: "pink" as const },
  ];

  const purpleAssets = [
    { label: "Copyrights", color: "purple" as const },
    { label: "Loan Track", color: "purple" as const },
    { label: "Other", color: "purple" as const },
    { label: "Investment Accounts", color: "purple" as const },
    { label: "Jewelry & Precious Metals", color: "purple" as const },
  ];

  const beigeAssets = [
    { label: "Private Company", color: "beige" as const },
    { label: "Digital Assets", color: "beige" as const },
    { label: "Cryptocurrencies", color: "beige" as const },
  ];

  const iconEmojis = [
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png", // Green
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png", // Pink
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png", // Purple
    "/images/Icon.png",
    "/images/Icon.png",
    "/images/Icon.png", // Beige
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC]">
      <div className="absolute ">
        <Image src="/svgs/vector.svg" alt="Vector" width={500} height={500} />
      </div>
      <div className="absolute right-0">
        <Image src="/svgs/vector.svg" alt="Vector" width={500} height={500} />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-30 pt-12 pb-8 ">
        <div className="text-left mb-8 mt-20">
          <h1 className="text-4xl font-bold text-[#1F3A52] flex justify-between">
            <div>
              Welcome to your{" "}
              <span className="text-[#0866FF]">Asset Vault</span>
              <p className="text-gray-600 mt-2 text-lg font-normal">
                Fill the details below to list your assets
              </p>
            </div>
            <div>
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
        <div className="mb-12">
          <label className="block text-sm font-semibold text-[#1F3A52] mb-3">
            Select your Assets location
          </label>
          <div className="relative">
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {greenAssets.map((asset, idx) => (
                <AssetCard
                  key={idx}
                  icon={iconEmojis[idx]}
                  label={asset.label}
                  color={asset.color}
                />
              ))}
            </div>
          </div>

          {/* Pink Section */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {pinkAssets.map((asset, idx) => (
                <AssetCard
                  key={idx}
                  icon={iconEmojis[greenAssets.length + idx]}
                  label={asset.label}
                  color={asset.color}
                />
              ))}
            </div>
          </div>

          {/* Purple Section */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {purpleAssets.map((asset, idx) => (
                <AssetCard
                  key={idx}
                  icon={
                    iconEmojis[greenAssets.length + pinkAssets.length + idx]
                  }
                  label={asset.label}
                  color={asset.color}
                />
              ))}
            </div>
          </div>

          {/* Beige Section */}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {beigeAssets.map((asset, idx) => (
                <AssetCard
                  key={idx}
                  icon={
                    iconEmojis[
                      greenAssets.length +
                        pinkAssets.length +
                        purpleAssets.length +
                        idx
                    ]
                  }
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
