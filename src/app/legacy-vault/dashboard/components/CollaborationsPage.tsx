import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import { Loader2, Plus, Mail, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

export default function CollaborationsPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);

  const fetchCollaborators = async () => {
    try {
      const res = await api.get("/vault/collaborators");
      setCollaborators(res.data.collaborators);
    } catch (error) {
      console.error("Failed to fetch collaborators", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setInviting(true);
      await api.post("/vault/invite", { email });
      toast.success("Invitation sent successfully!");
      setEmail("");
    } catch (error: any) {
      console.error("Invite failed", error);
      toast.error(error.response?.data?.error || "Failed to send invitation");
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC] p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1F3A52] mb-4">
            Collaborations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Invite trusted family members, legal representatives, or friends to
            collaborate on your legacy. They will have access to view your Asset
            Vault and other secured documents.
          </p>
        </div>

        {/* Invite Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-xl font-bold text-[#1F3A52] mb-6 flex items-center gap-2">
            <Mail className="text-[#0866FF]" />
            Invite New Collaborator
          </h2>
          <form
            onSubmit={handleInvite}
            className="flex flex-col md:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0866FF] focus:ring-2 focus:ring-[#0866FF]/20 outline-none transition-all"
              required
            />
            <button
              type="submit"
              disabled={inviting}
              className="bg-[#0866FF] hover:bg-[#0654D6] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {inviting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Plus size={20} />
              )}
              Send Invitation
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            The invitee will receive an email with a secure link to accept your
            invitation.
          </p>
        </div>

        {/* List Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#1F3A52] flex items-center gap-2">
              <Shield className="text-[#0866FF]" />
              Active Collaborators
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[#0866FF]" size={32} />
            </div>
          ) : collaborators.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No collaborators yet
              </h3>
              <p className="text-gray-500 mt-2">
                People you invite will appear here once they accept.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      {collaborator.profileImageUrl ? (
                        <Image
                          src={collaborator.profileImageUrl}
                          alt={collaborator.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1F3A52] text-white font-bold text-lg">
                          {collaborator.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F3A52]">
                        {collaborator.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {collaborator.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Active
                    </span>
                    {/* Add Remove functionality later if needed */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#0866FF]"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
