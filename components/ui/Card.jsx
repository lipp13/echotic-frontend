"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export default function Card({ event }) {
  const { id, title, subtitle, date, venueId, ticketCategories, image, artist_name } = event;

  // Get lowest price
  const lowestPrice = ticketCategories && ticketCategories.length > 0 
    ? Math.min(...ticketCategories.map((c) => c.price))
    : 0;

  const displayArtist = artist_name || subtitle || "Featured Act";
  const displayVenue = event.venue_name || event.venue || (venueId ? venueId.replace(/_/g, " ") : "Venue Konser");
  const formattedDate = formatDate(date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col glass-panel-premium glass-panel-hover rounded-2xl overflow-hidden card-ambient-shadow"
    >
      {/* Image Container — Artwork Priority */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Subtle Vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-[#0d0e14]/30 to-transparent" />

        {/* Floating Glass Date Badge */}
        <div className="absolute top-3.5 left-3.5 flex gap-2">
          <span className="bg-[#060608]/75 backdrop-blur-xl border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-slate-200 tracking-tight shadow-md">
            {formatDate(date).split(",")[1]?.trim() || date}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 md:p-6 flex flex-col flex-grow relative bg-[#0d0e14]/90 rounded-b-2xl">
        {/* Artist / Subtitle Badge */}
        <span className="text-xs font-bold text-[#e5c158] uppercase tracking-wider mb-1.5">
          {displayArtist}
        </span>
        
        {/* Heading Link */}
        <Link href={`/events/${id}`} className="group-hover:text-[#e5c158] transition-colors">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white line-clamp-1 mb-2.5">
            {title}
          </h3>
        </Link>

        {/* Meta Details */}
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 font-normal">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#e5c158]/80 flex-shrink-0" />
            <span className="truncate capitalize font-medium">{displayVenue.toLowerCase()}</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{formattedDate.split(",")[1]?.trim() || formattedDate}</span>
          </div>
        </div>

        {/* Footer Row: Pricing & Action Button */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
              Mulai Dari
            </span>
            <span className="text-base font-extrabold text-white">
              {formatPrice(lowestPrice)}
            </span>
          </div>

          <Link
            href={`/events/${id}`}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/15 group-hover:border-[#e5c158] group-hover:bg-[#e5c158] text-slate-200 group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm"
            aria-label={`View details for ${title}`}
          >
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

