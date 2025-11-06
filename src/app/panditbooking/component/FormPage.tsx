"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export default function BookPujaForm() {
  const [fullName, setFullName] = useState("");
  const [poojaType, setPoojaType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("clicked");

    // (optional) temporary debug:
    // console.log({ fullName, poojaType, phone, email, state, city, location, date, time, requirements })
  };

  return (
    <section className="py-20 bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 flex gap-[3.75rem] items-center justify-between">

        {/* LEFT SIDE */}
        <div className="w-1/2 h-auto flex flex-col items-start justify-end ">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#1F3A52]">
            Book a <span className="text-[#D29D39]">Pooja</span> Online
          </h2>

          <p className="mt-4 text-gray-600 max-w-md">
            Fill out the form and our team will get back to you within
            2 hours to confirm your booking and discuss the details.
          </p>

          <div className="mt-8 w-full h-[20rem]">
            <Image
              src="/form.png" // update to your local path
              alt="Puja Image"
              width={100}
              height={100}
              className="rounded-xl object-cover w-full"
            />
          </div>

          {/* CONTACT BUTTONS */}
          <div className="mt-28 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-sm hover:shadow-md transition">
              <Phone className="w-4 h-4 text-[#D29D39]" />
              +91 9991122333
            </button>

            <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-sm hover:shadow-md transition">
              <Mail className="w-4 h-4 text-[#D29D39]" />
              @beyondmoksha22
            </button>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl border border-gray-200 p-8 space-y-5 w-1/2">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Full Name*</label>
      <input
        type="text"
        className="input"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Select Pooja Type*</label>
      <select
        className="input"
        value={poojaType}
        onChange={(e) => setPoojaType(e.target.value)}
      >
        <option value="">Select Pooja Type</option>
        <option>Griha Pravesh</option>
        <option>Satyanarayan Pooja</option>
        <option>Marriage Pooja</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Phone Number*</label>
      <input
        type="text"
        className="input"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Email Address*</label>
      <input
        type="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Select State*</label>
      <select
        className="input"
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option value="">Select State</option>
        <option>Maharashtra</option>
        <option>Delhi</option>
        <option>Gujarat</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Select City of Puja*</label>
      <select
        className="input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="">Select City</option>
        <option>Mumbai</option>
        <option>Delhi</option>
        <option>Ahmedabad</option>
      </select>
    </div>

  </div>

  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">Location*</label>
    <input
      type="text"
      className="input"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Preferred Date*</label>
      <input
        type="date"
        className="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">Preferred Time*</label>
      <input
        type="time"
        className="input"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>

  </div>

  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">Additional Requirements</label>
    <textarea
      rows={3}
      className="input"
      value={requirements}
      onChange={(e) => setRequirements(e.target.value)}
    ></textarea>
  </div>

  <button
    type="submit"
    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D29D39] to-[#B6761E] text-white font-medium shadow hover:opacity-95 transition"
  >
    Submit Booking Request
  </button>

</form>

      </div>    
    </section>
  );
}
