"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api/api";
import { FileIcon, Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface VaultFile {
  key: string;
  size: number;
  lastModified: string;
  etag: string;
}

interface StoragePageProps {
  ownerId?: string;
}

export default function StoragePage({ ownerId }: StoragePageProps) {
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [storageUsed, setStorageUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const isReadOnly = !!ownerId;

  const fetchStorage = async () => {
    try {
      const url = ownerId
        ? `/vault/storage?ownerId=${ownerId}`
        : `/vault/storage`;
      const res = await api.get(url);
      setStorageUsed(res.data.storageUsed || 0);
    } catch (error) {
      console.error("Failed to fetch storage", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const url = ownerId ? `/vault/files?ownerId=${ownerId}` : `/vault/files`;
      const res = await api.get(url);
      // Ensure we have an array
      const fileList = Array.isArray(res.data.files) ? res.data.files : [];
      setFiles(fileList);
    } catch (error) {
      console.error("Failed to fetch files", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorage();
    fetchFiles();
  }, [ownerId]);

  const handleDownload = async (fileKey: string) => {
    const fileName = fileKey.split("/").pop() || "file";
    try {
      const res = await api.get(
        `/vault/download?key=${encodeURIComponent(fileKey)}`,
      );
      const { downloadUrl } = res.data;

      // Trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download file");
    }
  };

  const handleDelete = async (fileKey: string) => {
    if (isReadOnly) return;
    if (!confirm("Are you sure you want to delete this file?")) return;
    try {
      await api.delete(`/vault/files`, { data: { key: fileKey } });
      toast.success("File deleted");
      fetchFiles();
      fetchStorage();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete file");
    }
  };

  // Convert bytes to readable format
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const totalStorage = 10 * 1024 * 1024 * 1024; // 10 GB
  const usagePercent = Math.min((storageUsed / totalStorage) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F4FF] to-[#F1F8FC] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1F3A52]">Storage</h1>
            <p className="text-gray-600">
              View and manage all your secure files.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 w-64">
            <p className="text-sm font-semibold text-[#1F3A52] mb-2">
              Storage Used
            </p>
            <div className="bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="bg-[#0866FF] h-full rounded-full transition-all duration-500"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatSize(storageUsed)}</span>
              <span>10 GB</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#0866FF]" size={40} />
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileIcon className="text-[#0866FF]" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No files yet
            </h3>
            <p className="text-gray-500 mt-2">
              Upload files in the Asset Vault to see them here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    File Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Size
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Date Uploaded
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {files.map((file) => (
                  <tr
                    key={file.key}
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-[#0866FF]">
                          <FileIcon size={20} />
                        </div>
                        <span className="font-medium text-gray-700 truncate max-w-xs">
                          {file.key ? file.key.split("/").pop() : "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {formatSize(file.size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {file.lastModified
                        ? new Date(file.lastModified).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleDownload(file.key)}
                          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition"
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                        {!isReadOnly && (
                          <button
                            onClick={() => handleDelete(file.key)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
