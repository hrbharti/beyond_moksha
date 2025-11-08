import Foot from "./utils/Foot";
import GetInTouch from "./utils/GetInTouch";

export default function Footer() {

    return <div className="h-auto w-full mt-10 text-white" >

        {/* mail */}

        <div className="h-2/3 pb-30 px-34 ">
            <GetInTouch />
        </div>

        {/* Absolute footer */}

        <div className=" h-1/3 ">

            <Foot />

        </div>
    </div>
}