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
  textColor?: string;
  onUpdate?: (events: EventItem[]) => void;
}

const EventsSection: React.FC<EventsSectionProps> = ({
  events = [],
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const [mounted, setMounted] = useState(false);
  const [guests, setGuests] = useState([{ firstName: "", lastName: "" }]);
  useEffect(() => setMounted(true), []);

  const handleAddGuest = () => {
    setGuests([...guests, { firstName: "", lastName: "" }]);
  };

  const handleGuestChange = (index: number, field: string, value: string) => {
    const newGuests = [...guests];
    (newGuests[index] as any)[field] = value;
    setGuests(newGuests);
  };

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
      className="w-full md:w-5/6 font-serif py-12 sm:py-16 lg:py-20"
      style={{ color: textColor }}
    >
      <h1
        className="text-2xl sm:text-4xl md:text-5xl font-serif mb-6 sm:mb-10 pb-4 inline-block border-b-2 text-black"
        style={{ borderColor: accentColor }}
      >
        Events
      </h1>

      {/* Main Event Card */}
      <div
        className="border rounded-md p-6 sm:p-8 md:p-10 flex flex-col space-y-6 bg-white relative group/ev"
        style={{ borderColor: textColor + "66" }}
      >
        <div
          className="space-y-4 leading-relaxed"
          style={{ color: textColor + "E6" }} // 90%
        >
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
                {(event?.locationLines?.length
                  ? event.locationLines
                  : ["", ""]
                ).map((line, i) => (
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
              <p style={{ color: textColor + "E6" }}>
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
              <div className="flex-1 flex gap-2">
                <input
                  type="date"
                  onChange={(e) => {
                    const dateVal = e.target.value;
                    const currentDate = new Date(dateVal);
                    const dateStr = currentDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    const timePart =
                      event?.dateTime?.split(" - ")[1] || "12:00 PM";
                    handleUpdateEvent("dateTime", `${dateStr} - ${timePart}`);
                  }}
                  className="flex-1 p-2 border border-gray-100 rounded focus:border-blue-300 outline-none"
                />
                <input
                  type="time"
                  onChange={(e) => {
                    const timeVal = e.target.value;
                    const [h, m] = timeVal.split(":");
                    const hour = parseInt(h);
                    const ampm = hour >= 12 ? "PM" : "AM";
                    const hour12 = hour % 12 || 12;
                    const timeStr = `${hour12}:${m} ${ampm}`;

                    const datePart = event?.dateTime?.split(" - ")[0] || "";
                    if (datePart) {
                      handleUpdateEvent("dateTime", `${datePart} - ${timeStr}`);
                    }
                  }}
                  className="w-32 p-2 border border-gray-100 rounded focus:border-blue-300 outline-none"
                />
              </div>
            ) : (
              <p style={{ color: textColor + "E6" }}>{event?.dateTime}</p>
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
              <span style={{ color: textColor + "E6" }}>None</span>
            )}
          </div>
        </div>

        {!isEditing && (
          <>
            <hr
              className="border-t my-6 sm:my-8"
              style={{ borderColor: textColor + "4D" }} // 30%
            />
            {/* RSVP Section */}
            <div className="space-y-6">
              <h1
                className="text-2xl md:text-3xl font-serif mb-6 sm:mb-10 pb-4 inline-block border-b-2 text-black"
                style={{ borderColor: accentColor }}
              >
                Confirm Attendance
              </h1>

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
                      className="border rounded-md p-2 focus:outline-none focus:ring-1"
                      style={{ borderColor: textColor + "66" }}
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="text-sm mb-1 font-medium">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="border rounded-md p-2 focus:outline-none focus:ring-1"
                      style={{ borderColor: textColor + "66" }}
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-auto min-w-[140px]">
                    <label className="text-sm mb-1 font-medium text-transparent">
                      Status
                    </label>
                    <select
                      className="border rounded-md p-2 w-full"
                      style={{
                        borderColor: textColor + "66",
                        color: textColor + "CC",
                      }}
                    >
                      <option>Attending</option>
                      <option>Not attending</option>
                    </select>
                  </div>
                </div>

                {guests.map(
                  (guest, index) =>
                    index > 0 && (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pt-4 border-t border-gray-100"
                      >
                        <div className="flex flex-col w-full sm:w-1/2">
                          <label className="text-sm mb-1 font-medium">
                            Guest {index} First Name
                          </label>
                          <input
                            type="text"
                            value={guest.firstName}
                            onChange={(e) =>
                              handleGuestChange(
                                index,
                                "firstName",
                                e.target.value,
                              )
                            }
                            className="border rounded-md p-2 focus:outline-none focus:ring-1"
                            style={{ borderColor: textColor + "66" }}
                          />
                        </div>
                        <div className="flex flex-col w-full sm:w-1/2">
                          <label className="text-sm mb-1 font-medium">
                            Guest {index} Last Name
                          </label>
                          <input
                            type="text"
                            value={guest.lastName}
                            onChange={(e) =>
                              handleGuestChange(
                                index,
                                "lastName",
                                e.target.value,
                              )
                            }
                            className="border rounded-md p-2 focus:outline-none focus:ring-1"
                            style={{ borderColor: textColor + "66" }}
                          />
                        </div>
                      </div>
                    ),
                )}

                <button
                  type="button"
                  onClick={handleAddGuest}
                  className="flex items-center justify-center space-x-2 border rounded-md py-2 px-4 w-fit hover:bg-black/5 transition"
                  style={{ borderColor: textColor + "66" }}
                >
                  <span className="text-lg">+</span>
                  <span>Add guest</span>
                </button>

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
