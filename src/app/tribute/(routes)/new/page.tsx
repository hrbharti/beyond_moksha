"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../ComponentPages/../../../lib/api/api";
import TributeNavbar from "../../ComponentPages/TributeNavbar";
import NewTributeForm from "../../ComponentPages/NewTributeForm";

export default function NewTributePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    id: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/tribute/me");
        if (!response.data.noProfile) {
          // If they already have a profile, send them to the profile page
          router.push("/tribute/profile");
          return;
        }
        setUserData({
          id: response.data.user.id,
          email: response.data.user.email,
        });
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/tribute/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <TributeNavbar />
      {userData && (
        <NewTributeForm userId={userData.id} userEmail={userData.email} />
      )}
    </>
  );
}
