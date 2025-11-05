import React from 'react'

export default function MoreDesign() {
    return (
        <div className="text-center mt-20">
            <p className="text-[#1F3A4B]/90 text-lg mb-6">
                You didn&apos;t find the perfect Online Memorial template yet?
                <br />
                You can browse more designs on our dedicated page:
            </p>

            <button className="bg-[#D4A043] text-white font-medium px-8 py-3 rounded-md hover:bg-[#C18E33] transition">
                More Designs
            </button>

            <p className="text-sm text-[#1F3A4B]/90 mt-6">
                Or create your page from the ground up with full customisation:{" "}
                <a
                    href="#"
                    className="text-[#D4A043] font-medium hover:underline"
                >
                    Start without theme →
                </a>
            </p>
        </div>
    )
}
