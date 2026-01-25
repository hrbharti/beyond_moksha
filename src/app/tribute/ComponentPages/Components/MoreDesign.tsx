import Link from "next/link";

export default function MoreDesign({ theme }: { theme: "human" | "pet" }) {
  return (
    <div className="text-center mt-20">
      <p className="text-[#1F3A4B]/90 text-lg mb-6">
        You didn&apos;t find the perfect Online Memorial template yet?
        <br />
        You can browse more designs on our dedicated page:
      </p>

      <Link
        href={`/tribute/designs?theme=${theme}`}
        className="mt-4 px-6 py-3 bg-white text-[#D4A043] font-medium text-sm rounded-lg border border-[#D4A043] hover:bg-[#D4A043] hover:text-white transition-colors duration-200 shadow-sm"
      >
        More Designs
      </Link>

      <p className="text-sm text-[#1F3A4B]/90 mt-6">
        Or create your page from the ground up with full customisation:{" "}
        <a
          href={`/tribute/designs?theme=${theme}`}
          className="text-[#D4A043] font-medium hover:underline"
        >
          Start without theme →
        </a>
      </p>
    </div>
  );
}
