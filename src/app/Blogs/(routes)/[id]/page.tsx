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

    // Fetch blog data - only once
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchBlog = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('🚀 Fetching blog with ID:', params.id);
                console.log('🌐 API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
                
                const response = await axiosInstance.get<IApiResponse>(`/api/blogs/${params.id}`);
                
                console.log('📡 API Response status:', response.status);
                console.log('📊 API Response data:', response.data);
                
                if (response.data.success) {
                    console.log('✅ Blog data received:', response.data.data);
                    console.log('🔗 presignedContentUrl:', response.data.data.presignedContentUrl);
                    console.log('🖼️ presignedCoverUrl:', response.data.data.presignedCoverUrl);
                    
                    setBlog(response.data.data);
                } else {
                    setError('Failed to load blog');
                }
            } catch (err) {
                console.error('❌ API call failed:', err);
                setError('Unable to fetch blog. Please try again later.');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchBlog();
        }
    }, [params.id]);

    // Fetch blog content - only when presigned URL is available
    useEffect(() => {
        if (blog?.presignedContentUrl) {
            setContentLoading(true);
            setError(null);
            
            const urlToUse = blog.presignedContentUrl;
            
            console.log('🔗 Using presigned content URL:', urlToUse);
            console.log('📄 Is Word document:', urlToUse.includes('.docx'));
            
            // Validate that it's a proper HTTPS URL
            if (!urlToUse.startsWith('https://')) {
                setError('Invalid content URL format. Expected HTTPS presigned URL.');
                setContentLoading(false);
                return;
            }
            
            // Check if it's a Word document
            if (urlToUse.includes('.docx')) {
                console.log('🔄 Converting Word document...');
                
                // Handle Word document - use presigned URL through a proxy
                import('mammoth').then((mammoth) => {
                    console.log('📚 Mammoth library loaded');
                    
                    // Create a proxy endpoint to fetch the document
                    const proxyUrl = `/api/proxy-document?url=${encodeURIComponent(urlToUse)}`;
                    
                    fetch(proxyUrl)
                        .then(response => {
                            console.log('📥 Fetched Word document via proxy, status:', response.status);
                            if (!response.ok) {
                                throw new Error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
                            }
                            return response.arrayBuffer();
                        })
                        .then(arrayBuffer => {
                            console.log('📦 ArrayBuffer size:', arrayBuffer.byteLength, 'bytes');
                            if (arrayBuffer.byteLength === 0) {
                                throw new Error('Empty Word document received');
                            }
                            
                            // Convert ArrayBuffer for mammoth
                            const uint8Array = new Uint8Array(arrayBuffer);
                            console.log('🔍 First few bytes:', Array.from(uint8Array.slice(0, 10)).map(b => b.toString(16).padStart(2, '0')).join(' '));
                            console.log('🔧 Converting with mammoth...');
                            
                            return (mammoth as any).convertToHtml({arrayBuffer: arrayBuffer}, {
                                includeDefaultStyleMap: true,
                                includeEmbeddedStyleMap: true,
                                convertImage: (mammoth as any).images.imgElement(function(image: any) {
                                    return image.read().then(function(imageBuffer: any) {
                                        const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
                                        return { src: `data:${image.contentType};base64,${base64}` };
                                    });
                                })
                            });
                        })
                        .then((result: any) => {
                            console.log('✅ Conversion successful!');
                            console.log('📄 HTML length:', result.value.length);
                            console.log('🎨 Generated HTML preview:', result.value.substring(0, 300) + '...');
                            console.log('⚠️ Conversion messages:', result.messages);
                            
                            if (result.value && result.value.trim()) {
                                setHtmlContent(result.value);
                                setError(null);
                            } else {
                                throw new Error('Empty content after conversion');
                            }
                            setContentLoading(false);
                        })
                        .catch(error => {
                            console.error('❌ Error converting Word document:', error);
                            setError(`Failed to convert Word document: ${error.message}`);
                            setContentLoading(false);
                        });
                }).catch(error => {
                    console.error('❌ Error loading mammoth library:', error);
                    setError('Failed to load document converter');
                    setContentLoading(false);
                });
            } else {
                console.log('📝 Processing as HTML content...');
                // Handle HTML content (existing logic)
                fetch(urlToUse)
                    .then(response => {
                        console.log('📥 HTML response status:', response.status);
                        if (!response.ok) throw new Error('Failed to fetch content');
                        return response.text();
                    })
                    .then(data => {
                        console.log('✅ HTML content loaded, length:', data.length);
                        setHtmlContent(data);
                        setContentLoading(false);
                    })
                    .catch(error => {
                        console.error('❌ Error fetching blog content:', error);
                        setError(`Failed to fetch content: ${error.message}`);
                        setContentLoading(false);
                    });
            }
        } else {
            // No presigned content URL available
            if (blog && !blog.presignedContentUrl) {
                console.warn('❌ No presignedContentUrl available for blog:', blog.id);
                setError('Content URL not available. The backend must provide a valid presigned URL.');
                setContentLoading(false);
            }
        }
    }, [blog?.presignedContentUrl]);

    // Skeleton Loader
    const SkeletonLoader = () => (
        <div className='max-w-4xl mx-auto px-4 py-8 animate-pulse'>
            <div className='h-12 bg-gray-200 rounded-lg mb-6 w-3/4'></div>
            <div className='h-64 bg-gray-200 rounded-lg mb-6'></div>
            <div className='space-y-4'>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                <div className='h-4 bg-gray-200 rounded w-4/6'></div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />

            <div className='flex-1'>
                {/* Loading State */}
                {loading && <SkeletonLoader />}

                {/* Error State */}
                {error && !loading && (
                    <div className='max-w-4xl mx-auto px-4 py-12'>
                        <div className='bg-red-50 border border-red-200 rounded-lg p-8 text-center'>
                            <svg className='w-12 h-12 mx-auto mb-4 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            <h2 className='text-2xl font-bold text-red-900 mb-2'>Oops! Something went wrong</h2>
                            <p className='text-red-700 mb-6'>{error}</p>
                            <Link href='/Blogs' className='inline-block bg-gradient-to-t from-[#1F3A52] to-[#4682B8] text-white px-6 py-2 rounded-full hover:shadow-lg transition'>
                                Back to Blogs
                            </Link>
                        </div>
                    </div>
                )}

                {/* Blog Content */}
                {!loading && blog && (
                    <article className='max-w-4xl mx-auto px-4 py-12'>
                        {/* Header Section */}
                        <div className='mb-8'>
                            <Link href='/Blogs' className='inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition'>
                                <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                                </svg>
                                Back to Blogs
                            </Link>

                            <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
                                {blog.title}
                            </h1>

                            {/* Meta Information */}
                            <div className='flex flex-wrap items-center gap-6 text-gray-600 border-b pb-4'>
                                {blog.createdAt && (
                                    <div className='flex items-center gap-2'>
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                        </svg>
                                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                )}

                                <div className='flex items-center gap-2'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                                    </svg>
                                    <span>{blog.views || 0} views</span>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H5a2 2 0 01-2-2V8a2 2 0 012-2h1.657a2 2 0 011.414.586l2.828-2.829a2 2 0 112.828 2.829l-.828.828h2.172a2 2 0 012 2v.286a2 2 0 01-2 2H12v4z' />
                                    </svg>
                                    <span>{blog.likes || 0} likes</span>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {blog.presignedCoverUrl && (
                            <div className='mb-8 rounded-lg overflow-hidden shadow-lg'>
                                <Image
                                    src={blog.presignedCoverUrl}
                                    alt={blog.title}
                                    width={800}
                                    height={400}
                                    className='w-full h-96 object-cover'
                                />
                            </div>
                        )}

                        {/* Content Loading State */}
                        {contentLoading && (
                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-6 text-center'>
                                <div className='flex justify-center mb-3'>
                                    <div className='w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
                                </div>
                                <p className='text-blue-700'>Loading content...</p>
                            </div>
                        )}

                        {/* Blog Content */}
                        {htmlContent && !contentLoading && (
                            <div className='prose prose-lg max-w-none'>
                                <div
                                    className='text-gray-700 leading-relaxed space-y-4'
                                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                                />
                            </div>
                        )}

                        {/* No Content */}
                        {!htmlContent && !contentLoading && !loading && !error && (
                            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center'>
                                <p className='text-yellow-800'>Content is being prepared. Please check back soon.</p>
                            </div>
                        )}

                        {/* Content Error */}
                        {error && !loading && (
                            <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
                                <p className='text-red-800'>{error}</p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className='mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Back Button */}
                        <div className='mt-12 pt-8 border-t'>
                            <Link href='/Blogs' className='inline-block bg-gradient-to-t from-[#1F3A52] to-[#4682B8] text-white px-8 py-3 rounded-full hover:shadow-lg transition'>
                                ← Back to Blogs
                            </Link>
                        </div>
                    </article>
                )}
            </div>

            <Footer />
        </div>
    )
}
