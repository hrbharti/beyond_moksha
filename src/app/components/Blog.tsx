import { BlogCard } from "./utils/BlogCard"
import hands from '../../../public/hands.png'

export const Blogs = ()=>{

    return <div className="flex h-full w-full p-2 items-center justify-between gap-4">
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
}