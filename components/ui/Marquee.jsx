"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Marquee({ text, speed = 20, direction = "left", className = "" }) {
  const words = Array(12).fill(text);

  const xVal = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`overflow-hidden w-full flex whitespace-nowrap border-y border-white/10 bg-[#060608]/80 py-3.5 backdrop-blur-md ${className}`}>
      <motion.div
        animate={{ x: xVal }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex gap-16 pr-16 text-xs font-bold tracking-widest uppercase text-slate-300"
      >
        {words.map((w, index) => (
          <span key={index} className="flex items-center gap-6">
            <span>{w}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158] block shadow-sm shadow-[#e5c158]/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

