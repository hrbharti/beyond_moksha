"use client";

import { useState } from "react";
import Logo from "./Logo";
import { Menu, X, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Navbar({ isNav }: { isNav?: boolean }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useUser();
  const navItems = [
    { name: "Products", id: "products" },
    { name: "Why Choose Us", id: "why-choose" },
    { name: "Security", id: "security" },
  ];

  return (
    <>
      <div className="h-24 md:h-40 w-full flex justify-center items-center px-4 md:px-30 sticky top-0 z-50">
        <div className="flex h-16 md:h-[50%] w-full items-center justify-between px-4 md:px-6 py-2 md:py-12 rounded-[20px] border border-[#3B82F6]/30 bg-[#F1F8FC]/90 md:bg-[#F1F8FC]/65 backdrop-blur-sm shadow-sm">
          {/* Logo */}
          <div className="ml-0 md:ml-4">
            <Logo
              isNav={isNav}
              className="text-xl md:text-2xl"
              routeTo="/"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2 px-16 items-center">
            <div className="flex items-center ml-20 text-[#1E293B] text-lg">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/legacy-vault#${item.id}`}
                  className="mx-4 cursor-pointer hover:text-[#0866FF] transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/legacy-vault/dashboard"
                  className="flex items-center gap-2 px-4 py-2  bg-white/50 rounded-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-2 text-white rounded-md hover:opacity-90 transition shadow-md flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/legacy-vault/login"
                className="bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-2 text-white rounded-md hover:opacity-90 transition shadow-md"
              >
                Log In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-[#1E293B]"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute top-0 right-0 h-full w-[280px] bg-[#F1F8FC] shadow-2xl p-6 flex flex-col gap-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="font-lora font-semibold text-xl text-[#3C609B]">
                Menu
              </span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/legacy-vault#${item.id}`}
                  className="text-lg text-[#1E293B] font-medium hover:text-[#0866FF] transition cursor-pointer"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/70 rounded-lg">
                    <User className="w-5 h-5 text-[#1E293B]" />
                    <span className="text-sm text-[#1E293B] font-medium">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileOpen(false);
                    }}
                    className="w-full bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-3 text-white rounded-lg hover:opacity-90 transition shadow-md font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/legacy-vault/login"
                  className="w-full bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-3 text-white rounded-lg hover:opacity-90 transition shadow-md font-medium"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
