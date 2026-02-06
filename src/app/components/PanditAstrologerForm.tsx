"use client";

import React from "react";
import { useForm } from "react-hook-form";
import CheckboxGroup from "./CheckboxGroup";
import FileUpload from "./FileUpload";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;

  specializations?: Record<string, boolean>;
  languages?: Record<string, boolean>;

  state: string;
  city: string;
  experience: string;
  fee?: number;
  travel: "yes" | "no";
  travelRadius?: number;

  about?: string;
  agree?: boolean;

  idProof?: FileList;
  photos?: FileList;
};

const SPECIALIZATIONS = [
  "Vedic Rituals & Ceremonies",
  "Vastu Consultation",
  "Marriage Ceremonies",
  "Astrology & Horoscope Reading",
  "Funeral & Last Rites",
  "Religious Pujas",
];

const LANGUAGES = [
  "Hindi",
  "English",
  "Bengali",
  "Sanskrit",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
];

export default function PanditAstrologerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Pandit/Astrologer form submit:", data);
    alert("Demo submit – check console for payload");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6"
    >
      {/* Header */}
      <div className="space-y-1 text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Are you a qualified Pandit/Astrologer?
        </h1>
        <p className="text-sm text-gray-500">
          Apply to receive verified bookings with flexible schedules and prompt
          support.
        </p>
      </div>

      {/* Personal Information */}
      <section className="space-y-4">
        <h2 className="font-medium text-gray-800">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-gray-600 mb-1">Full Name *</div>
            <input
              {...register("fullName", { required: true })}
              placeholder="Enter your full name"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">
                Full name is required.
              </p>
            )}
          </label>

          <label className="block">
            <div className="text-sm text-gray-600 mb-1">Phone Number *</div>
            <input
              {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
              placeholder="10-digit mobile number"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                Enter a valid 10-digit phone number.
              </p>
            )}
          </label>
        </div>

        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Email Address *</div>
          <input
            {...register("email", { required: true })}
            placeholder="your.email@example.com"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">Email is required.</p>
          )}
        </label>
      </section>

      {/* Professional Information */}
      <section className="space-y-4">
        <h2 className="font-medium text-gray-800">Professional Information</h2>

        <div>
          <p className="text-sm text-gray-700 mb-1">
            Specialization *{" "}
            <span className="text-xs text-gray-500">
              (Select all that apply)
            </span>
          </p>
          <CheckboxGroup
            name="specializations"
            options={SPECIALIZATIONS}
            register={register}
          />
          <p className="mt-1 text-[11px] text-gray-400">
            Please select at least one specialization.
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-700 mb-1">
            Languages Known *{" "}
            <span className="text-xs text-gray-500">
              (Select all that apply)
            </span>
          </p>
          <CheckboxGroup
            name="languages"
            options={LANGUAGES}
            register={register}
          />
        </div>
      </section>

      {/* Location & Availability */}
      <section className="space-y-4">
        <h2 className="font-medium text-gray-800">
          Location &amp; Availability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-gray-600 mb-1">State *</div>
            <input
              {...register("state", { required: true })}
              placeholder="Enter your state"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">State is required.</p>
            )}
          </label>

          <label className="block">
            <div className="text-sm text-gray-600 mb-1">City *</div>
            <input
              {...register("city", { required: true })}
              placeholder="Enter your city"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">City is required.</p>
            )}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-gray-600 mb-1">Experience *</div>
            <select
              {...register("experience", { required: true })}
              defaultValue=""
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            >
              <option value="" disabled>
                Select experience
              </option>
              <option value="less-than-1">Less than 1 year</option>
              <option value="1-3">1 – 3 years</option>
              <option value="3-5">3 – 5 years</option>
              <option value="5-plus">5+ years</option>
            </select>
            {errors.experience && (
              <p className="text-xs text-red-500 mt-1">
                Experience is required.
              </p>
            )}
          </label>

          <label className="block">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">
                Typical Fee per Puja (₹)
              </span>
              <span className="text-[11px] text-gray-400">e.g., 2500</span>
            </div>
            <input
              type="number"
              {...register("fee", { valueAsNumber: true })}
              placeholder="2500"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <p className="text-sm text-gray-600 mb-1">Travel *</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="yes"
                  {...register("travel", { required: true })}
                  className="w-4 h-4"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  value="no"
                  {...register("travel", { required: true })}
                  className="w-4 h-4"
                />
                No
              </label>
            </div>
            {errors.travel && (
              <p className="text-xs text-red-500 mt-1">
                Please specify if you are open to travel.
              </p>
            )}
          </div>

          <label className="block">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Travel Radius (km)</span>
              <span className="text-[11px] text-gray-400">e.g., 20</span>
            </div>
            <input
              type="number"
              {...register("travelRadius", { valueAsNumber: true })}
              placeholder="20"
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-900/60"
            />
          </label>
        </div>

        {/* Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {/* Drag & drop UI */}
            <FileUpload category="pandit-verification" />
            {/* Actual input hooked to RHF (kept hidden so UI comes from FileUpload) */}
            <input
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              {...register("idProof")}
            />
          </div>

          <label className="block">
            <div className="text-sm text-gray-600 mb-1">
              Upload Photo/Certificates
            </div>
            <input
              type="file"
              multiple
              {...register("photos")}
              className="w-full text-sm"
            />
          </label>
        </div>

        <label className="block">
          <div className="text-sm text-gray-600 mb-1">
            Tell us more about yourself (optional)
          </div>
          <textarea
            {...register("about")}
            placeholder="Share any additional information about your expertise, achievements, or approach..."
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-1 focus:ring-slate-900/60"
          />
        </label>
      </section>

      {/* Terms */}
      <div className="pt-2 space-y-2">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            {...register("agree", { required: true })}
            className="mt-1 w-4 h-4"
          />
          <span>
            I agree to Beyond Moksha&apos;s partner terms and conditions, and
            confirm that all information provided is accurate. *
          </span>
        </label>
        {errors.agree && (
          <p className="text-xs text-red-500">
            You must agree to the terms before submitting.
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4 space-y-2">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition"
        >
          Send a Request
        </button>
        <p className="text-xs text-gray-400 text-center md:text-left">
          We verify profiles before activating bookings.
        </p>
      </div>
    </form>
  );
}
