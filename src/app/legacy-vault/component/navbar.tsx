import Logo from "./Logo";

export default function Navbar({ isNav }: { isNav?: boolean }) {
  const navList = ["Products", "Top Performers", "Privacy & Protection"];

  return (
    <div className="h-40 w-full flex justify-center items-center px-30  sticky top-0 z-50">
      <div className="flex h-[50%] w-full items-center justify-between py-12 rounded-[20px] border-[2px] border-[bg-[linear-gradient(to bottom, #3B82F6, #000000)]] bg-[rgba(241,248,252,0.65)]">
        <div className="ml-4">
          <Logo isNav={isNav} className="text-4xl" routeTo="/legacy-vault" />
        </div>

        <div className="flex gap-2 px-16">
          <div className="flex items-center ml-20 text-[#1E293B] text-lg">
            {navList.map((item) => {
              return (
                <span key={item} className="mx-4">
                  {item}
                </span>
              );
            })}
          </div>

          <div>
            <button className="bg-[linear-gradient(90deg,#0866FF,#053D99)] px-6 py-2 text-white rounded-md hover:opacity-90 transition">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
