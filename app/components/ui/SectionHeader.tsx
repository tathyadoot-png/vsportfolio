"use client";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="w-[96%] lg:w-[88%] mx-auto md:pt-6 pt-8 flex items-end justify-between pb-3 mb-10">

      {/* Left side */}
      <div className="flex items-center gap-4">

        {/* Circle Icon */}
        <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-yellow-400 flex items-center justify-center shadow-md shadow-yellow-400/40">
          <span className="text-xl font-bold">★</span>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-400 tracking-tight">
            {title}
          </h2>

          {subtitle && (
            <p className="text-sm md:text-base text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Divider line */}
      <div className="hidden md:block w-1/3 h-[2px] bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0" />

    </div>
  );
}