"use client";

import { useForm } from "react-hook-form";
import CheckboxGroup from "./CheckboxGroup";
import FileUpload from "./FileUpload";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  services?: Record<string, boolean>;
  experience?: string;
  state?: string;
  city?: string;
  coverage?: string;
  pan?: string;
  gst?: string;
  about?: string;
  agree?: boolean;
  samplePhotos?: FileList;
};

const SERVICES = [
  "Funeral Service Provider",
  "Transport (Hearse / Ambulance)",
  "Ritual / Pandit Services",
  "Cremation Ground Partner",
  "Pet Aftercare Partner",
  "Others",
];

export default function PartnerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("submit data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal */}
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-medium text-gray-800">Personal Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Full Name *</div>
          <input
            {...register("fullName", { required: true })}
            placeholder="Enter your full name"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          {errors.fullName && (
            <span className="text-xs text-red-500">Required</span>
          )}
        </label>

        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Phone Number *</div>
          <input
            {...register("phone", { required: true, pattern: /^[0-9]{10}$/ })}
            placeholder="10-digit mobile number"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          {errors.phone && (
            <span className="text-xs text-red-500">
              Enter valid 10-digit number
            </span>
          )}
        </label>
      </div>

      <label className="block">
        <div className="text-sm text-gray-600 mb-1">Email Address *</div>
        <input
          {...register("email", { required: true })}
          placeholder="your.email@example.com"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
        {errors.email && <span className="text-xs text-red-500">Required</span>}
      </label>

      {/* Business */}
      <div className="flex items-center gap-2 mt-4 mb-3">
        <h2 className="font-medium text-gray-800">Business Information</h2>
      </div>

      <label className="block">
        <div className="text-sm text-gray-600 mb-1">Business Name *</div>
        <input
          {...register("businessName", { required: true })}
          placeholder="Enter your business or organization name"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
        {errors.businessName && (
          <span className="text-xs text-red-500">Required</span>
        )}
      </label>

      <div className="mt-4">
        <div className="text-sm text-gray-700 mb-2">
          Services Offered * (Select all that apply)
        </div>
        <CheckboxGroup name="services" options={SERVICES} register={register} />
      </div>

      <label className="block mt-4 max-w-[220px]">
        <div className="text-sm text-gray-600 mb-1">Years of Experience</div>
        <input
          {...register("experience")}
          placeholder="e.g., 5"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </label>

      {/* Location */}
      <div className="flex items-center gap-2 mt-6 mb-3">
        <h2 className="font-medium text-gray-800">
          Location &amp; Coverage Area
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          <div className="text-sm text-gray-600 mb-1">State</div>
          <input
            {...register("state")}
            placeholder="Enter your state"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </label>
        <label>
          <div className="text-sm text-gray-600 mb-1">City</div>
          <input
            {...register("city")}
            placeholder="Enter your city"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </label>
      </div>

      <label className="block mt-3">
        <div className="text-sm text-gray-600 mb-1">Coverage Area</div>
        <input
          {...register("coverage")}
          placeholder="e.g., Within 50km of Mumbai city center (optional)"
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
        />
      </label>

      {/* Additional */}
      <div className="text-sm font-medium text-gray-800 mt-6 mb-3">
        Additional Details
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label>
          <div className="text-sm text-gray-600 mb-1">PAN (Optional)</div>
          <input
            {...register("pan")}
            placeholder="ABCDE1234F"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </label>

        <label>
          <div className="text-sm text-gray-600 mb-1">GST (Optional)</div>
          <input
            {...register("gst")}
            placeholder="22AAAAA0000A1Z5"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload category="partner-verification" />
        <label>
          <div className="text-sm text-gray-600 mb-1">
            Upload Sample Photos (Optional)
          </div>
          <input
            type="file"
            multiple
            {...register("samplePhotos")}
            className="w-full"
          />
          <input
            type="file"
            multiple
            {...register("samplePhotos")}
            className="w-full"
          />
        </label>
      </div>

      <label className="block mt-4">
        <div className="text-sm text-gray-600 mb-1">
          Tell us more about your services (optional)
        </div>
        <textarea
          {...register("about")}
          placeholder="Any additional information you'd like to share..."
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm h-28"
        />
      </label>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("agree", { required: true })}
          className="mt-1"
        />
        <div className="text-sm text-gray-700">
          I agree to Beyond Moksha&#39s partner terms and conditions, and
          confirm that all information provided is accurate. *
        </div>
      </div>
      {errors.agree && (
        <div className="text-xs text-red-500">
          You must agree before submitting.
        </div>
      )}
      {errors.agree && (
        <div className="text-xs text-red-500">
          You must agree before submitting.
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          className="w-full max-w-[220px] mx-auto block bg-slate-900 text-white rounded-full py-2 px-4"
        >
          Submit Application
        </button>
        <p className="text-center text-xs text-gray-400 mt-2">
          We will review and contact you within 48 hours.
        </p>
      </div>
    </form>
  );
}
