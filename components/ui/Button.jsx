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
    "inline-flex items-center justify-center font-medium tracking-wide transition-all focus:outline-none select-none cursor-pointer rounded-full border text-center";

  const variants = {
    primary:
      "bg-white text-black border-white hover:bg-zinc-200 shadow-md hover:shadow-lg",
    accent:
      "bg-[#9d4edd] text-white border-[#9d4edd] hover:bg-[#b565f7] hover:border-[#b565f7] shadow-lg shadow-[#9d4edd]/20",
    secondary:
      "bg-zinc-900/80 text-white border-zinc-700/80 hover:bg-zinc-800 hover:border-zinc-500 backdrop-blur-sm",
    pink:
      "bg-[#9d4edd] text-white border-[#9d4edd] hover:bg-[#b565f7]",
    outline:
      "bg-transparent text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white hover:bg-zinc-900/50",
    ghost:
      "bg-transparent text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900/50",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs font-semibold",
    md: "px-6 py-3 text-sm font-semibold",
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
        disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-inherit shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
