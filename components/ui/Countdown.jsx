"use client";

import React, { useState, useEffect } from "react";

export default function Countdown({ targetDate, title = "PRESALE KONSER BERIKUTNYA DITUTUP DALAM" }) {
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
      <div className="glass-panel-premium rounded-2xl p-6 text-center text-sm text-slate-300 font-semibold tracking-wide">
        PRESALE TELAH DITUTUP — PENJUALAN TIKET UMUM DIBUKA
      </div>
    );
  }

  const timeBlocks = [
    { label: "HARI", value: String(timeLeft.days).padStart(2, "0") },
    { label: "JAM", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MENIT", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "DETIK", value: String(timeLeft.seconds).padStart(2, "0") }
  ];

  return (
    <div className="glass-panel-premium rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
      {/* Background soft gold radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e5c158]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center lg:text-left z-10">
        <span className="text-xs font-bold text-[#e5c158] uppercase tracking-widest block mb-2">
          Hitung Mundur Presale
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-slate-300 mt-2 max-w-sm">
          Amankan tiket tier 1 eksklusif sebelum kuota umum dibuka.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-5 z-10">
        {timeBlocks.map((block, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Number Card */}
            <div className="w-16 h-20 md:w-22 md:h-26 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-extrabold text-white font-mono shadow-inner backdrop-blur-md">
              {block.value}
            </div>
            
            {/* Label */}
            <span className="text-[10px] font-bold text-slate-400 tracking-widest mt-2 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


