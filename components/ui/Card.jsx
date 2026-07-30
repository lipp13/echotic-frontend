"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

export default function Card({ event }) {
  const { id, title, subtitle, date, venueId, ticketCategories, image } = event;

  // Get lowest price
  const lowestPrice = Math.min(...ticketCategories.map((c) => c.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-zinc-950/80 border border-zinc-800 hover:border-[#ccff00]/40 transition-colors duration-300 overflow-hidden"
    >
      {/* Glitch Line on top of card */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#ccff00] group-hover:w-full transition-all duration-500 ease-out z-10" />

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <motion.img
          src={image}
          alt={title}
          className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        {/* Date Stamp */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-zinc-800 px-3 py-1 text-[10px] font-mono text-[#ccff00] tracking-widest uppercase">
          {formatDate(date).split(",")[1]?.trim() || date}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase mb-1">
          {subtitle}
        </span>
        
        {/* Heading Link */}
        <Link href={`/events/${id}`} className="group-hover:text-[#ccff00] transition-colors">
          <h3 className="text-xl font-black tracking-tight leading-tight uppercase mb-4 flex items-start justify-between gap-2">
            <span className="line-clamp-2">{title}</span>
            <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#ccff00] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
          </h3>
        </Link>

        {/* Details list */}
        <div className="mt-auto space-y-2 border-t border-zinc-900 pt-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#ff0055]" />
            <span className="truncate">{venueId.toUpperCase()}</span>
          </div>
        </div>

        {/* Price tag */}
        <div className="mt-4 flex items-center justify-between bg-black/40 border border-zinc-900 p-3">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
            Starting from
          </span>
          <span className="font-mono font-bold text-[#ccff00]">
            {formatPrice(lowestPrice)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
