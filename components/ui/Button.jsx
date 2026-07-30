"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-bold uppercase tracking-wider transition-all focus:outline-none select-none cursor-pointer border";

  const variants = {
    primary:
      "bg-[#ccff00] text-black border-[#ccff00] hover:bg-black hover:text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.15)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]",
    secondary:
      "bg-transparent text-white border-white/30 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]",
    pink:
      "bg-[#ff0055] text-white border-[#ff0055] hover:bg-black hover:text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.15)] hover:shadow-[0_0_25px_rgba(255,0,85,0.4)]",
    outline:
      "bg-transparent text-zinc-400 border-zinc-800 hover:border-white hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-inherit shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
