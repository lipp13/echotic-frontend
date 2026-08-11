"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Music,
  Ticket,
  Star,
  ShieldCheck,
  ChevronRight,
  Compass,
} from "lucide-react";
import { apiGetEvents, apiGetTestimonials } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import Marquee from "@/components/ui/Marquee";
import Hero3D from "@/components/sections/Hero3D";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [events, setEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsResult, testimonialsResult] = await Promise.all([
          apiGetEvents(),
          apiGetTestimonials(),
        ]);

        if (eventsResult.success) setEvents(eventsResult.data);
        if (testimonialsResult.success) setTestimonials(testimonialsResult.data);
      } catch (error) {
        console.error("Failed to fetch landing data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter events based on genre
  const filteredEvents =
    selectedGenre === "all"
      ? events
      : events.filter((e) => e.genre?.toLowerCase() === selectedGenre.toLowerCase());

  const genresList = [
    { id: "all", name: "Semua Genre" },
    { id: "pop", name: "Pop" },
    { id: "rock", name: "Rock" },
    { id: "edm", name: "EDM" },
    { id: "hip-hop", name: "Hip-Hop" },
    { id: "jazz", name: "Jazz" },
  ];

  const steps = [
    {
      num: "01",
      title: "Temukan Konser",
      desc: "Jelajahi konser musisi favorit Anda dari berbagai genre dan kota di seluruh Indonesia.",
    },
    {
      num: "02",
      title: "Pilih Tiket & Kursi",
      desc: "Tentukan kategori tiket atau pilih sudut pandang tempat duduk terbaik pada denah 3D.",
    },
    {
      num: "03",
      title: "Tiket Digital Instant",
      desc: "Dapatkan tiket QR resmi berenkripsi yang siap di-scan di gate venue langsung dari akun Anda.",
    },
  ];

  const editorialTestimonials = [
    {
      quote: "Beli tiket konser stadion via EchoTic beneran simpel dan tampilannya mewah banget.",
      author: "Alex R.",
      location: "Jakarta",
    },
    {
      quote: "Pengalaman pesan tiket paling rapi. Vibe-nya kaya Apple Music tapi khusus buat event konser.",
      author: "Sarah M.",
      location: "Bandung",
    },
    {
      quote: "Tiket digital langsung masuk tanpa ribet. Visual 3D tempat duduknya akurat banget!",
      author: "Michael T.",
      location: "Surabaya",
    },
  ];

  return (
    <main className="flex-grow bg-[#060608] text-[#f8fafc]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden hero-ambient-glow border-b border-white/10">
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/70 via-transparent to-[#060608]" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Refined Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse" />
              <span>TIKET KONSER RESMI 2026</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] text-white">
              Nikmati Musik <br />
              <span className="text-gradient-gold">
                Tanpa Batas.
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Jelajahi dan amankan tiket resmi untuk konser musik besar, tur stadion, hingga pertunjukan privat. Praktis, aman, dan dirancang khusus untuk pencinta musik Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <Link href="/events" data-cursor="pointer">
                <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-lg shadow-[#e5c158]/10">
                  JELAJAHI KONSER <ArrowRight className="ml-2.5 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about" data-cursor="pointer">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  TENTANG ECHOTIC
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: 3D VIP Ticket Pass Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="w-full max-w-md glass-panel-premium rounded-3xl p-4 shadow-2xl relative group">
              <Hero3D />
              <div className="text-center text-xs font-semibold text-slate-400 tracking-wider uppercase mt-3">
                TIKET INTERAKTIF 3D • GESER UNTUK ROTASI
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL BANNER */}
      <Marquee
        text="KONSER MUSIK INDONESIA • TIKET DIGITAL RESMI • HARGA TRANSPARAN • SCAN QR GATE CEPAT • PENGALAMAN TAK TERLUPAKAN"
        speed={25}
      />

      {/* 3. PRESALE TIMER SECTION */}
      <section className="py-14 bg-[#060608] border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 md:px-10"
        >
          <Countdown
            targetDate="2026-09-15T20:00:00"
            title="PRESALE KONSER BERIKUTNYA DITUTUP DALAM"
          />
        </motion.div>
      </section>

      {/* 4. FEATURED EVENTS & GENRE FILTERS */}
      <section className="py-24 bg-[#08090d] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
                Pengalaman Live
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Konser Pilihan Terbaru.
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Penampilan terbaik dari musisi papan atas tanah air dan mancanegara.
              </p>
            </div>

            {/* Minimal Pill Filters */}
            <div className="flex flex-wrap gap-2">
              {genresList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGenre(g.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedGenre.toLowerCase() === g.id.toLowerCase()
                      ? "bg-[#e5c158] text-black font-bold shadow-md shadow-[#e5c158]/20"
                      : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                  data-cursor="pointer"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card event={event} />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="glass-panel-premium rounded-3xl p-16 text-center">
              <Compass className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-300 text-sm font-medium">
                Belum ada jadwal konser untuk genre ini. Cek kembali nanti!
              </p>
            </div>
          )}

          {/* View Catalog Link */}
          <div className="mt-14 text-center">
            <Link href="/events" data-cursor="pointer">
              <Button variant="secondary" size="md">
                LIHAT SEMUA KONSER ({events.length}) <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-28 bg-[#060608] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
              Akses Mudah
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Langkah Mudah Menuju Konser.
            </h2>
            <p className="mt-3 text-slate-400 text-base">
              Dapatkan tiket digital konser Anda hanya dalam 3 langkah praktis.
            </p>
          </motion.div>

          {/* Editorial Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel-premium glass-panel-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl md:text-5xl font-extrabold text-[#e5c158]/40 block mb-6 font-mono">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#e5c158]" />
                  <span>Tiket Resmi EchoTic</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-28 bg-[#08090d] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
              Ulasan Penonton
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Apa Kata Para Penikmat Musik.
            </h2>
          </motion.div>

          {/* Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorialTestimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel-premium glass-panel-hover rounded-3xl p-8 flex flex-col justify-between relative"
              >
                <span className="text-5xl font-serif text-[#e5c158]/40 leading-none select-none block mb-4">
                  “
                </span>
                <p className="text-slate-200 text-base font-medium leading-relaxed mb-6">
                  {item.quote}
                </p>
                <div className="pt-4 border-t border-white/10 font-semibold text-xs text-slate-300">
                  — {item.author}, <span className="text-slate-500">{item.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



