"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api/api";
import { useUser } from "@/hooks/useUser";
import Logo from "../component/Logo";
import { Loader2 } from "lucide-react";

function InviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { user, loading } = useUser();
  const [status, setStatus] = useState<
    "verifying" | "accepting" | "success" | "error"
  >("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (loading) return;

    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid invitation link.");
      return;
    }

    if (!user) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(
        `/legacy-vault/invite?token=${token}`,
      );
      router.push(`/legacy-vault?returnUrl=${returnUrl}`);
      return;
    }

    // User is logged in, show UI to accept
    setStatus("verifying");
  }, [user, loading, token, router]);

  const handleAccept = async () => {
    try {
      setStatus("accepting");
      await api.post("/vault/accept-invite", { token });
      setStatus("success");
      setTimeout(() => {
        router.push("/legacy-vault/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error accepting invite:", error);
      setStatus("error");
      setErrorMessage(
        error.response?.data?.error || "Failed to accept invitation.",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <Logo className="mb-8 text-3xl" />
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-red-500 text-xl font-bold mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => router.push("/legacy-vault/dashboard")}
            className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <Logo className="mb-8 text-3xl" />
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-green-500 text-xl font-bold mb-4">Success!</h1>
          <p className="text-gray-600 mb-6">
            You have successfully accepted the invitation.
          </p>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Logo className="mb-8 text-3xl" />
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#1F3A52] mb-2">
          Vault Invitation
        </h1>
        <p className="text-gray-600 mb-8">
          You have been invited to collaborate on a Legacy Vault. Acceptance
          gives you access to view the vault contents.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            disabled={status === "accepting"}
            className="w-full bg-[#D4A043] text-white py-3 rounded-lg font-semibold hover:bg-[#b88a38] transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "accepting" && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Accept Invitation
          </button>
          <button
            onClick={() => router.push("/legacy-vault/dashboard")}
            className="w-full text-gray-500 py-3 hover:text-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <InviteContent />
    </Suspense>
  );
}
