"use client";
import React, { useState } from "react";
import api from "@/lib/api/api";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tribute/forgot-password", { email });
      setSubmitted(true);
      toast.success("Reset link sent!");
    } catch (err: any) {
      console.error("Forgot password request failed", err);
      toast.error(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex justify-center px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
              Check your email
            </h1>
            <p className="mt-4 text-gray-600">
              If an account exists for{" "}
              <span className="font-medium text-gray-800">{email}</span>, you
              will receive a password reset link shortly.
            </p>
          </div>
          <Link
            href="/tribute/login"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-400 hover:bg-gray-500 disabled:opacity-50 text-white font-semibold py-2.5 sm:py-3 rounded-full transition-colors text-sm sm:text-base"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <a
              href="/tribute/login"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
