import React from "react";

interface StepCardProps {
  step: number | string;
  title: string;
  active?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, active = false }) => {
  return (
    <div
      className={`relative rounded-md p-[2px] transition-all duration-300 bg-gradient-to-b from-blue-300 to-blue-950`}
    >
      <div
        className={`flex items-center justify-between w-full md:w-auto rounded-md px-5 py-3 font-serif italic text-[1rem] bg-white`}
      >
        <span>{title}</span>
        <span className="ml-3 text-sm font-semibold">{step}</span>
      </div>
    </div>
  );
};

export default StepCard;
