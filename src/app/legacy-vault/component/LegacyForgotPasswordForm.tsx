"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import api from "@/lib/api/api";
import { ArrowLeftIcon } from "lucide-react";

export default function LegacyForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post(`/auth/forgot-password`, { email });
      setSuccess(true);
      toast.success("Password reset email sent");
    } catch (err: any) {
      console.error("Forgot password failed", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-20 bg-[#F1F8FC]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-3xl font-semibold text-[#1F3A52]">
            Forgot Password?
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="text-center">
            <div className="mb-4 text-green-600 bg-green-50 p-4 rounded-lg">
              <p className="font-medium">Check your email</p>
              <p className="text-sm mt-1">
                We've sent a password reset link to <strong>{email}</strong>.
              </p>
            </div>
            <Link
              href="/legacy-vault/login"
              className="text-[#0866FF] hover:underline text-sm font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0866FF] focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[linear-gradient(90deg,#0866FF,#053D99)] hover:opacity-95 disabled:opacity-50 text-white font-semibold py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base mt-2"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="flex justify-center mt-6">
                <Link
                  href="/legacy-vault/login"
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
