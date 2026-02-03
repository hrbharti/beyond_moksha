"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import api from "@/lib/api/api";
import { User, Save, Globe, Mail, Shield, X, Lock } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface TributeSettings {
  id: string;
  name: string;
  username?: string;
  isPublic: boolean;
  email?: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  // Tribute state
  const [tributes, setTributes] = useState<TributeSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Change Password State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Visual state
  const accentColor = "#D4A043"; // Matching the gold accent

  const fetchData = useCallback(async () => {
    try {
      const [userRes, tributesRes] = await Promise.allSettled([
        api.get("/auth/me"),
        api.get("/tribute/all"),
      ]);

      if (userRes.status === "fulfilled") {
        setUser(userRes.value.data);
        setName(userRes.value.data.name);
        setEmail(userRes.value.data.email);
      }

      if (tributesRes.status === "fulfilled") {
        setTributes(tributesRes.value.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error("Failed to load account settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/auth/me", { name });
      toast.success("Profile information updated");
    } catch (error) {
      console.error("Save error", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (
    tributeId: string,
    currentStatus: boolean,
  ) => {
    try {
      const newStatus = !currentStatus;
      // Optimistic update
      setTributes((prev) =>
        prev.map((t) =>
          t.id === tributeId ? { ...t, isPublic: newStatus } : t,
        ),
      );

      await api.put(`/tribute/${tributeId}`, {
        isPublic: newStatus,
      });
      toast.success(`Tribute is now ${newStatus ? "Public" : "Private"}`);
    } catch (error) {
      console.error("Error updating visibility", error);
      toast.error("Failed to update visibility");
      // Revert on error
      setTributes((prev) =>
        prev.map((t) =>
          t.id === tributeId ? { ...t, isPublic: currentStatus } : t,
        ),
      );
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setUpdatingPassword(true);
    try {
      await api.post("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully");
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Password update error", error);
      setPasswordError(
        error.response?.data?.message || "Failed to update password",
      );
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: accentColor }}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-500">
            Manage your profile information and your tributes.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Profile Information
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-100/50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Contact support to change email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tributes List */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Tributes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tributes.length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
                  You have not created any tributes yet.
                </div>
              ) : (
                tributes.map((tribute) => (
                  <div
                    key={tribute.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {tribute.name || "Unnamed Tribute"}
                          </h3>
                          {tribute.username && (
                            <a
                              href={`/tribute/p/${tribute.username}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                            >
                              View Tribute <Globe size={12} />
                            </a>
                          )}
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${tribute.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                        >
                          {tribute.isPublic ? "Public" : "Private"}
                        </div>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Visibility
                          </span>
                          <button
                            onClick={() =>
                              handleToggleVisibility(
                                tribute.id,
                                tribute.isPublic,
                              )
                            }
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              tribute.isPublic ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                tribute.isPublic
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Add more controls/info here if needed */}
                        {tribute.username && (
                          <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded-lg break-all">
                            beyondmoksha.com/tribute/p/{tribute.username}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Security / Password */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Shield size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Security
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Password and security settings are managed securely.
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:static md:bg-transparent md:border-0 md:p-0 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full md:w-auto flex items-center justify-center gap-2 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
              style={{ backgroundColor: accentColor }}
            >
              <Save size={18} />
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Lock size={18} className="text-gray-400" />
                Change Password
              </h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-4">
              {passwordError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {passwordError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  placeholder="Re-enter new password"
                  required
                  minLength={6}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="flex-1 py-2.5 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
                >
                  {updatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
