"use client";

import React, { useState, useRef } from "react";
import GalleryImage from "./Components/GalleryImage";
import { Trash2, Camera, Loader2, Plus } from "lucide-react";
import api from "@/lib/api/api";
import { toast } from "sonner";

interface GalleryProps {
  images?: string[];
  isEditing?: boolean;
  accentColor?: string;
  textColor?: string;
  onUpdate?: (images: string[]) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  images: initialImages = [],
  isEditing = false,
  accentColor = "#D4A043",
  textColor = "#1F3A4B",
  onUpdate,
}) => {
  const [viewMode, setViewMode] = useState<"all" | "slideshow">("all");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ensure images is always an array
  const images = Array.isArray(initialImages) ? initialImages : [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "gallery");

    try {
      setIsUploading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = response.data;

      if (onUpdate) {
        const newImages = [...images, url];
        onUpdate(newImages);
      }

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!onUpdate) return;
    const newImages = images.filter((_, i) => i !== index);
    onUpdate(newImages);
  };

  // Remove the early return null to ensure the section always renders
  // if (!isEditing && (!images || images.length === 0)) return null;

  return (
    <div id="gallery" className="w-full max-w-6xl mt-24">
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-serif pb-4 inline-block border-b-2 text-black"
          style={{ borderColor: accentColor }}
        >
          Gallery
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setViewMode("all")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${viewMode === "all" ? "text-white" : "hover:bg-[#1F3A4B]/10"
            }`}
          style={{
            borderColor: viewMode === "all" ? accentColor : textColor + "66",
            color: viewMode === "all" ? "white" : textColor,
            backgroundColor: viewMode === "all" ? accentColor : "transparent",
          }}
        >
          All
        </button>

        <button
          onClick={() => setViewMode("slideshow")}
          className={`px-6 py-2 border rounded-md text-sm md:text-base transition-all duration-300 ${viewMode === "slideshow" ? "text-white" : "hover:bg-[#1F3A4B]/10"
            }`}
          style={{
            borderColor:
              viewMode === "slideshow" ? accentColor : textColor + "66",
            color: viewMode === "slideshow" ? "white" : textColor,
            backgroundColor:
              viewMode === "slideshow" ? accentColor : "transparent",
          }}
        >
          Slide Show
        </button>
      </div>

      {/* Hidden file input for gallery upload */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* Gallery Grid or Slide Show */}
      {viewMode === "all" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((src, i) => (
            <div key={i} className="relative group/img">
              <GalleryImage src={src} alt={`Gallery image ${i + 1}`} />
              {isEditing && (
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity shadow-lg"
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          {/* Empty state when not editing and no images */}
          {!isEditing && images.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <Camera size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 italic font-sans text-center px-4">
                No photos added yet. Share your beautiful memories here.
              </p>
            </div>
          )}

          {/* Upload button - shown when editing */}
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="relative aspect-[3/4] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-solid hover:bg-gray-50"
              style={{ borderColor: isUploading ? "#ccc" : accentColor + "80" }}
            >
              {isUploading ? (
                <>
                  <Loader2 size={32} className="animate-spin" style={{ color: accentColor }} />
                  <span className="text-sm text-gray-500 font-sans">Uploading...</span>
                </>
              ) : (
                <>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: accentColor + "20" }}
                  >
                    <Plus size={28} style={{ color: accentColor }} />
                  </div>
                  <span className="text-sm font-medium font-sans" style={{ color: textColor }}>
                    Add Photo
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px] sm:h-[400px] md:h-[500px] bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-lg italic">
            Slideshow view coming soon...
          </p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
