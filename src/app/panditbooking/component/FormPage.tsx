"use client";

import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import api from "@/lib/api/api";
import { useForm } from "react-hook-form";

type BookPujaFormData = {
  fullName: string;
  poojaType: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  location: string;
  pincode: string;
  date: string;
  time: string;
  requirements?: string;
};

export default function BookPujaForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookPujaFormData>();

  const onSubmit = async (data: BookPujaFormData) => {
    try {
      setLoading(true);
      await api.post("/booking/puja", data);
      toast.success("Booking submitted successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[3.75rem] items-start md:items-center justify-between">
          {/* LEFT SIDE */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#1F3A52] font-lora font-normal">
              Book a <span className="text-[#D29D39]">Pooja</span> Online
            </h2>

            <p className="mt-4 text-gray-600 max-w-md">
              Fill out the form and our team will get back to you within 2 hours
              to confirm your booking and discuss the details.
            </p>

            <div className="mt-6 md:mt-8 w-full">
              <div className="w-full h-[12rem] sm:h-[14rem] md:h-[20rem] rounded-xl overflow-hidden">
                <Image
                  src="/form.png"
                  alt="Puja Image"
                  width={1200}
                  height={800}
                  className="object-cover w-full h-full rounded-xl"
                  priority
                />
              </div>
            </div>

            {/* CONTACT BUTTONS */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-sm hover:shadow-md transition"
                onClick={() => window.open("tel:+917050966971", "_blank")}
              >
                <Phone className="w-4 h-4 text-[#D29D39]" />
                +91 7050966971
              </button>

              <button
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-sm hover:shadow-md transition"
                onClick={() =>
                  window.open("mailto:beyondmoksha360@gmail.com", "_blank")
                }
              >
                <Mail className="w-4 h-4 text-[#D29D39]" />
                beyondmoksha360@gmail.com
              </button>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-8 space-y-5 w-full md:w-1/2"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Full Name*</label>
                <input
                  type="text"
                  className="input"
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Select Pooja Type*
                </label>
                <select
                  className="input"
                  {...register("poojaType", {
                    required: "Pooja type is required",
                  })}
                >
                  <option value="">Select Pooja Type</option>
                  <option>Griha Pravesh</option>
                  <option>Satyanarayan Pooja</option>
                  <option>Marriage Pooja</option>
                </select>
                {errors.poojaType && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.poojaType.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Phone Number*
                </label>
                <input
                  type="text"
                  className="input"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  className="input"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Select State*
                </label>
                <select
                  className="input"
                  {...register("state", { required: "State is required" })}
                >
                  <option value="">Select State</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                </select>
                {errors.state && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.state.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Select City of Puja*
                </label>
                <select
                  className="input"
                  {...register("city", { required: "City is required" })}
                >
                  <option value="">Select City</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Ahmedabad</option>
                </select>
                {errors.city && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.city.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Location*</label>
                <input
                  type="text"
                  className="input"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.location.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Pincode*</label>
                <input
                  type="text"
                  className="input"
                  {...register("pincode", {
                    required: "Pincode is required",
                    minLength: {
                      value: 6,
                      message: "Pincode must be 6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "Pincode must be 6 digits",
                    },
                  })}
                />
                {errors.pincode && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.pincode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Preferred Date*
                </label>
                <input
                  type="date"
                  className="input"
                  min={new Date().toISOString().split("T")[0]}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.date.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Preferred Time*
                </label>
                <input
                  type="time"
                  className="input"
                  {...register("time", { required: "Time is required" })}
                />
                {errors.time && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.time.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">
                Additional Requirements
              </label>
              <textarea
                rows={3}
                className="input"
                {...register("requirements")}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D29D39] to-[#B6761E] text-white font-medium shadow hover:opacity-95 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
