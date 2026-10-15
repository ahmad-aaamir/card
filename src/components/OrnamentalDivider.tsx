import React from "react";

interface OrnamentalDividerProps {
  className?: string;
  variant?: "flourish" | "botanical" | "crest" | "simple" | "diamond";
}

export function OrnamentalDivider({
  className = "",
  variant = "flourish",
}: OrnamentalDividerProps) {
  if (variant === "crest") {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#C5A05B]/60 to-[#C5A05B]" />
        <svg
          viewBox="0 0 48 24"
          className="w-10 h-6 text-[#C5A05B]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M24 2C24 2 27 7 34 7C39 7 42 4 42 4C42 4 39 12 30 12C26 12 24 16 24 22C24 16 22 12 18 12C9 12 6 4 6 4C6 4 9 7 14 7C21 7 24 2 24 2Z" />
          <circle cx="24" cy="12" r="1.5" fill="#C5A05B" />
        </svg>
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#C5A05B]/60 to-[#C5A05B]" />
      </div>
    );
  }

  if (variant === "botanical") {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A05B]/60" />
        <svg
          viewBox="0 0 36 20"
          className="w-8 h-5 text-[#C5A05B]"
          fill="currentColor"
        >
          {/* Olive & laurel branch flourish */}
          <path d="M18 10C16 6 12 4 8 4C10 6 11 8 11 10C11 12 10 14 8 16C12 16 16 14 18 10Z" opacity="0.8" />
          <path d="M18 10C20 6 24 4 28 4C26 6 25 8 25 10C25 12 26 14 28 16C24 16 20 14 18 10Z" opacity="0.8" />
          <circle cx="18" cy="10" r="1.5" />
        </svg>
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A05B]/60" />
      </div>
    );
  }

  if (variant === "diamond") {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A05B]/50" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A05B] bg-[#F7F0E7]" />
        <div className="w-2 h-2 rotate-45 bg-[#C5A05B]" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A05B] bg-[#F7F0E7]" />
        <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A05B]/50" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A05B]/50" />
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-[#C5A05B]"
        fill="currentColor"
      >
        <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
      </svg>
      <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A05B]/50" />
    </div>
  );
}

export function CornerFiligree({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const transformClass = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-[-1]",
  }[position];

  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none w-10 h-10 sm:w-14 sm:h-14 text-[#C5A05B]/70 ${transformClass} ${className}`}
    >
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        {/* Outer corner frame line */}
        <path
          d="M2 58V18C2 9.16344 9.16344 2 18 2H58"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        {/* Inner delicate corner detail */}
        <path
          d="M8 58V22C8 14.268 14.268 8 22 8H58"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        {/* Corner scroll flourish */}
        <path
          d="M12 26C12 18.268 18.268 12 26 12C32 12 36 16 36 22C36 27 31 30 26 30C22 30 19 27 19 23"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="26" cy="22" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
