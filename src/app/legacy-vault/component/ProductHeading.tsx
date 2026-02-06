export default function ProductsHeading() {
  return (
    <div className="relative flex items-center justify-center py-10 md:py-20 bg-[#F1F8FC] overflow-hidden">
      <h1
        className="
          absolute inset-0 flex items-center justify-center
          text-transparent text-4xl md:text-[10vw] font-extrabold tracking-widest
          stroke-text pointer-events-none select-none leading-none z-0 opacity-50
          whitespace-nowrap
        "
      >
        OUR PRODUCTS
      </h1>
      <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-semibold text-[#2955A0] tracking-wide mt-5 md:mt-30">
        Our Products
      </h2>
    </div>
  );
}
