"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High-precision spring physics for silky 120fps glide
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.1 });

  const auraX = useSpring(mouseX, { stiffness: 180, damping: 24, mass: 0.2 });
  const auraY = useSpring(mouseY, { stiffness: 180, damping: 24, mass: 0.2 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("[data-cursor='pointer']") ||
        target.closest(".cursor-pointer") ||
        target.closest(".group");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Large Ambient Aura Glow that lags smoothly behind */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform"
        style={{
          x: auraX,
          y: auraY,
          width: isHovered ? 80 : 44,
          height: isHovered ? 80 : 44,
          background: isHovered
            ? "radial-gradient(circle, rgba(229, 193, 88, 0.25) 0%, rgba(229, 193, 88, 0.05) 50%, transparent 80%)"
            : "radial-gradient(circle, rgba(229, 193, 88, 0.15) 0%, transparent 70%)",
          border: isHovered ? "1px solid rgba(229, 193, 88, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: isHovered ? "blur(2px)" : "none",
          transition: "width 0.25s ease-out, height 0.25s ease-out, background 0.25s ease-out, border 0.25s ease-out",
        }}
      />

      {/* 2. Crisp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-[#e5c158] shadow-[0_0_10px_#e5c158] will-change-transform"
        style={{
          x: springX,
          y: springY,
          width: isHovered ? 6 : 4.5,
          height: isHovered ? 6 : 4.5,
          opacity: isHovered ? 0.9 : 0.8,
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </div>
  );
}
