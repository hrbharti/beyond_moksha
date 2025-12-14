"use client";

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC] flex items-center justify-center">
      <div className="text-center px-8">
        <h1 className="text-4xl font-bold text-[#1F3A52] mb-4">
          Storage
        </h1>
        <p className="text-lg text-gray-600">
          View your storage usage and manage your files
        </p>
        <div className="mt-8 bg-white rounded-lg p-8 max-w-md mx-auto">
          <div className="mb-4">
            <p className="text-lg font-semibold text-[#1F3A52]">Storage Used</p>
            <div className="mt-4 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-[#1867AE] to-[#2471B6] h-full w-1/3"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">2.5 GB / 10 GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
