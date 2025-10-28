import { BlogCard } from "./utils/BlogCard"
import hands from '../../../public/hands.png'
import { FaAngleDoubleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const Blogs = ()=>{
    const router = useRouter();


    return <div className="flex flex-col h-full w-full p-2 items-center justify-between gap-4">
        <div className="flex h-full w-full p-2 items-center justify-between gap-4">
                    <BlogCard
                content="understanding funeral attire in india"
                image={hands}
                />

                <BlogCard
                content="How to Assist Your Friends in Their Grief Recovery Process"
                image={hands}
                />

                <BlogCard
                content="How to Help Someone Overcome the Grief of Miscarriage"
                image={hands}
                />

                <BlogCard
                content="A Comprehensive Guide on What to Do When Someone Passes Away in Noida"
                image={hands}/>
        </div>

        <div className="flex items-center justify-center gap-2 cursor-pointer hover:scale-110 hover:tracking-wider transition-all duration-350"
            onClick={()=>router.push('Blogs')}>
            View all
            <FaAngleDoubleRight/>
        </div>
        
    </div>
}