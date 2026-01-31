"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api/api";

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Memorial Details
  const [memorialData, setMemorialData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    dopDay: "",
    dopMonth: "",
    dopYear: "",
  });

  // Step 2: User Details
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    username: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Verification State
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Username Availability State
  const [usernameAvailability, setUsernameAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  const handleMemorialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setMemorialData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const type = e.target.type;
    const checked = (e.target as HTMLInputElement).checked;

    let processedValue = value;
    if (name === "username") {
      processedValue = value.toLowerCase().replace(/[^a-z0-9_-]/g, "");

      // Clear previous timeout if exists
      if ((window as any).usernameCheckTimeout) {
        clearTimeout((window as any).usernameCheckTimeout);
      }

      // Reset availability if empty
      if (!processedValue) {
        setUsernameAvailability(null);
      } else {
        setIsCheckingUsername(true);
        // Debounce check
        (window as any).usernameCheckTimeout = setTimeout(async () => {
          try {
            const res = await api.get(
              `/tribute/check-username/${processedValue}`,
            );
            setUsernameAvailability(res.data);
          } catch (err) {
            setUsernameAvailability({
              available: false,
              message: "Error checking username",
            });
          } finally {
            setIsCheckingUsername(false);
          }
        }, 300);
      }
    }

    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));
  };

  const handleSendOtp = async () => {
    if (!userData.email) {
      setError("Please enter an email address");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      await api.post("/tribute/verify-email/send", { email: userData.email });
      setIsOtpSent(true);
      alert("Verification code sent to your email");
    } catch (err: any) {
      console.error("Send OTP failed", err);
      setError(
        err.response?.data?.message || "Failed to send verification code",
      );
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the verification code");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      const res = await api.post("/tribute/verify-email/verify", {
        email: userData.email,
        otp,
      });
      setVerificationToken(res.data.verificationToken);
      setIsVerified(true);
      setIsOtpSent(false); // Hide OTP input
    } catch (err: any) {
      console.error("Verify OTP failed", err);
      setError(err.response?.data?.message || "Invalid code");
      setVerifying(false);
    }
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate Step 1
    if (!memorialData.firstName || !memorialData.lastName) {
      setError("First name and last name are required");
      return;
    }
    if (
      !memorialData.dobDay ||
      !memorialData.dobMonth ||
      !memorialData.dobYear
    ) {
      setError("Date of birth is required");
      return;
    }
    if (
      !memorialData.dopDay ||
      !memorialData.dopMonth ||
      !memorialData.dopYear
    ) {
      setError("Date of passing is required");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate Step 2
    if (!userData.fullName || !userData.email || !userData.password) {
      setError("Full name, email, and password are required");
      setLoading(false);
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    if (!userData.termsAccepted) {
      setError("Please accept the Terms of Use");
      setLoading(false);
      return;
    }

    try {
      // Format dates
      const dateOfBirth = `${memorialData.dobDay.padStart(2, "0")}-${memorialData.dobMonth.padStart(2, "0")}-${memorialData.dobYear}`;
      const dateOfDeath = `${memorialData.dopDay.padStart(2, "0")}-${memorialData.dopMonth.padStart(2, "0")}-${memorialData.dopYear}`;

      // Combine first, middle, last name
      const tributeName = [
        memorialData.firstName,
        memorialData.middleName,
        memorialData.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      const payload = {
        // User data
        user: {
          name: userData.fullName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone || null,
        },
        // Tribute data
        tribute: {
          name: tributeName,
          firstName: memorialData.firstName,
          middleName: memorialData.middleName || null,
          lastName: memorialData.lastName,
          email: userData.email,
          password: userData.password,
          username: userData.username || null,
          dateOfBirth,
          dateOfDeath,
        },
        verificationToken, // Add verification token
      };

      const response = await api.post("/tribute/register", payload);
      console.log("Registration successful:", response.data);

      router.push("/tribute/profile");
    } catch (err: any) {
      console.error("Registration failed", err);
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#D4A043]/20 p-6 md:p-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center ${step >= 1 ? "text-[#1F3A4B]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-[#1F3A4B] text-white" : "bg-gray-200"}`}
              >
                {step > 1 ? "✓" : "1"}
              </div>
              <span className="ml-2 text-sm font-medium">Memorial Details</span>
            </div>
            <div
              className={`w-16 h-0.5 ${step >= 2 ? "bg-[#1F3A4B]" : "bg-gray-200"}`}
            />
            <div
              className={`flex items-center ${step >= 2 ? "text-[#1F3A4B]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-[#1F3A4B] text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">Your Details</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Step 1: Memorial Details */}
        {step === 1 && (
          <form onSubmit={handleStep1Next} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3A4B] mb-8 text-center">
              Memorial Details
            </h2>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={memorialData.firstName}
                  onChange={handleMemorialChange}
                  placeholder="First name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                  Middle Name{" "}
                  <span className="text-gray-400 font-normal normal-case">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={memorialData.middleName}
                  onChange={handleMemorialChange}
                  placeholder="Middle name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={memorialData.lastName}
                  onChange={handleMemorialChange}
                  placeholder="Last name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                  required
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                Date of Birth
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  name="dobDay"
                  value={memorialData.dobDay}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="dobMonth"
                  value={memorialData.dobMonth}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="dobYear"
                  value={memorialData.dobYear}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date of Passing */}
            <div>
              <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                Date of Passing
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  name="dopDay"
                  value={memorialData.dopDay}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <select
                  name="dopMonth"
                  value={memorialData.dopMonth}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Month</option>
                  {months.map((month, idx) => (
                    <option key={idx} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  name="dopYear"
                  value={memorialData.dopYear}
                  onChange={handleMemorialChange}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4A043] hover:bg-[#C18E33] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg mt-8 text-lg"
            >
              Next: Your Details
            </button>
          </form>
        )}

        {/* Step 2: Your Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3A4B] mb-8 text-center">
              Your Details
            </h2>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleUserChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Email
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  placeholder="Email"
                  disabled={isVerified || isOtpSent}
                  className={`flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all ${
                    isVerified
                      ? "bg-green-50 border-green-200 text-green-700"
                      : ""
                  }`}
                  required
                />
                {!isVerified && !isOtpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={verifying || !userData.email}
                    className="px-6 py-3 bg-[#1F3A4B] text-white rounded-xl hover:bg-[#162936] disabled:opacity-50 transition-all text-sm font-medium shadow-sm"
                  >
                    {verifying ? "Sending..." : "Verify"}
                  </button>
                )}
                {isVerified && (
                  <div className="px-6 py-3 bg-green-100 text-green-700 rounded-xl border border-green-200 flex items-center gap-2 text-sm font-medium">
                    <span>✓ Verified</span>
                  </div>
                )}
              </div>

              {/* OTP Input */}
              {isOtpSent && !isVerified && (
                <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Enter Verification Code
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifying || !otp}
                      className="px-6 py-3 bg-[#D4A043] text-white rounded-xl hover:bg-[#C18E33] disabled:opacity-50 transition-all text-sm font-medium shadow-sm"
                    >
                      {verifying ? "Verifying..." : "Submit"}
                    </button>
                  </div>
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={verifying}
                      className="text-xs text-gray-500 hover:text-[#1F3A4B] underline"
                    >
                      Resend Code
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Phone
              </label>
              <div className="flex gap-3">
                <div className="flex items-center px-4 border border-gray-200 rounded-xl bg-gray-50 text-[#1F3A4B]">
                  <span className="text-sm font-medium">🇮🇳 +91</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserChange}
                  placeholder="Phone number"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                />
              </div>
            </div>

            {/* Custom Username */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Custom Address{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#1F3A4B]/70 font-medium">
                  beyondmoksha.com/tribute/p/
                </span>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleUserChange}
                  placeholder="your-username"
                  className={`flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all lowercase ${
                    usernameAvailability?.available === true
                      ? "border-green-200 focus:ring-green-500/50 focus:border-green-500"
                      : usernameAvailability?.available === false
                        ? "border-red-200 focus:ring-red-500/50 focus:border-red-500"
                        : "border-gray-200 focus:ring-[#D4A043]/50 focus:border-[#D4A043]"
                  }`}
                />
              </div>
              <div className="mt-1 h-5">
                {isCheckingUsername ? (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></span>
                    Checking availability...
                  </p>
                ) : usernameAvailability ? (
                  <p
                    className={`text-xs ${
                      usernameAvailability.available
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {usernameAvailability.message}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={handleUserChange}
                placeholder="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleUserChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                required
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={userData.termsAccepted}
                onChange={handleUserChange}
                className="w-5 h-5 mt-0.5 text-[#D4A043] border-gray-300 rounded focus:ring-[#D4A043]"
                required
              />
              <span className="text-sm text-gray-600">
                I acknowledge and agree to abide to{" "}
                <a
                  href="#"
                  className="text-[#D4A043] hover:text-[#B38530] underline font-medium"
                >
                  Terms Of Use
                </a>
              </span>
            </label>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1F3A4B] font-bold py-4 rounded-xl transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !isVerified}
                className="flex-1 bg-[#D4A043] hover:bg-[#C18E33] disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
