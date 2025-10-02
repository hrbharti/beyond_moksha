import Foot from "./utils/Foot";
import GetInTouch from "./utils/GetInTouch";

export default function Footer() {

    return <div className="h-[130vh] w-full" >

        {/* mail */}

        <div className="h-2/3 bg-white px-[141px]">
            <GetInTouch />
        </div>

        {/* Absolute footer */}

        <div className=" bg-[#1F3A52] h-1/3">

            <Foot />

        </div>
    </div>
}