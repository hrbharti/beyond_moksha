import { ReactElement } from "react";

interface SecionProps{

    heading: string,
    subHeading: string;
    content: ReactElement
}
export const Section = ({heading,subHeading, content}:SecionProps)=>{

    return <div className="w-full h-auto ">
        
            <div className="flex flex-col h-auto">
                <div className="h-40 flex flex-col items-center justify-end gap-5 p-3">
                        <div className="text-4xl tracking-wider bg-gradient-to-t from-[#1F3A52] to-[#4682B8] bg-clip-text text-transparent font-lora font-normal">
                            {heading}
                        </div>

                </div>
                <div className="flex items-center justify-center"> 
                       <div className="text-[#393939] mt-6">
                        {subHeading}
                       </div>
                </div>

                <div className="w-full h-auto px-34">
                    <div className="  flex h-full w-full items-center justify-center">
                        {content}
                    </div>
                </div>
            </div>
    </div>
}