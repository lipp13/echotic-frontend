"use client";

import React, { useState, useEffect } from "react";

export default function Countdown({ targetDate, title = "TICKET SALES CLOSING IN" }) {
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
      <div className="border border-[#ff0055]/30 bg-black/60 backdrop-blur-sm p-4 text-center font-mono text-sm text-[#ff0055] tracking-widest uppercase">
        ⚡ EVENT TICKETS ARE SOLD OUT / SALES CLOSED ⚡
      </div>
    );
  }

  const timeBlocks = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
    { label: "HRS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MINS", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SECS", value: String(timeLeft.seconds).padStart(2, "0") }
  ];

  return (
    <div className="border border-zinc-800 bg-black/50 backdrop-blur-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="font-mono text-center md:text-left">
        <span className="text-[10px] text-zinc-500 tracking-widest uppercase block mb-1">
          Urgency Notice
        </span>
        <h4 className="text-sm font-bold text-white tracking-wider uppercase">
          {title}
        </h4>
      </div>

      <div className="flex gap-4">
        {timeBlocks.map((block, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Number Block */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-950 border border-zinc-800 rounded-sm flex items-center justify-center font-mono text-2xl md:text-3xl font-black text-[#ccff00] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] relative">
              {block.value}
              
              {/* Scanline overlay in digital block */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
            
            {/* Label */}
            <span className="text-[9px] font-mono text-zinc-500 tracking-wider mt-1.5 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
