"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "@/lib/api/api";
import axios from "axios";
import { toast } from "sonner";

interface FileUploadProps {
  category: string;
  onUploadComplete?: () => void;
}

export default function FileUpload({
  category,
  onUploadComplete,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        for (const file of acceptedFiles) {
          // 1. Get presigned URL
          const res = await api.post(`/vault/upload`, {
            fileName: `${category}/${file.name}`,
            fileType: file.type,
          });

          const { uploadUrl } = await res.data;

          // 2. Upload to S3
          const uploadRes = await axios.put(uploadUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });

          if (uploadRes.status !== 200)
            throw new Error("Failed to upload to S3");
        }

        toast.success("File uploaded successfully!");
        if (onUploadComplete) onUploadComplete();
      } catch (error) {
        console.error("Upload Error", error);
        toast.error("Failed to upload file");
      } finally {
        setIsUploading(false);
      }
    },
    [category, onUploadComplete],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div className="text-sm text-gray-600 mb-1">Upload Documents</div>
      <div
        {...getRootProps()}
        className={`border border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer transition-colors ${isDragActive ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"}`}
      >
        <input {...getInputProps()} disabled={isUploading} />
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mb-2"></div>
            <p className="text-sm text-gray-500">Uploading...</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {isDragActive
              ? "Drop files here..."
              : "Drag & drop files here, or click to select"}
          </p>
        )}
      </div>
    </div>
  );
}
