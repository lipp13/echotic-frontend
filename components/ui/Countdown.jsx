"use client";

import React, { useState, useEffect } from "react";

export default function Countdown({ targetDate, title = "NEXT SHOW PRESALE CLOSES IN" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="border border-zinc-800 bg-[#121212] rounded-2xl p-6 text-center text-sm text-zinc-400 font-medium tracking-wide">
        PRESALE HAS CONCLUDED — GENERAL ADMISSION OPEN
      </div>
    );
  }

  const timeBlocks = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, "0") }
  ];

  return (
    <div className="border border-zinc-800/80 bg-[#121212] rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-card-subtle relative overflow-hidden">
      {/* Background soft purple radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9d4edd]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center lg:text-left z-10">
        <span className="text-xs font-semibold text-[#9d4edd] uppercase tracking-widest block mb-2">
          Presale Countdown
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-sm text-zinc-400 mt-2 max-w-sm">
          Secure exclusive tier 1 passes before public allocation unlocks.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-6 z-10">
        {timeBlocks.map((block, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Number Card */}
            <div className="w-16 h-20 md:w-24 md:h-28 bg-[#1a1a1a] border border-zinc-800 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-black text-white shadow-inner relative">
              {block.value}
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-bold text-zinc-400 tracking-widest mt-2 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
