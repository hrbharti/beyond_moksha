import Foot from "./utils/Foot";
import GetInTouch from "./utils/GetInTouch";

export default function Footer() {

    return <div className="h-[150vh] w-full mt-20" >

        {/* mail */}

        <div className="h-2/3 bg-white px-34">
            <GetInTouch />
        </div>

        {/* Absolute footer */}

        <div className=" h-1/3">

            <Foot />

        </div>
    </div>
}