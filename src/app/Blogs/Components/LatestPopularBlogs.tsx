import { useEffect, useState } from "react";
import SideCard from "./SideCard";
import axiosInstance from "@/lib/api/axiosInstance";
interface IProps {
    selected: number;
    setSelected: (selected: number) => void;
}

interface Blog {
    id: number;
    title: string;
    presignedCoverUrl: string;
    createdAt: string;
}

interface ApiResponse {
    success: boolean;
    data: Blog[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasMore: boolean;
    };
}

const LatestPopularBlogs = ({ selected, setSelected }: IProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetchBlogs(selected);
    }, [selected]);

    const fetchBlogs = async (selected: number) => {
        const url = selected ? "/api/blogs/feed/latest" : "/api/blogs/feed/popular";
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get<ApiResponse>(url);

            if (response.data.success) {
                setBlogs(response.data.data);
            }
        } catch (err) {
            setError('Failed to fetch blogs');
            console.error('Error fetching blogs:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex w-full">
                <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 1 ? "bg-gradient-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(1)}> Latest </button>
                <button className={`flex-1 py-1.5 transition-all font-medium duration-300 ${selected === 0 ? "bg-gradient-to-t from-[#1F3A52] to-[#4682B8] rounded-full text-white shadow-md" : ""}`} onClick={() => setSelected(0)}> Popular </button>
            </div>
            {/* Loading State */}
            {loading && (
                <div className='flex justify-center items-center py-8'>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
                        <p className='text-sm text-gray-500'>Loading blogs...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className='flex justify-center items-center py-8'>
                    <p className='text-sm text-red-500'>{error}</p>
                </div>
            )}

            {/* Blogs List */}
            {!loading && blogs.length > 0 && (
                <div className='flex w-full flex-col gap-y-3'>
                    {blogs.map((blog, index) => (
                        <SideCard key={blog.id} {...blog} needDivider={index !== blogs.length - 1} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && blogs.length === 0 && !error && (
                <div className='flex justify-center items-center py-8'>
                    <p className='text-sm text-gray-500'>No blogs found</p>
                </div>
            )}
        </>
    )
}

export default LatestPopularBlogs;
