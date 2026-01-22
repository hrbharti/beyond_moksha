"use client";
import { useEffect, useState } from "react";
import { MapPin, CalendarDays, Video } from "lucide-react";

export interface EventItem {
  description: string[];
  locationLines: string[];
  dateTime: string;
  virtualLink?: string;
  attendeeName?: string;
}

interface EventsSectionProps {
  events?: EventItem[];
  name?: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({
  events = [],
  name = "Radha Devi Sharma",
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (!events || events.length === 0) return null;

  const event = events[0];

  return (
    <div
      id="events"
      className="w-full md:w-5/6 bg-white text-[#1F3A4B] font-serif py-12 sm:py-16 lg:py-20"
    >
      <h1 className="text-3xl sm:text-5xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-950 mb-10">
        Events
      </h1>

      {/* Main Event Card */}
      <div className="border border-[#1F3A4B]/40 rounded-md p-6 sm:p-8 md:p-10 flex flex-col space-y-6 bg-white">
        <div className="space-y-4 leading-relaxed text-[#1F3A4B]/90">
          {event.description.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
        </div>

        {/* Event Info */}
        <div className="space-y-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <div className="flex items-center space-x-2 text-[#D4A043] font-medium">
              <MapPin size={18} />
              <span>Location :</span>
            </div>
            <p className="text-[#1F3A4B]/90">
              {event.locationLines.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex items-center space-x-2 text-[#D4A043] font-medium">
              <CalendarDays size={18} />
              <span>Date/time :</span>
            </div>
            <p className="text-[#1F3A4B]/90">{event.dateTime}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div className="flex items-center space-x-2 text-[#D4A043] font-medium">
              <Video size={18} />
              <span>Virtual event :</span>
            </div>
            {event.virtualLink ? (
              <a
                href={event.virtualLink}
                className="text-[#1F3A4B]/90 underline hover:text-[#D4A043]"
              >
                Click here
              </a>
            ) : (
              <span className="text-[#1F3A4B]/90">None</span>
            )}
          </div>
        </div>

        <hr className="border-t border-[#1F3A4B]/30 my-6 sm:my-8" />

        {/* RSVP Section */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#D4A043]">
            Confirm Attendance
          </h2>

          {/* Form */}
          <form className="flex flex-col space-y-6">
            {/* First Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-sm mb-1 font-medium">First name</label>
                <input
                  type="text"
                  className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-sm mb-1 font-medium">Last name</label>
                <input
                  type="text"
                  className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                />
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <label className="text-sm mb-1 font-medium text-transparent">
                  Status
                </label>
                <select className="border border-[#1F3A4B]/40 rounded-md p-2 text-[#1F3A4B]/80">
                  <option>Attending</option>
                  <option>Not attending</option>
                </select>
              </div>
            </div>

            {/* Add Guest Button */}
            <button
              type="button"
              className="flex items-center justify-center space-x-2 border border-[#1F3A4B]/40 rounded-md py-2 px-4 w-fit hover:bg-[#1F3A4B]/5 transition"
            >
              <span className="text-lg">+</span>
              <span>Add guest</span>
            </button>

            {/* Second Row */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-sm mb-1 font-medium">E-mail</label>
                <input
                  type="email"
                  className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                />
              </div>
              <div className="flex flex-col w-full sm:w-1/2">
                <label className="text-sm mb-1 font-medium">Mobile phone</label>
                <input
                  type="tel"
                  className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#D4A043] to-[#b37c1c] text-white font-medium py-2 px-6 rounded-md w-fit hover:opacity-90 transition"
            >
              Submit Confirmation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
