"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, X, Trash2, Edit } from "lucide-react";
import api from "@/lib/api/api";
import axios from "axios";
import { toast } from "sonner";
import { ASSET_SCHEMAS, FieldConfig } from "../utils/assetSchemas";

interface AssetModalProps {
    category: string;
    isOpen: boolean;
    onClose: () => void;
    ownerId?: string;
    asset?: any;
    onDelete?: () => void;
}

export default function AssetModal({
    category,
    isOpen,
    onClose,
    ownerId,
    asset,
    onDelete,
}: AssetModalProps) {
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState<any>({});
    const [uploading, setUploading] = useState(false);
    const [attachments, setAttachments] = useState<{ name: string, key: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isReadOnly = !!ownerId;

    // Utility to get nested object value (e.g., 'nominee.name')
    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Utility to set nested object value
    const setNestedValue = (obj: any, path: string, value: any): any => {
        const parts = path.split('.');
        if (parts.length === 1) {
            return { ...obj, [path]: value };
        }
        
        const [head, ...tail] = parts;
        return {
            ...obj,
            [head]: setNestedValue(obj[head] || {}, tail.join('.'), value)
        };
    };

    const handleDynamicChange = (fieldPath: string, value: any) => {
        setFormData((prev: any) => {
            // Handle special currency fields which expect { currency: "INR", value: "xxx" }
            if (fieldPath.endsWith('.value')) {
                const parentPath = fieldPath.replace('.value', '');
                return setNestedValue(prev, parentPath, { currency: "INR", value });
            }
            return setNestedValue(prev, fieldPath, value);
        });
    };

    useEffect(() => {
        if (isOpen) {
            if (asset) {
                const initialData = { ...asset.details };
                
                
                // Set notes -> remarks fallback
                if (!initialData.remarks) {
                    initialData.remarks = asset.notes || "";
                }
                
                setFormData(initialData);
                setAttachments(asset.attachments ? asset.attachments.map((a: string) => ({ name: a, key: a })) : []);
            } else {
                setFormData({});
                setAttachments([]);
            }
        }
    }, [isOpen, category, ownerId, asset]);

    if (!isOpen) return null;


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || isReadOnly) return;

        try {
            setUploading(true);
            // Upload to S3 directly
            const res = await api.post(`/vault/upload`, {
                fileName: `${category}/${Date.now()}_${file.name}`,
                fileType: file.type,
            });

            const { uploadUrl, key } = res.data;

            const uploadRes = await axios.put(uploadUrl, file, {
                headers: { "Content-Type": file.type },
            });

            if (uploadRes.status !== 200) throw new Error("Failed to upload");

            setAttachments((prev) => [...prev, { name: file.name, key }]);
            toast.success("File uploaded to form");
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("File upload failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = {
                assetType: category,
                details: formData,
                notes: formData.remarks || "",
                attachments: attachments.map(a => a.key),
            };

            if (asset) {
                await api.put(`/vault/assets/${asset.id}`, payload);
                toast.success("Asset updated successfully!");
            } else {
                await api.post('/vault/assets', payload);
                toast.success("Asset saved successfully!");
            }
            onClose();
        } catch (error) {
            console.error("Failed to save asset", error);
            toast.error("Failed to save asset");
        } finally {
            setLoading(false);
        }
    };

    // Generic Form Renderer based on ASSET_SCHEMAS
    const renderFormFields = () => {
        const schema = ASSET_SCHEMAS[category] || ASSET_SCHEMAS["Default"];

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schema.fields.map((field: FieldConfig) => {
                    // Extract value, specially handling currency .value paths
                    let value = getNestedValue(formData, field.name);
                    if (value === undefined || value === null) value = "";
                    
                    const isFullWidth = field.colSpan === 2 || field.type === "textarea";

                    return (
                        <div key={field.name} className={isFullWidth ? "md:col-span-2" : ""}>
                            <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                            
                            {field.type === "textarea" ? (
                                <textarea 
                                    className="w-full border rounded-lg p-2 min-h-[100px]" 
                                    value={value} 
                                    onChange={(e) => handleDynamicChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            ) : field.type === "select" ? (
                                <select 
                                    className="w-full border rounded-lg p-2" 
                                    value={value} 
                                    onChange={(e) => handleDynamicChange(field.name, e.target.value)}
                                    required={field.required}
                                >
                                    <option value="">Select...</option>
                                    {field.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    type={field.type}
                                    className="w-full border rounded-lg p-2" 
                                    value={value} 
                                    onChange={(e) => handleDynamicChange(field.name, e.target.value)}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F8FAFC]">
                    <div>
                        <h2 className="text-xl font-bold text-[#1F3A52]">{category}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Add a new {category} asset
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderFormFields()}

                        {/* Attachments Section */}
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">Attachments</h3>
                            <div className="flex flex-col gap-3">
                                {attachments.map((att) => (
                                    <div key={att.key} className="flex items-center justify-between border p-2 rounded-lg bg-gray-50">
                                        <span className="truncate">{att.name}</span>
                                    </div>
                                ))}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="border-2 border-dashed border-[#2471B6] text-[#2471B6] py-8 rounded-xl flex justify-center items-center gap-2 hover:bg-[#F1F8FC] transition-colors disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                    {uploading ? "Uploading..." : "Upload Document"}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-start gap-4 pt-6 border-t mt-6">
                            {asset ? (
                                <>
                                    <button
                                        type="submit"
                                        disabled={loading || uploading || isReadOnly}
                                        className="px-6 py-2 bg-[#102C40] text-white rounded-full hover:bg-[#1a4463] transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2 min-w-[120px]"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                                        Update
                                    </button>
                                    {!isReadOnly && onDelete && (
                                        <button
                                            type="button"
                                            onClick={onDelete}
                                            className="px-6 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors font-medium flex items-center justify-center gap-2 min-w-[120px]"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || uploading || isReadOnly}
                                        className="px-6 py-2 bg-[#0866FF] text-white rounded-xl hover:bg-[#0756d6] transition-colors disabled:opacity-50 font-medium flex items-center gap-2"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                        Save Asset
                                    </button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
