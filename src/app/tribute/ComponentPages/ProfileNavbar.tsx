"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api/api";
import Link from "next/link";
import { Menu, X, User, LogOut, Eye } from "lucide-react";
import Logo from "@/app/components/utils/Logo";

export default function ProfileNavbar() {
  const router = useRouter();
  const [tributeSlug, setTributeSlug] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTribute = async () => {
      try {
        const response = await api.get("/tribute/me");
        if (response.data && !response.data.noProfile) {
          setTributeSlug(response.data.username || response.data.id);
        }
      } catch (error) {
        console.error("Failed to fetch tribute", error);
      }
    };
    fetchTribute();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/tribute/logout");
      toast.success("Logged out successfully");
      router.push("/tribute/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout");
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Logo isNav={true} routeTo="/tribute/profile" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/tribute/account"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-all duration-200"
            >
              <User size={18} />
              <span>My account</span>
            </Link>

            {tributeSlug && (
              <Link
                href={`/tribute/p/${tributeSlug}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-all duration-200"
              >
                <Eye size={18} />
                <span>Public View</span>
              </Link>
            )}

            <div className="h-6 w-px bg-gray-200" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 font-medium rounded-full hover:bg-red-50 transition-all duration-200 group"
            >
              <span>Log out</span>
              <LogOut
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col">
          <Link
            href="/tribute/account"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
              <User size={20} />
            </div>
            My account
          </Link>

          {tributeSlug && (
            <Link
              href={`/tribute/p/${tributeSlug}`}
              target="_blank"
              className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                <Eye size={20} />
              </div>
              Public View
            </Link>
          )}

          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium transition-colors text-left w-full"
          >
            <div className="p-2 bg-red-50 rounded-lg text-red-500">
              <LogOut size={20} />
            </div>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
