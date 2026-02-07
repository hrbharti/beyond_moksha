"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api/api";
import { toast } from "sonner";

interface NewTributeFormProps {
  userId: string;
  userEmail: string;
}

export default function NewTributeForm({
  userId,
  userEmail,
}: NewTributeFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memorial Details
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
    username: "",
    isPublic: true,
    playAudio: true,
  });

  // Username Availability State
  const [usernameAvailability, setUsernameAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    // Validate DOB day
    const maxDobDays = getDaysInMonth(
      memorialData.dobMonth,
      memorialData.dobYear,
    );
    if (memorialData.dobDay && parseInt(memorialData.dobDay) > maxDobDays) {
      setMemorialData((prev) => ({ ...prev, dobDay: "" }));
    }

    // Validate DOP day
    const maxDopDays = getDaysInMonth(
      memorialData.dopMonth,
      memorialData.dopYear,
    );
    if (memorialData.dopDay && parseInt(memorialData.dopDay) > maxDopDays) {
      setMemorialData((prev) => ({ ...prev, dopDay: "" }));
    }
  }, [
    memorialData.dobMonth,
    memorialData.dobYear,
    memorialData.dopMonth,
    memorialData.dopYear,
  ]);

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

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return 31;
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    return new Date(y, m, 0).getDate();
  };

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  const handleMemorialChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "username") {
      processedValue = value.toLowerCase().replace(/[^a-z0-9_-]/g, "");

      if ((window as any).usernameCheckTimeout) {
        clearTimeout((window as any).usernameCheckTimeout);
      }

      if (!processedValue) {
        setUsernameAvailability(null);
      } else {
        setIsCheckingUsername(true);
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

    setMemorialData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!memorialData.firstName || !memorialData.lastName) {
      setError("First name and last name are required");
      setLoading(false);
      return;
    }
    if (
      !memorialData.dobDay ||
      !memorialData.dobMonth ||
      !memorialData.dobYear
    ) {
      setError("Date of birth is required");
      setLoading(false);
      return;
    }
    if (
      !memorialData.dopDay ||
      !memorialData.dopMonth ||
      !memorialData.dopYear
    ) {
      setError("Date of passing is required");
      setLoading(false);
      return;
    }

    try {
      const dateOfBirth = `${memorialData.dobDay.padStart(2, "0")}-${memorialData.dobMonth.padStart(2, "0")}-${memorialData.dobYear}`;
      const dateOfDeath = `${memorialData.dopDay.padStart(2, "0")}-${memorialData.dopMonth.padStart(2, "0")}-${memorialData.dopYear}`;
      const tributeName = [
        memorialData.firstName,
        memorialData.middleName,
        memorialData.lastName,
      ]
        .filter(Boolean)
        .join(" ");

      const payload = {
        userId,
        name: tributeName,
        firstName: memorialData.firstName,
        middleName: memorialData.middleName || null,
        lastName: memorialData.lastName,
        dateOfBirth,
        dateOfDeath,
        username: memorialData.username || null,
        isPublic: memorialData.isPublic,
        playAudio: memorialData.playAudio,
      };

      await api.post("/tribute/", payload);
      toast.success("Memorial created successfully!");
      router.push("/tribute/profile");
    } catch (err: any) {
      console.error("Tribute creation failed", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create memorial",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#D4A043]/20 p-6 md:p-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1F3A4B] mb-2">Welcome!</h1>
          <p className="text-gray-600">
            Let's set up a memorial for your loved one.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
                Middle Name
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
                {Array.from(
                  {
                    length: getDaysInMonth(
                      memorialData.dobMonth,
                      memorialData.dobYear,
                    ),
                  },
                  (_, i) => i + 1,
                ).map((day) => (
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
                {Array.from(
                  {
                    length: getDaysInMonth(
                      memorialData.dopMonth,
                      memorialData.dopYear,
                    ),
                  },
                  (_, i) => i + 1,
                ).map((day) => (
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
          <div>
            <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
              Custom Profile URL{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#1F3A4B]/70 font-medium whitespace-nowrap">
                beyondmoksha.com/tribute/p/
              </span>
              <input
                type="text"
                name="username"
                value={memorialData.username}
                onChange={handleMemorialChange}
                placeholder="username"
                className={`flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all lowercase ${
                  usernameAvailability?.available === true
                    ? "border-green-200 focus:ring-green-500/50"
                    : usernameAvailability?.available === false
                      ? "border-red-200 focus:ring-red-500/50"
                      : "border-gray-200 focus:ring-[#D4A043]/50"
                }`}
              />
            </div>
            <div className="mt-1 h-5 text-xs">
              {isCheckingUsername
                ? "Checking availability..."
                : usernameAvailability?.message}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-[#1F3A4B] uppercase tracking-wider px-1">
              Privacy & Features
            </h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1F3A4B]">
                  Public Profile
                </span>
                <span className="text-xs text-gray-500">
                  Allow anyone to view this memorial
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={memorialData.isPublic}
                  onChange={(e) =>
                    setMemorialData((prev) => ({
                      ...prev,
                      isPublic: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A043]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1F3A4B]">
                  Play Audio
                </span>
                <span className="text-xs text-gray-500">
                  Enable voice/audio on the memorial page
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={memorialData.playAudio}
                  onChange={(e) =>
                    setMemorialData((prev) => ({
                      ...prev,
                      playAudio: e.target.checked,
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4A043]"></div>
              </label>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <input
              type="checkbox"
              name="termsAccepted"
              required
              className="w-5 h-5 mt-0.5 text-[#D4A043] border-gray-300 rounded focus:ring-[#D4A043]"
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

          <button
            type="submit"
            disabled={
              loading ||
              (!!memorialData.username &&
                usernameAvailability?.available === false)
            }
            className="w-full bg-[#D4A043] hover:bg-[#C18E33] text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg text-lg disabled:opacity-50"
          >
            {loading ? "Creating Memorial..." : "Finish Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}
