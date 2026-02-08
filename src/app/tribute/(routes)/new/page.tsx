"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import TributeNavbar from "../../ComponentPages/TributeNavbar";
import NewTributeForm from "../../ComponentPages/NewTributeForm";

export default function NewTributePage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/tribute/login");
    }
  }, [user, loading, router]);

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
      {user && (
        <NewTributeForm userId={user.id} />
      )}
    </>
  );
}
