"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
  Sparkles,
  Ticket,
  ChevronRight,
  Music2,
  Compass,
  Flame,
} from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";

/**
 * Animated Soundwave on Card Hover
 */
function SoundwaveAnimation({ isHovered }) {
  return (
    <div className="flex items-end gap-[3px] h-4">
      {[0.4, 0.9, 0.6, 1, 0.7, 0.5, 0.85, 0.3].map((heightRatio, i) => (
        <span
          key={i}
          className="w-[2.5px] rounded-full bg-[#e5c158] transition-all duration-300"
          style={{
            height: isHovered ? `${Math.max(4, heightRatio * 16)}px` : "3.5px",
            opacity: isHovered ? 1 : 0.45,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Premium Showcase Concert Card for Horizontal Reel
 */
function HorizontalCard({ event, index }) {
  const [isHovered, setIsHovered] = useState(false);
  if (!event) return null;

  const { id, title, subtitle, date, venueId, ticketCategories, image, artist_name, genre } = event;

  const lowestPrice =
    ticketCategories && Array.isArray(ticketCategories) && ticketCategories.length > 0
      ? Math.min(...ticketCategories.map((c) => c?.price || 0))
      : 0;

  const displayArtist = artist_name || subtitle || "Featured Musician";
  const displayVenue = event.venue_name || event.venue || (venueId ? venueId.replace(/_/g, " ") : "Venue Konser");
  const formattedDate = formatDate(date);
  const displayDate = formattedDate.includes(",") ? formattedDate.split(",")[1]?.trim() : formattedDate;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col w-[320px] sm:w-[380px] md:w-[420px] h-[460px] sm:h-[490px] md:h-[520px] max-h-[64vh] shrink-0 rounded-3xl overflow-hidden glass-panel-premium border border-white/10 hover:border-[#e5c158]/50 shadow-2xl transition-colors duration-500 select-none"
    >
      {/* Background Poster Image with Zoom */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        {image && (
          <motion.img
            src={image}
            alt={title || "Concert Poster"}
            className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />
        )}
        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/75 to-[#060608]/20" />
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#060608]/40 to-[#060608]" />
      </div>

      {/* Top Badges & Meta */}
      <div className="relative z-10 p-5 md:p-6 flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Index Pill */}
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 text-[11px] font-mono font-bold text-[#e5c158]">
            #{String(index + 1).padStart(2, "0")}
          </span>

          {/* Genre Pill */}
          {genre && (
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-200">
              {genre}
            </span>
          )}
        </div>

        {/* Date Badge */}
        <div className="px-3 py-1 rounded-full bg-[#060608]/80 backdrop-blur-xl border border-white/15 text-xs font-semibold text-slate-200 shadow-lg flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>{displayDate}</span>
        </div>
      </div>

      {/* Ambient Glow on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-[#e5c158]/15 via-transparent to-[#ff2e63]/10" />

      {/* Bottom Content Body */}
      <div className="relative z-10 mt-auto p-5 md:p-6 flex flex-col">
        {/* Artist & Soundwave indicator */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158] animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-[#e5c158] uppercase tracking-wider line-clamp-1">
              {displayArtist}
            </span>
          </div>
          <SoundwaveAnimation isHovered={isHovered} />
        </div>

        {/* Title */}
        <Link href={`/events/${id}`} className="group/title block">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug line-clamp-2 group-hover/title:text-[#e5c158] transition-colors mb-2.5">
            {title}
          </h3>
        </Link>

        {/* Venue Info */}
        <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-4 sm:mb-5">
          <MapPin className="w-3.5 h-3.5 text-[#e5c158] shrink-0" />
          <span className="truncate font-medium capitalize">{displayVenue.toLowerCase()}</span>
        </div>

        {/* Footer: Price & CTA Action */}
        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-0.5">
              Mulai Dari
            </span>
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-white font-mono">
              {formatPrice(lowestPrice)}
            </span>
          </div>

          <Link
            href={`/events/${id}`}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-[#e5c158] text-white hover:text-black border border-white/20 hover:border-[#e5c158] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
          >
            <span>Pesan</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * End Card: Portal to Full Events Catalog
 */
function ExploreMoreCard({ totalEvents }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between w-[300px] sm:w-[340px] md:w-[370px] h-[460px] sm:h-[490px] md:h-[520px] max-h-[64vh] shrink-0 rounded-3xl overflow-hidden glass-panel-premium border border-[#e5c158]/30 hover:border-[#e5c158] p-6 sm:p-8 md:p-9 shadow-2xl bg-gradient-to-b from-[#14151f] via-[#090a0f] to-[#060608] select-none"
    >
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#e5c158]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#e5c158]/30 transition-colors" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#ff2e63]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] mb-6 group-hover:rotate-12 transition-transform duration-300">
          <Flame className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
          Katalog Lengkap
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
          Temukan Semua Konser Lainnya.
        </h3>
        <p className="text-sm text-slate-400 mt-4 leading-relaxed">
          Tersedia {totalEvents || "banyak"} konser pilihan dari musisi pop, rock, jazz, hingga tur internasional dengan denah kursi interaktif 3D.
        </p>
      </div>

      {/* Bottom Button */}
      <div className="relative z-10 pt-6">
        <Link href="/events" className="block w-full">
          <Button
            variant="accent"
            size="lg"
            className="w-full justify-center shadow-xl shadow-[#e5c158]/20 group/btn"
          >
            <span>LIHAT SEMUA ({totalEvents})</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

/**
 * Main Horizontal Scroll Section
 */
export default function HorizontalConcerts({ events = [], genresList = [] }) {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(1);

  // Safe events list
  const safeEvents = Array.isArray(events) ? events : [];

  // Filter events based on genre & LIMIT strictly to TOP 5
  const filteredEvents = useMemo(() => {
    const list =
      selectedGenre === "all"
        ? safeEvents
        : safeEvents.filter((e) => e?.genre?.toLowerCase() === selectedGenre.toLowerCase());
    return list.slice(0, 5); // STRICTLY 5 ITEMS ONLY
  }, [safeEvents, selectedGenre]);

  // Framer Motion Scroll Progress for the pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Silky smooth spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Calculate actual pixel width to translate smoothly
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current && typeof window !== "undefined") {
        const scrollW = trackRef.current.scrollWidth;
        const windowW = window.innerWidth;
        const distance = Math.max(0, scrollW - windowW + 80);
        setTrackWidth(distance);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const timer = setTimeout(updateDimensions, 200);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(timer);
    };
  }, [filteredEvents]);

  // Safe function transform for x translation that never throws with dynamic distance
  const x = useTransform(smoothProgress, (val) => {
    const distance = trackWidth > 0 ? trackWidth : (filteredEvents.length * 360);
    return `-${val * distance}px`;
  });

  // Track active index
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (!filteredEvents || filteredEvents.length === 0) return;
      const step = 1 / Math.max(1, filteredEvents.length);
      const idx = Math.min(filteredEvents.length, Math.floor(latest / step) + 1);
      setCurrentIdx(idx || 1);
    });

    return () => unsubscribe();
  }, [smoothProgress, filteredEvents]);

  // Manual scroll helper buttons
  const handleScrollToCard = (direction) => {
    if (!containerRef.current || typeof window === "undefined") return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const totalScrollableHeight = rect.height - window.innerHeight;

    let targetRatio = direction === "next" ? (currentIdx / Math.max(1, filteredEvents.length)) : ((currentIdx - 2) / Math.max(1, filteredEvents.length));
    targetRatio = Math.max(0, Math.min(1, targetRatio));

    const targetY = containerTop + targetRatio * totalScrollableHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="featured-concerts"
      className="relative bg-[#060608] border-b border-white/10"
      style={{
        height: `${Math.max(200, (filteredEvents.length + 1) * 55)}vh`,
      }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-10">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#e5c158]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-[#ff2e63]/5 rounded-full blur-3xl" />
        </div>

        {/* 1. TOP HEADER & CONTROLS */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* Headline */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2.5">
                <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse" />
                <span className="text-[11px] font-bold text-[#e5c158] tracking-widest uppercase">
                  PENGALAMAN LIVE • TOP 5 PILIHAN
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Konser Pilihan Terbaru.
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1.5 max-w-lg">
                Scroll ke bawah untuk menelusuri 5 konser terfavorit musim ini secara horizontal.
              </p>
            </div>

            {/* Right Controls: Filters & Manual Nav */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Genre Filter Pills */}
              {Array.isArray(genresList) && genresList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                  {genresList.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGenre(g.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        selectedGenre.toLowerCase() === g.id.toLowerCase()
                          ? "bg-[#e5c158] text-black font-bold shadow-md shadow-[#e5c158]/20"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                      data-cursor="pointer"
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Prev / Next Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleScrollToCard("prev")}
                  aria-label="Konser Sebelumnya"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-30"
                  disabled={currentIdx <= 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollToCard("next")}
                  aria-label="Konser Berikutnya"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-30"
                  disabled={currentIdx >= filteredEvents.length}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. HORIZONTAL SCROLL REEL */}
        <div className="relative z-10 w-full overflow-hidden my-auto py-2">
          {filteredEvents.length > 0 ? (
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-6 md:gap-8 px-6 md:px-12 w-max"
            >
              {/* TOP 5 CONCERT CARDS */}
              {filteredEvents.map((event, idx) => (
                <HorizontalCard
                  key={event.id || idx}
                  event={event}
                  index={idx}
                />
              ))}

              {/* 6TH CARD: EXPLORE MORE PORTAL */}
              <ExploreMoreCard totalEvents={safeEvents.length} />
            </motion.div>
          ) : (
            <div className="max-w-md mx-auto p-12 glass-panel-premium rounded-3xl text-center">
              <Compass className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 text-sm font-medium">
                Belum ada jadwal konser untuk kategori ini.
              </p>
              <button
                onClick={() => setSelectedGenre("all")}
                className="mt-4 px-4 py-2 rounded-full bg-[#e5c158] text-black text-xs font-bold"
              >
                Tampilkan Semua Genre
              </button>
            </div>
          )}
        </div>

        {/* 3. BOTTOM HUD: PROGRESS & ACTION LINK */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between gap-6 pt-3 border-t border-white/10 text-xs text-slate-400">
            {/* Counter & Progress */}
            <div className="flex items-center gap-4">
              <div className="font-mono font-bold text-white flex items-center gap-1.5">
                <span className="text-[#e5c158]">0{currentIdx}</span>
                <span className="text-slate-600">/</span>
                <span>0{Math.max(1, filteredEvents.length)}</span>
              </div>

              {/* Progress Bar Line */}
              <div className="w-28 sm:w-44 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e5c158] to-[#ff2e63] rounded-full"
                  style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                />
              </div>

              <span className="hidden sm:inline text-slate-500 font-medium">
                Gulir ke bawah untuk geser
              </span>
            </div>

            {/* Link to Full Events Page */}
            <Link
              href="/events"
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#e5c158] font-semibold transition-colors group"
            >
              <span>Buka Halaman Semua Konser ({safeEvents.length})</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#e5c158]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
