"use client";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC] flex items-center justify-center">
      <div className="text-center px-8">
        <h1 className="text-4xl font-bold text-[#1F3A52] mb-4">
          Subscription
        </h1>
        <p className="text-lg text-gray-600">
          Manage your subscription plans and billing
        </p>
        <button className="mt-8 bg-gradient-to-r from-[#1867AE] to-[#2471B6] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
          Upgrade Plan
        </button>
      </div>
    </div>
  );
}
