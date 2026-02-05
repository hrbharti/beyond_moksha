"use client";

import { useState, useRef } from "react";
import { Loader2, Trash2, Download, Upload, FileText, X } from "lucide-react";

// in FileManager.tsx
interface FileMetadata {
  key: string;
  size: number;
  lastModified: string;
  etag: string;
}

interface FileManagerProps {
  category: string;
  files: FileMetadata[];
  onUpload: (file: File, category: string) => Promise<void>;
  onDelete: (inputKey: string) => Promise<void>;
  onDownload: (inputKey: string, fileName: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export default function FileManager({
  category,
  files,
  onUpload,
  onDelete,
  onDownload,
  isOpen,
  onClose,
}: FileManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const categoryFiles = files.filter((f) => f.key.startsWith(`${category}/`));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await onUpload(file as unknown as File, category);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      setDeleting(key);
      await onDelete(key);
    } catch (error) {
      console.error("Delete failed", error);
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F8FAFC]">
          <div>
            <h2 className="text-xl font-bold text-[#1F3A52]">{category}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your documents for this category
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-white">
          {categoryFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              <FileText className="w-12 h-12 mb-2 opacity-50" />
              <p>No files uploaded yet</p>
            </div>
          ) : (
            categoryFiles.map((file) => {
              const fileName = file.key.split("/").pop() || file.key;
              return (
                <div
                  key={file.key}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:shadow-sm hover:border-[#2471B6]/30 transition-all group"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-[#F1F8FC] flex items-center justify-center flex-shrink-0 text-[#2471B6]">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span
                        className="font-medium text-[#1F3A52] truncate max-w-[200px] sm:max-w-xs"
                        title={fileName}
                      >
                        {fileName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.size)} •{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDownload(file.key, fileName)}
                      className="p-2 text-gray-400 hover:text-[#2471B6] hover:bg-[#F1F8FC] rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(file.key)}
                      disabled={deleting === file.key}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === file.key ? (
                        <Loader2
                          size={18}
                          className="animate-spin text-red-500"
                        />
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Upload Area */}
        <div className="p-6 border-t border-gray-100 bg-[#F8FAFC]">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full py-3 px-4 bg-[#2471B6] hover:bg-[#1a5c96] text-white rounded-xl font-medium transition-all shadow-lg shadow-[#2471B6]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {uploading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={20} />
                Upload Document
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
