export default function ProductsHeading() {
  return (
    <div className="relative flex items-center justify-center py-30 bg-[#F1F8FC]">

      {/* OUTLINE BACKGROUND TEXT */}
      <h1
        className="
          absolute inset-0 flex items-center
          text-transparent text-[193px]  font-extrabold tracking
          stroke-text pointer-events-none select-none leading-none z-0 opacity-50
        "
      >
        OUR PRODUCTs
      </h1>

      {/* ACTUAL TITLE */}
      <h2 className="relative z-10 text-4xl md:text-5xl font-semibold text-[#2955A0] tracking-wide  mt-30 -ml-132">
        Our Products
      </h2>
    </div>
  );
}
