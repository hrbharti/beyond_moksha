"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Tag,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import api from "@/lib/api/api";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  address?: string;
  note?: string;
}

export default function MyContactsPage({ ownerId }: { ownerId?: string }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    address: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/vault/contacts`, {
        params: { ownerId },
      });
      setContacts(res.data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [ownerId]);

  const handleOpenModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "",
        category: contact.category || "",
        address: contact.address || "",
        note: contact.note || "",
      });
    } else {
      setEditingContact(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        address: "",
        note: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingContact) {
        await api.put(`/vault/contacts/${editingContact.id}`, formData);
        toast.success("Contact updated successfully");
      } else {
        await api.post(`/vault/contacts`, formData);
        toast.success("Contact added successfully");
      }
      fetchContacts();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to save contact", error);
      toast.error("Failed to save contact");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.delete(`/vault/contacts/${id}`);
      toast.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact", error);
      toast.error("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1C1F3B]">My Contacts</h1>
            <p className="text-gray-500 mt-1">
              Manage and organize your important contacts for the vault.
            </p>
          </div>
          {!ownerId && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-[#1867AE] hover:bg-[#155a96] text-white px-6 py-2.5 rounded-xl font-semibold transition flex items-center gap-2 shadow-md hover:shadow-lg w-fit"
            >
              <Plus size={20} />
              Add Contact
            </button>
          )}
        </div>

        {/* Search & Stats */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1867AE]/20 focus:border-[#1867AE] transition"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 whitespace-nowrap">
            <span>
              Total:{" "}
              <span className="font-semibold text-gray-900">
                {contacts.length}
              </span>
            </span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>
              Filtered:{" "}
              <span className="font-semibold text-gray-900">
                {filteredContacts.length}
              </span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#1867AE] animate-spin mb-4" />
            <p className="text-gray-500">Loading your contacts...</p>
          </div>
        ) : filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group relative"
              >
                {!ownerId && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleOpenModal(contact)}
                      className="p-1.5 text-gray-400 hover:text-[#1867AE] hover:bg-blue-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1867AE] to-[#2471B6] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-sm">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1C1F3B] truncate text-lg">
                      {contact.name}
                    </h3>
                    {contact.category && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#1867AE] text-xs font-medium rounded-full mt-1 border border-blue-100">
                        <Tag size={10} />
                        {contact.category}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-400 mt-0.5 shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <Phone
                        size={16}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.address && (
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin
                        size={16}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />
                      <span className="line-clamp-2">{contact.address}</span>
                    </div>
                  )}
                </div>

                {contact.note && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-sm text-gray-500 italic line-clamp-2">
                      "{contact.note}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-gray-300 w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1F3B] mb-2">
              No contacts found
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              {searchQuery
                ? "No contacts match your search query."
                : "Start by adding your first important contact to your legacy vault."}
            </p>
            {!ownerId && !searchQuery && (
              <button
                onClick={() => handleOpenModal()}
                className="bg-[#1867AE] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Add Your First Contact
              </button>
            )}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h2 className="text-xl font-bold text-[#1C1F3B]">
                  {editingContact ? "Edit Contact" : "Add New Contact"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white rounded-full transition text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">
                      Category
                    </label>
                    <select
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="Family">Family</option>
                      <option value="Friend">Friend</option>
                      <option value="Lawyer">Lawyer</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Executor">Executor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Address
                  </label>
                  <textarea
                    rows={2}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition resize-none"
                    placeholder="Full physical address..."
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">
                    Notes (Private)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1867AE]/20 focus:outline-none transition resize-none"
                    placeholder="Any sensitive info or special instructions..."
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={submitting}
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#1867AE] text-white font-semibold rounded-xl hover:bg-[#155a96] transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {submitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : editingContact ? (
                      "Update"
                    ) : (
                      "Save Contact"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
