"use client";

import React, { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Top Scroll Progress Indicator
 */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    mass: 0.1,
    restDelta: 0.0001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none bg-transparent">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#e5c158] via-[#ff2e63] to-[#e5c158] shadow-[0_0_12px_rgba(229,193,88,0.7)] will-change-transform"
        style={{ scaleX }}
      />
    </div>
  );
}

/**
 * Floating Back-to-Top Button
 */
function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="
            fixed bottom-6 right-6 z-40
            flex items-center justify-center
            w-11 h-11 rounded-full
            bg-[#0d0e14]/80 hover:bg-[#1a1c26]
            border border-white/15 hover:border-[#e5c158]/50
            text-slate-300 hover:text-[#e5c158]
            backdrop-blur-xl shadow-xl shadow-black/50
            transition-all duration-300 hover:scale-110 active:scale-95
            cursor-pointer group
          "
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="sr-only">Scroll ke atas</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Handles Route Changes and Internal Hash Anchor Smooth Scrolling
 */
function NavigationScrollHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  // Scroll to top or anchor on route change
  useEffect(() => {
    if (!lenis) return;

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target, { offset: -90, duration: 1.2 });
        }, 100);
        return;
      }
    }

    lenis.scrollTo(0, { immediate: true });
  }, [pathname, searchParams, lenis]);

  // Intercept hash link clicks on the page for ultra-smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: -90, duration: 1.2 });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  return null;
}

/**
 * Global Smooth Scroll Provider wrapping ReactLenis
 */
export default function SmoothScrollProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lenisOptions = {
    lerp: 0.085,
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    infinite: false,
    autoRaf: true,
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <ScrollProgressBar />
      <Suspense fallback={null}>
        <NavigationScrollHandler />
      </Suspense>
      {children}
      <BackToTopButton />
    </ReactLenis>
  );
}

export { useLenis };
