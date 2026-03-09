"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Upload, X, Trash2, Edit } from "lucide-react";
import api from "@/lib/api/api";
import axios from "axios";
import { toast } from "sonner";

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

    useEffect(() => {
        if (isOpen) {
            if (asset) {
                setFormData({
                    accountType: asset.details?.accountType || "",
                    accountNickname: asset.nickname || "",
                    accountHolderName: asset.details?.accountHolderName || "",
                    bankName: asset.details?.bankName || "",
                    bankType: asset.details?.bankType || "",
                    bankAccountNumber: asset.details?.bankAccountNumber || "",
                    ifscCode: asset.details?.ifscCode || "",
                    customerId: asset.details?.customerId || "",
                    branchNameAndAddress: asset.details?.branchNameAndAddress || "",
                    remarks: asset.notes || asset.details?.remarks || "",
                    vehicleType: asset.details?.vehicleType || "",
                    vehicleNickname: asset.nickname || "",
                    registrationNumber: asset.details?.registrationNumber || "",
                    manufacturingBrand: asset.details?.manufacturingBrand || "",
                    fuelType: asset.details?.fuelType || "",
                    label: asset.nickname || asset.details?.label || "",
                    ...asset.details
                });
                setAttachments(asset.attachments ? asset.attachments.map((a: string) => ({ name: a, key: a })) : []);
            } else {
                setFormData({});
                setAttachments([]);
            }
        }
    }, [isOpen, category, ownerId, asset]);

    if (!isOpen) return null;

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleNestedInputChange = (parent: string, field: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [parent]: {
                ...(prev[parent] || {}),
                [field]: value
            }
        }));
    };

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
                nickname: formData.accountNickname || formData.vehicleNickname || formData.label || `${category} Asset`,
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

    // Render form fields based on category
    const renderFormFields = () => {
        if (category === "Bank Account") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Type</label>
                        <select className="w-full border rounded-lg p-2" value={formData.accountType || ""} onChange={(e) => handleInputChange('accountType', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="Savings">Savings</option>
                            <option value="Current">Current</option>
                            <option value="NRO">NRO</option>
                            <option value="NRE">NRE</option>
                            <option value="PIS">PIS</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Nickname</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.accountNickname || ""} onChange={(e) => handleInputChange('accountNickname', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Holder Name (As per document)</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.accountHolderName || ""} onChange={(e) => handleInputChange('accountHolderName', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Bank Name</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.bankName || ""} onChange={(e) => handleInputChange('bankName', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Bank Type</label>
                        <select className="w-full border rounded-lg p-2" value={formData.bankType || ""} onChange={(e) => handleInputChange('bankType', e.target.value)}>
                            <option value="">Select...</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Cooperative">Cooperative</option>
                            <option value="Foreign">Foreign</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Account Number</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.bankAccountNumber || ""} onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">IFSC Code</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.ifscCode || ""} onChange={(e) => handleInputChange('ifscCode', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Customer ID</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.customerId || ""} onChange={(e) => handleInputChange('customerId', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Branch Name & Address</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.branchNameAndAddress || ""} onChange={(e) => handleInputChange('branchNameAndAddress', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Remarks</label>
                        <textarea className="w-full border rounded-lg p-2" value={formData.remarks || ""} onChange={(e) => handleInputChange('remarks', e.target.value)} />
                    </div>
                </div>
            );
        }

        if (category === "Vehicles") {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Vehicle Type</label>
                        <input type="text" placeholder="e.g. Car" className="w-full border rounded-lg p-2" value={formData.vehicleType || ""} onChange={(e) => handleInputChange('vehicleType', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Vehicle Nickname</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.vehicleNickname || ""} onChange={(e) => handleInputChange('vehicleNickname', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Registration Number</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.registrationNumber || ""} onChange={(e) => handleInputChange('registrationNumber', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Brand & Model</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.manufacturingBrand || ""} onChange={(e) => {
                            handleInputChange('manufacturingBrand', e.target.value);
                        }} />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Fuel Type</label>
                        <input type="text" className="w-full border rounded-lg p-2" value={formData.fuelType || ""} onChange={(e) => handleInputChange('fuelType', e.target.value)} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Remarks</label>
                        <textarea className="w-full border rounded-lg p-2" value={formData.remarks || ""} onChange={(e) => handleInputChange('remarks', e.target.value)} />
                    </div>
                </div>
            );
        }

        // Default Fallback Form
        return (
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Label / Nickname</label>
                    <input type="text" className="w-full border rounded-lg p-2" value={formData.label || formData.nickname || ""} onChange={(e) => handleInputChange('label', e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Remarks / Notes</label>
                    <textarea className="w-full border rounded-lg p-2" value={formData.remarks || ""} onChange={(e) => handleInputChange('remarks', e.target.value)} />
                </div>
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
