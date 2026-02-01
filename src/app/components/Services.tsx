import Link from "next/link";
import Image from "next/image";
import tributeIcon from "@public/svgs/tribute.svg";
import legacyVaultIcon from "@public/svgs/legacy-vault.svg";
import { BiRightArrowAlt } from "react-icons/bi";

export const Services = () => {
  return (
    <div className="flex flex-wrap h-full items-center justify-center content-center gap-x-20 gap-y-15 mx-auto py-12">
      {/* Tribute Card */}
      <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md border border-gray-300 p-8 max-w-md w-full hover:shadow-xl transition-all duration-300">
        <div className="h-20 w-auto mb-6 flex items-center justify-center">
          <Image
            src={tributeIcon}
            alt="Tribute"
            className="h-full w-auto object-contain"
          />
        </div>
        <h2 className="text-[#1F3A52] text-xl font-lora font-normal mb-2">
          Tribute
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          A special way to celebrate the life, stories, and memories of the
          person you love.
        </p>
        <Link href="/tribute">
          <div className="mt-6 bg-[#D4A043] text-white font-medium px-6 py-3 rounded-full hover:bg-[#C18E33] transition-colors duration-300 cursor-pointer">
            Create Memorial
          </div>
        </Link>
      </div>

      {/* Legacy Vault Card */}
      <div className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md border border-gray-300 p-8 max-w-md w-full hover:shadow-xl transition-all duration-300">
        <div className="h-20 w-auto mb-6 flex items-center justify-center">
          <Image
            src={legacyVaultIcon}
            alt="Legacy Vault"
            className="h-full w-auto object-contain"
          />
        </div>
        <h2 className="text-[#1F3A52] text-xl font-lora font-normal mb-2">
          Legacy Vault
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Save memories, photos, videos, and documents safely for your family.
        </p>
        <Link href="/legacy-vault">
          <div className="mt-6 bg-[#D4A043] text-white font-medium px-6 py-3 rounded-full hover:bg-[#C18E33] transition-colors duration-300 cursor-pointer">
            Create Vault
          </div>
        </Link>
      </div>
    </div>
  );
};
