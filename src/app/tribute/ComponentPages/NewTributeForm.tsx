"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api/api";
import { toast } from "sonner";

interface NewTributeFormProps {
  userId: string;
}

export default function NewTributeForm({ userId }: NewTributeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Memorial Type
  const [memorialType, setMemorialType] = useState<"Human" | "Pet">("Human");

  // Memorial Details
  const [memorialData, setMemorialData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    username: "",
    petType: "Dog",
  });

  // Username Availability State
  const [usernameAvailability, setUsernameAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

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
            // Check availability in both collections (done in backend)
            const endpoint =
              memorialType === "Pet" ? "/pet-tribute" : "/tribute";
            const res = await api.get(
              `${endpoint}/check-username/${processedValue}`,
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
    if (
      !memorialData.firstName ||
      (memorialType === "Human" && !memorialData.lastName)
    ) {
      setError(
        memorialType === "Human"
          ? "First name and last name are required"
          : "Pet's name is required",
      );
      setLoading(false);
      return;
    }
    if (!memorialData.dateOfBirth) {
      setError("Date of birth is required");
      setLoading(false);
      return;
    }
    if (!memorialData.dateOfDeath) {
      setError("Date of passing is required");
      setLoading(false);
      return;
    }

    // Date validation
    const dob = new Date(memorialData.dateOfBirth);
    const dop = new Date(memorialData.dateOfDeath);

    if (dob > dop) {
      setError("Date of birth cannot be after date of passing");
      setLoading(false);
      return;
    }

    try {
      const tributeName =
        memorialType === "Human"
          ? [
              memorialData.firstName,
              memorialData.middleName,
              memorialData.lastName,
            ]
              .filter(Boolean)
              .join(" ")
          : memorialData.firstName;

      if (memorialType === "Pet") {
        const petPayload = {
          userId,
          name: tributeName,
          petType: memorialData.petType,
          dateOfBirth: memorialData.dateOfBirth,
          dateOfPassing: memorialData.dateOfDeath,
          username: memorialData.username || null,
        };
        await api.post("/pet-tribute/", petPayload);
      } else {
        const payload = {
          userId,
          name: tributeName,
          firstName: memorialData.firstName,
          middleName: memorialData.middleName || null,
          lastName: memorialData.lastName,
          dateOfBirth: memorialData.dateOfBirth,
          dateOfDeath: memorialData.dateOfDeath,
          username: memorialData.username || null,
          memorialType: "Human",
        };
        await api.post("/tribute/", payload);
      }

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
          {/* Tribute Type Selector */}
          <div className="flex justify-center p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setMemorialType("Human")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                memorialType === "Human"
                  ? "bg-white text-[#D4A043] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Human
            </button>
            <button
              type="button"
              onClick={() => setMemorialType("Pet")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                memorialType === "Pet"
                  ? "bg-white text-[#D4A043] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={memorialType === "Pet" ? "md:col-span-2" : ""}>
              <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                {memorialType === "Human" ? "First Name" : "Pet's name"}
              </label>
              <input
                type="text"
                name="firstName"
                value={memorialData.firstName}
                onChange={handleMemorialChange}
                placeholder={
                  memorialType === "Human" ? "First name" : "Your pet's name"
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] transition-all"
                required
              />
            </div>
            {memorialType === "Human" && (
              <>
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
              </>
            )}
            {memorialType === "Pet" && (
              <div>
                <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                  Pet Type
                </label>
                <select
                  name="petType"
                  value={memorialData.petType}
                  onChange={handleMemorialChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all cursor-pointer"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={memorialData.dateOfBirth}
                onChange={handleMemorialChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all cursor-pointer"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide font-semibold text-[#1F3A4B]/70 mb-2">
                Date of Passing
              </label>
              <input
                type="date"
                name="dateOfDeath"
                value={memorialData.dateOfDeath}
                onChange={handleMemorialChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A043]/50 focus:border-[#D4A043] bg-white transition-all cursor-pointer"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F3A4B] mb-2">
              Custom Profile URL{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <span className="text-sm text-[#1F3A4B]/70 font-medium">
                beyondmoksha.com/tribute/p/
              </span>
              <input
                type="text"
                name="username"
                value={memorialData.username}
                onChange={handleMemorialChange}
                placeholder="username"
                className={`w-full sm:flex-1 px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all lowercase ${
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
