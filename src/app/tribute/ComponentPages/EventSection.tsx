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
  isEditing?: boolean;
  accentColor?: string;
  onUpdate?: (events: EventItem[]) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({
  events = [],
  isEditing = false,
  accentColor = "#D4A043",
  onUpdate,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleUpdateEvent = (field: keyof EventItem, value: any) => {
    if (!onUpdate) return;
    const newEvents = [...events];
    if (newEvents.length === 0) {
      newEvents.push({
        description: [],
        locationLines: [],
        dateTime: "",
      });
    }
    newEvents[0] = { ...newEvents[0], [field]: value };
    onUpdate(newEvents);
  };

  const handleDescriptionChange = (index: number, val: string) => {
    const currentEvent = events[0] || { description: [] };
    const newDesc = [...(currentEvent.description || [])];
    newDesc[index] = val;
    handleUpdateEvent("description", newDesc);
  };

  const handleLocationChange = (index: number, val: string) => {
    const currentEvent = events[0] || { locationLines: [] };
    const newLoc = [...(currentEvent.locationLines || [])];
    newLoc[index] = val;
    handleUpdateEvent("locationLines", newLoc);
  };

  if (!mounted) return null;
  if (!isEditing && (!events || events.length === 0)) return null;

  const event = events[0];

  return (
    <div
      id="events"
      className="w-full md:w-5/6 text-[#1F3A4B] font-serif py-12 sm:py-16 lg:py-20"
    >
      <h1
        className="text-3xl sm:text-5xl md:text-5xl text-transparent bg-clip-text mb-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${accentColor}, #1F3A4B)`,
        }}
      >
        Events
      </h1>

      {/* Main Event Card */}
      <div className="border border-[#1F3A4B]/40 rounded-md p-6 sm:p-8 md:p-10 flex flex-col space-y-6 bg-white relative group/ev">
        <div className="space-y-4 leading-relaxed text-[#1F3A4B]/90">
          {isEditing ? (
            <div className="space-y-4">
              <h3 className="font-sans font-medium text-blue-900 mb-2">
                Event Description
              </h3>
              {(event?.description || [""]).map((desc, i) => (
                <textarea
                  key={i}
                  value={desc}
                  onChange={(e) => handleDescriptionChange(i, e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Event details..."
                />
              ))}
            </div>
          ) : (
            event?.description.map((desc, i) => <p key={i}>{desc}</p>)
          )}
        </div>

        {/* Event Info */}
        <div className="space-y-6 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <div
              className="flex items-center space-x-2 font-medium min-w-[120px]"
              style={{ color: accentColor }}
            >
              <MapPin size={18} />
              <span>Location :</span>
            </div>
            {isEditing ? (
              <div className="flex-1 space-y-2">
                {(event?.locationLines || ["", ""]).map((line, i) => (
                  <input
                    key={i}
                    type="text"
                    value={line}
                    onChange={(e) => handleLocationChange(i, e.target.value)}
                    className="w-full p-2 border border-gray-100 rounded focus:border-blue-300 outline-none"
                    placeholder={`Location line ${i + 1}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[#1F3A4B]/90">
                {event?.locationLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div
              className="flex items-center space-x-2 font-medium min-w-[120px]"
              style={{ color: accentColor }}
            >
              <CalendarDays size={18} />
              <span>Date/time :</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={event?.dateTime || ""}
                onChange={(e) => handleUpdateEvent("dateTime", e.target.value)}
                className="flex-1 p-2 border border-gray-100 rounded focus:border-blue-300 outline-none"
                placeholder="e.g. Sunday, Feb 10, 2026 - 10:30 AM"
              />
            ) : (
              <p className="text-[#1F3A4B]/90">{event?.dateTime}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <div
              className="flex items-center space-x-2 font-medium min-w-[120px]"
              style={{ color: accentColor }}
            >
              <Video size={18} />
              <span>Virtual event :</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={event?.virtualLink || ""}
                onChange={(e) =>
                  handleUpdateEvent("virtualLink", e.target.value)
                }
                className="flex-1 p-2 border border-gray-100 rounded focus:border-blue-300 outline-none"
                placeholder="Zoom/Meet Link"
              />
            ) : event?.virtualLink ? (
              <a
                href={event.virtualLink}
                className="text-[#1F3A4B]/90 underline"
                style={{ color: accentColor }}
              >
                Click here
              </a>
            ) : (
              <span className="text-[#1F3A4B]/90">None</span>
            )}
          </div>
        </div>

        {!isEditing && (
          <>
            <hr className="border-t border-[#1F3A4B]/30 my-6 sm:my-8" />
            {/* RSVP Section */}
            <div className="space-y-6">
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: accentColor }}
              >
                Confirm Attendance
              </h2>

              {/* Form */}
              <form className="flex flex-col space-y-6">
                {/* First Row */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm mb-1 font-medium">
                      First name
                    </label>
                    <input
                      type="text"
                      className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm mb-1 font-medium">
                      Last name
                    </label>
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
                    <label className="text-sm mb-1 font-medium">
                      Mobile phone
                    </label>
                    <input
                      type="tel"
                      className="border border-[#1F3A4B]/40 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#D4A043]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="text-white font-medium py-2 px-6 rounded-md w-fit hover:opacity-90 transition"
                  style={{ backgroundColor: accentColor }}
                >
                  Submit Confirmation
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventsSection;
