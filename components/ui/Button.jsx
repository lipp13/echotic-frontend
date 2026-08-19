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
    "shimmer-btn inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c158] select-none cursor-pointer rounded-full border text-center active:scale-95";

  const variants = {
    primary:
      "bg-white text-black border-white hover:bg-slate-100 shadow-md hover:shadow-lg shadow-white/5",
    accent:
      "bg-gradient-to-r from-[#f5d77f] via-[#e5c158] to-[#d4af37] text-black border-[#e5c158] hover:brightness-110 shadow-lg shadow-[#e5c158]/20 font-bold",
    gold:
      "bg-gradient-to-r from-[#f5d77f] via-[#e5c158] to-[#d4af37] text-black border-[#e5c158] hover:brightness-110 shadow-lg shadow-[#e5c158]/20 font-bold",
    secondary:
      "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md",
    crimson:
      "bg-gradient-to-r from-[#ff527b] to-[#ff2e63] text-white border-[#ff2e63] hover:brightness-110 shadow-lg shadow-[#ff2e63]/20 font-bold",
    pink:
      "bg-gradient-to-r from-[#ff527b] to-[#ff2e63] text-white border-[#ff2e63] hover:brightness-110 shadow-lg shadow-[#ff2e63]/20 font-bold",
    outline:
      "bg-transparent text-slate-300 border-white/15 hover:border-white/40 hover:text-white hover:bg-white/5",
    ghost:
      "bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base font-bold",
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
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-inherit shadow-none pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

