import { ReactElement } from "react";

interface SecionProps{

    heading: string,
    subHeading: string;
    content: ReactElement
}
export const Section = ({heading,subHeading, content}:SecionProps)=>{

    return <div className="h-170 w-full ">
        
            <div className="flex flex-col ">
                <div className="h-40 flex flex-col items-center justify-end gap-5   p-3">
                        <div className="text-4xl font-semibold tracking-wider bg-gradient-to-t from-[#1F3A52] to-[#4682B8] bg-clip-text text-transparent">
                            {heading}
                        </div>

                </div>
                <div className="flex items-center justify-center"> 
                       <div className="text-[#393939]">
                        {subHeading}
                       </div>
                </div>

                <div className="w-full h-120 px-34 py-10">
                    <div className="  flex h-full w-full items-center justify-center">
                        {content}
                    </div>
                </div>
            </div>
    </div>
}