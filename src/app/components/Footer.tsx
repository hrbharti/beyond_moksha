import Foot from "./utils/Foot";
import GetInTouch from "./utils/GetInTouch";

export default function Footer() {
    return (
        <div className="w-full mt-10 text-white">
            
            {/* Get In Touch Section */}
            <div className="w-full px-4 sm:px-6 lg:px-12 pb-10">
                <GetInTouch />
            </div>

            {/* Footer Bottom */}
            <div className="w-full">
                <Foot />
            </div>

        </div>
    );
}
