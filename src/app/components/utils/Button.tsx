import React from "react";

const variant = {
  primary: "bg-[#4682B8] bg-gradient-to-b from-[#4682B8] to-[#1F3A52]",
  secondary: "bg-[#020024] bg-gradient-to-b from-[#020024] via-[#090979] to-[#00D4FF]",
  danger: "bg-[#FD1D1D] bg-gradient-to-t from-[#FD1D1D] from-[54%] to-[#FCB045]",
} as const;

const btnSize = {
  // mobile-first: full width on very small screens, preserve fixed width on larger screens
  sm: "w-full sm:w-[167.5px] h-[32px] text-[15px]",
  lg: "w-full md:w-[335px] h-[64px] text-[22px]",
} as const;

interface BtnProps {
  variantType: keyof typeof variant;
  size: keyof typeof btnSize;
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({ variantType, size, text, onClick }: BtnProps) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.currentTarget.click();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={onClick}
      className={`${variant[variantType]} ${btnSize[size]} px-4 py-2 rounded text-white flex items-center justify-center cursor-pointer select-none`}
    >
      <div className="h-full w-full flex items-center justify-center">{text}</div>
    </div>
  );
};
