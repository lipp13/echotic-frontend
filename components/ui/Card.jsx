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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col bg-[#121212] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden shadow-card-subtle transition-all duration-300"
    >
      {/* Image Container — Large Artwork Priority */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Subtle Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-medium text-zinc-200 tracking-wide">
            {formatDate(date).split(",")[1]?.trim() || date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative -mt-4 bg-gradient-to-b from-transparent via-[#121212] to-[#121212] rounded-t-2xl z-10">
        {/* Artist / Subtitle */}
        <span className="text-xs font-semibold text-[#9d4edd] uppercase tracking-wider mb-1">
          {displayArtist}
        </span>
        
        {/* Heading Link */}
        <Link href={`/events/${id}`} className="group-hover:text-white transition-colors">
          <h3 className="text-xl font-bold tracking-tight text-white line-clamp-1 mb-3">
            {title}
          </h3>
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-6 font-normal">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span className="truncate">{venueId.toUpperCase()}</span>
          </div>
          <span className="text-zinc-700">•</span>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>{date}</span>
          </div>
        </div>

        {/* Footer Row: Pricing & Arrow CTA */}
        <div className="mt-auto pt-4 border-t border-zinc-800/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-medium">
              From
            </span>
            <span className="text-base font-bold text-white">
              {formatPrice(lowestPrice)}
            </span>
          </div>

          <Link
            href={`/events/${id}`}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700/80 group-hover:border-[#9d4edd] group-hover:bg-[#9d4edd] text-zinc-300 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
