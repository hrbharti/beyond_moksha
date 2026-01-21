import Link from "next/link";

export default function MoreDesign() {
  return (
    <div className="text-center mt-20">
      <p className="text-[#1F3A4B]/90 text-lg mb-6">
        You didn&apos;t find the perfect Online Memorial template yet?
        <br />
        You can browse more designs on our dedicated page:
      </p>

      <Link
        href="/tribute/designs?theme=human"
        className="bg-gradient-to-b from-[#e1a935] to-[#c19232] text-white font-medium px-8 py-3 rounded-md hover:bg-[#C18E33] transition inline-block"
      >
        More Designs
      </Link>

      <p className="text-sm text-[#1F3A4B]/90 mt-6">
        Or create your page from the ground up with full customisation:{" "}
        <a href="/tribute/designs" className="text-[#D4A043] font-medium hover:underline">
          Start without theme →
        </a>
      </p>
    </div>
  );
}
