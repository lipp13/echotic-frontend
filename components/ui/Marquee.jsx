"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Marquee({ text, speed = 20, direction = "left", className = "" }) {
  const words = Array(12).fill(text);

  const xVal = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`overflow-hidden w-full flex whitespace-nowrap border-y border-zinc-800 bg-black/60 py-3 backdrop-blur-sm ${className}`}>
      <motion.div
        animate={{ x: xVal }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex gap-16 pr-16 text-lg font-black tracking-widest uppercase font-mono text-zinc-400"
      >
        {words.map((w, index) => (
          <span key={index} className="flex items-center gap-6">
            <span>{w}</span>
            <span className="w-2 h-2 rounded-full bg-[#ccff00] block" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
