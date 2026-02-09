"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import api from "@/lib/api/api";
import {
  User,
  Save,
  Globe,
  Mail,
  Shield,
  X,
  Lock,
  Plus,
  Edit2,
  Trash,
} from "lucide-react";
import Link from "next/link";

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
  memorialType?: string;
}

export default function AccountPage() {
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

  // Delete Tribute State
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<
    string | null
  >(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Username Edit State
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [editingTributeId, setEditingTributeId] = useState<string | null>(null);
  const [editingTributeType, setEditingTributeType] = useState<string | null>(
    null,
  );
  const [newUsername, setNewUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<{
    available: boolean | null;
    message: string;
  }>({ available: null, message: "" });
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [updatingUsername, setUpdatingUsername] = useState(false);

  // Visual state
  const accentColor = "#D4A043"; // Matching the gold accent

  const fetchData = useCallback(async () => {
    try {
      const [userRes, tributesRes] = await Promise.allSettled([
        api.get("/auth/me"),
        api.get("/tribute/all"),
      ]);

      if (userRes.status === "fulfilled") {
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

      const tributeToUpdate = tributes.find((t) => t.id === tributeId);
      const isPet =
        tributeToUpdate?.memorialType &&
        tributeToUpdate.memorialType !== "Human";
      const endpoint = isPet
        ? `/pet-tribute/${tributeId}`
        : `/tribute/${tributeId}`;

      await api.put(endpoint, {
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

  // Username handling
  const checkUsername = useCallback(
    async (username: string, type: string) => {
      if (!username || username.length < 3) {
        setUsernameStatus({ available: null, message: "" });
        return;
      }

      setCheckingUsername(true);
      try {
        // Use correct endpoint based on type
        // The check-username endpoints check BOTH tables usually, but let's use the one matching the tribute type
        const isPet = type !== "Human";
        const endpoint = isPet
          ? `/pet-tribute/check-username/${username}`
          : `/tribute/check-username/${username}`;

        const response = await api.get(endpoint);
        setUsernameStatus({
          available: response.data.available,
          message: response.data.message,
        });
      } catch (error) {
        console.error("Username check error", error);
        setUsernameStatus({
          available: false,
          message: "Error checking username",
        });
      } finally {
        setCheckingUsername(false);
      }
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (newUsername && editingTributeType) {
        checkUsername(newUsername, editingTributeType);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [newUsername, editingTributeType, checkUsername]);

  const openUsernameModal = (tribute: TributeSettings) => {
    setEditingTributeId(tribute.id);
    setEditingTributeType(tribute.memorialType || "Human");
    setNewUsername(tribute.username || "");
    setUsernameStatus({ available: null, message: "" });
    setIsUsernameModalOpen(true);
  };

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTributeId || !usernameStatus.available) return;

    setUpdatingUsername(true);
    try {
      const isPet = editingTributeType !== "Human";
      const endpoint = isPet
        ? `/pet-tribute/${editingTributeId}`
        : `/tribute/${editingTributeId}`;

      await api.put(endpoint, { username: newUsername });

      // Update local state
      setTributes((prev) =>
        prev.map((t) =>
          t.id === editingTributeId ? { ...t, username: newUsername } : t,
        ),
      );

      toast.success("Username updated successfully");
      setIsUsernameModalOpen(false);
    } catch (error: any) {
      console.error("Update username error", error);
      toast.error(
        error.response?.data?.message || "Failed to update username",
      );
    } finally {
      setUpdatingUsername(false);
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
    } catch (error: unknown) {
      console.error("Password update error", error);
      const errorMessage =
        (error as any).response?.data?.message || "Failed to update password";
      setPasswordError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleDeleteTribute = async () => {
    if (!deleteConfirmationId) return;

    setIsDeleting(true);
    try {
      const tributeToDelete = tributes.find(
        (t) => t.id === deleteConfirmationId,
      );
      const isPet =
        tributeToDelete?.memorialType &&
        tributeToDelete.memorialType !== "Human";
      const endpoint = isPet
        ? `/pet-tribute/${deleteConfirmationId}`
        : `/tribute/${deleteConfirmationId}`;

      await api.delete(endpoint);
      setTributes((prev) => prev.filter((t) => t.id !== deleteConfirmationId));
      toast.success("Tribute deleted successfully");
      setDeleteConfirmationId(null);
    } catch (error) {
      console.error("Delete error", error);
      toast.error("Failed to delete tribute");
    } finally {
      setIsDeleting(false);
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Globe size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Tributes
                </h2>
              </div>
              <Link
                href="/tribute/new"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: accentColor }}
              >
                <Plus size={16} />
                Create New Tribute
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tributes.length === 0 ? (
                <div className="col-span-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <p className="text-gray-500 mb-4">
                    You have not created any tributes yet.
                  </p>
                  <Link
                    href="/tribute/new"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-xl hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Plus size={18} />
                    Create Your First Tribute
                  </Link>
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
                          <div className="flex items-center gap-2 mt-1">
                            {tribute.username ? (
                              <a
                                href={`/tribute/p/${tribute.username}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                @{tribute.username} <Globe size={12} />
                              </a>
                            ) : (
                              <span className="text-sm text-gray-400 italic">
                                No username set
                              </span>
                            )}
                            <button
                              onClick={() => openUsernameModal(tribute)}
                              className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                              title="Change Username"
                            >
                              <Edit2 size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/tribute/profile?username=${tribute.username || tribute.id}`}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => setDeleteConfirmationId(tribute.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash size={20} />
                          </button>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${tribute.isPublic ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {tribute.isPublic ? "Public" : "Private"}
                          </div>
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
      {/* Username Modal */}
      {isUsernameModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Globe size={18} className="text-gray-400" />
                Change Username
              </h3>
              <button
                onClick={() => setIsUsernameModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateUsername} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  New Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) =>
                      setNewUsername(
                        e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
                      )
                    }
                    className={`w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      usernameStatus.available === true
                        ? "border-green-300 focus:ring-green-100 focus:border-green-400"
                        : usernameStatus.available === false
                          ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                          : "border-gray-200 focus:ring-blue-100 focus:border-blue-400"
                    }`}
                    placeholder="unique-username"
                    required
                    minLength={3}
                  />
                  {checkingUsername && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
                    </div>
                  )}
                </div>
                {usernameStatus.message && (
                  <p
                    className={`text-xs mt-1 ${
                      usernameStatus.available
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {usernameStatus.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Only lowercase letters, numbers, hyphens, and underscores.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsUsernameModalOpen(false)}
                  className="flex-1 py-2.5 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    updatingUsername ||
                    checkingUsername ||
                    !usernameStatus.available
                  }
                  className="flex-1 py-2.5 text-white font-medium bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: accentColor }}
                >
                  {updatingUsername ? "Updating..." : "Save Username"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <X size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Tribute?
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this tribute? This action cannot
                be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmationId(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteTribute}
                  disabled={isDeleting}
                  className="flex-1 py-3 text-white font-medium bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-red-100"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
