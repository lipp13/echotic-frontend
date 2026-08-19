"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Music2 } from "lucide-react";

export default function Marquee({ text, speed = 26, direction = "left", className = "" }) {
  const words = Array(10).fill(text);
  const xVal = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`relative overflow-hidden w-full flex whitespace-nowrap border-y border-white/10 bg-[#060608]/90 py-4 backdrop-blur-xl ${className}`}>
      {/* Side gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060608] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060608] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: xVal }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex gap-14 pr-14 text-xs font-extrabold tracking-widest uppercase text-slate-300 will-change-transform select-none"
      >
        {words.map((w, index) => (
          <span key={index} className="flex items-center gap-6">
            <span className="hover:text-[#e5c158] transition-colors">{w}</span>
            <span className="flex items-center gap-1.5 text-[#e5c158]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
