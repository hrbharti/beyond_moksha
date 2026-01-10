"use client";

import axiosInstance from "@/lib/api/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

interface IBlogData {
    id: string;
    title: string;
    tags: string[];
    contentUrl: string;
    coverImageUrl: string;
    readTime: number;
    views: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    presignedContentUrl: string;
    presignedCoverUrl: string;
}

interface IApiResponse {
    success: boolean;
    data: IBlogData;
}

export default function BlogDetail() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [contentLoading, setContentLoading] = useState(false);
    const [blog, setBlog] = useState<IBlogData | null>(null);
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current || !params.id) return;
        fetchedRef.current = true;

        const fetchBlogData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching blog data for ID:", params.id);
                const response = await axiosInstance.get<IApiResponse>(`/blogs/${params.id}`);
                console.log("Blog data response:", response.data);
                
                if (response.data.success) {
                    setBlog(response.data.data);
                    
                    // If there's a presigned content URL, fetch and convert the Word document
                    if (response.data.data.presignedContentUrl) {
                        await fetchWordDocument(response.data.data.presignedContentUrl);
                    }
                } else {
                    setError("Failed to fetch blog data");
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
                setError("Error fetching blog data");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [params.id]);

    const fetchWordDocument = async (presignedUrl: string) => {
        try {
            setContentLoading(true);
            console.log("Fetching Word document from:", presignedUrl);

            // Use frontend proxy API to avoid CORS issues
            const proxyUrl = `/api/proxy-document?url=${encodeURIComponent(presignedUrl)}`;
            console.log("Calling frontend proxy at:", proxyUrl);
            
            const response = await fetch(proxyUrl);
            
            if (!response.ok) {
                throw new Error(`Proxy request failed: ${response.status}`);
            }
            
            const arrayBuffer = await response.arrayBuffer();

            // Convert the array buffer to HTML using mammoth
            const mammoth = await import('mammoth');
            
            console.log("Converting Word document to HTML...");
            const result = await mammoth.convertToHtml({ arrayBuffer });
            
            if (result.value) {
                console.log("Word document converted successfully");
                setHtmlContent(result.value);
                if (result.messages && result.messages.length > 0) {
                    console.warn("Conversion warnings:", result.messages);
                }
            } else {
                throw new Error("Failed to convert Word document");
            }
        } catch (err) {
            console.error("Error processing Word document:", err);
            setError("Error processing document content");
        } finally {
            setContentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading blog...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Link 
                            href="/Blogs" 
                            className="text-orange-500 hover:text-orange-600 underline"
                        >
                            Back to Blogs
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Blog not found</p>
                        <Link 
                            href="/Blogs" 
                            className="text-orange-500 hover:text-orange-600 underline"
                        >
                            Back to Blogs
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8">
                {blog.presignedCoverUrl ? (
                    <Image
                        src={blog.presignedCoverUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="container mx-auto px-4 pb-8">
                        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white text-sm">
                            <span>{blog.readTime} min read</span>
                            <span>{blog.views} views</span>
                            <span>{blog.likes} likes</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none">
                        {contentLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                                <span className="ml-3 text-gray-600">Loading content...</span>
                            </div>
                        ) : htmlContent ? (
                            <div 
                                className="word-document-content"
                                dangerouslySetInnerHTML={{ __html: htmlContent }}
                            />
                        ) : (
                            <p className="text-gray-500 text-center py-8">
                                No content available
                            </p>
                        )}
                    </div>

                    {/* Back to Blogs */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link 
                            href="/Blogs"
                            className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to All Blogs
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}