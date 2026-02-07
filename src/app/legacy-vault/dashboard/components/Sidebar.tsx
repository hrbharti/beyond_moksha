import { LogOut, Users, User } from "lucide-react";
import Logo from "../../component/Logo";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import api from "@/lib/api/api";

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onVaultSelect?: (vaultId: string | null) => void;
  viewingVaultId?: string | null;
}

export default function Sidebar({
  activeTab = "asset-vault",
  onTabChange,
  onVaultSelect,
  viewingVaultId,
  isOpen = false,
  onClose,
}: SidebarProps & { isOpen?: boolean; onClose?: () => void }) {
  const { user, logout } = useUser();
  const [sharedVaults, setSharedVaults] = useState<any[]>([]);

  useEffect(() => {
    const fetchSharedVaults = async () => {
      try {
        const res = await api.get("/vault/shared-with-me");
        setSharedVaults(res.data.sharedVaults);
      } catch (error) {
        console.error("Failed to fetch shared vaults", error);
      }
    };
    if (user) fetchSharedVaults();
  }, [user]);

  const menuItems = [
    { id: "asset-vault", label: "Asset Vault" },
    { id: "emotional-will", label: "Emotional Will" },
    { id: "collaborations", label: "Collaborations" },
    { id: "my-contacts", label: "My contacts" },
    { id: "storage", label: "Storage" },
    { id: "subscription", label: "Subscription" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-[#1C1F3B] text-white h-screen flex flex-col
        fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:inset-auto md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-white border-opacity-10">
          <div className="flex items-center gap-2 h-full w-full object-contain">
            <Logo isNav={true} className="text-3xl" routeTo="/legacy-vault" />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 py-4 flex flex-col gap-2 overflow-y-auto`}>
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            My Vault
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange?.(item.id);
                onVaultSelect?.(null); // Switch back to my vault
              }}
              className={`px-4 py-3 mx-2 rounded-lg transition text-left flex items-center gap-3 ${
                activeTab === item.id && !viewingVaultId
                  ? "bg-[#B2C3F8] text-[#1C1F3B] font-medium"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}

          {sharedVaults.length > 0 && (
            <>
              <div className="px-4 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Shared With Me
              </div>
              {sharedVaults.map((vault) => (
                <button
                  key={vault.id}
                  onClick={() => {
                    onVaultSelect?.(vault.id);
                    onTabChange?.("asset-vault"); // Default to asset vault when switching
                  }}
                  className={`px-4 py-3 mx-2 rounded-lg transition text-left flex items-center gap-3 ${
                    viewingVaultId === vault.id
                      ? "bg-[#D4A043] text-white font-medium"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Users size={16} />
                  <span className="truncate">{vault.name}'s Vault</span>
                </button>
              ))}
            </>
          )}
        </nav>

        {/* Footer Profile Section */}
        <div className="px-4 py-6 border-t border-white/10">
          {user ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
              <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center bg-white/10">
                <span className="text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user.name}
                </p>
                <p className="text-white text-xs opacity-70 truncate">
                  {user.email}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 hover:bg-white/10 rounded-full transition text-white/70 hover:text-white"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => (window.location.href = "/legacy-vault")}
                className="text-white/70 hover:text-white text-sm underline"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
