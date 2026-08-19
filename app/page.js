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
import dynamic from "next/dynamic";
import { apiGetEvents, apiGetTestimonials } from "@/lib/api";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import Marquee from "@/components/ui/Marquee";
import HorizontalConcerts from "@/components/sections/HorizontalConcerts";

const Hero3D = dynamic(() => import("@/components/sections/Hero3D"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center bg-[#0d0e14]/70 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="w-10 h-10 border-2 border-[#e5c158] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
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
        {/* Ambient Floating Glow Orbs */}
        <div className="ambient-orb-1 -top-20 -left-20 opacity-70" />
        <div className="ambient-orb-2 top-1/3 -right-20 opacity-60" />

        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608]/70 via-transparent to-[#060608] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Refined Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-7 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-slate-300 hover:border-[#e5c158]/40 transition-colors shadow-lg shadow-black/40">
              <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse shadow-[0_0_8px_#e5c158]" />
              <span>TIKET KONSER RESMI 2026</span>
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 h-2.5 bg-[#e5c158] rounded-full animate-pulse" />
                <span className="w-0.5 h-3.5 bg-[#e5c158] rounded-full animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-[#e5c158] rounded-full animate-pulse delay-150" />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] text-white">
              Nikmati Musik <br />
              <span className="text-gradient-gold drop-shadow-[0_0_35px_rgba(229,193,88,0.25)]">
                Tanpa Batas.
              </span>
            </h1>

            <p className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Jelajahi dan amankan tiket resmi untuk konser musik besar, tur stadion, hingga pertunjukan privat. Praktis, aman, dan dirancang khusus untuk pencinta musik Indonesia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <Link href="/events" data-cursor="pointer">
                <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-xl shadow-[#e5c158]/20 group">
                  <span>JELAJAHI KONSER</span>
                  <ArrowRight className="ml-2.5 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about" data-cursor="pointer">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto hover:border-[#e5c158]/30">
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

      {/* 4. FEATURED EVENTS HORIZONTAL SHOWCASE (TOP 5) */}
      <HorizontalConcerts events={events} genresList={genresList} />

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
                whileHover={{ y: -6, scale: 1.01 }}
                className="group glass-panel-premium glass-panel-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Ambient Top Glow Line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e5c158]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  <span className="text-4xl md:text-5xl font-extrabold text-[#e5c158]/30 group-hover:text-[#e5c158] block mb-6 font-mono transition-colors duration-300 drop-shadow-[0_0_20px_rgba(229,193,88,0.15)]">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-[#e5c158] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#e5c158] group-hover:shadow-[0_0_8px_#e5c158] transition-shadow" />
                  <span>Tiket Resmi EchoTic</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-28 bg-[#08090d] border-b border-white/10 relative overflow-hidden">
        {/* Floating Subtle Ambient Orb */}
        <div className="ambient-orb-2 -bottom-20 -left-20 opacity-50" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
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
                whileHover={{ y: -6, scale: 1.01 }}
                className="group glass-panel-premium glass-panel-hover rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Quote symbol */}
                <span className="text-5xl font-serif text-[#e5c158]/30 group-hover:text-[#e5c158]/80 leading-none select-none block mb-4 transition-colors duration-300">
                  “
                </span>
                <p className="text-slate-200 text-base font-medium leading-relaxed mb-6">
                  {item.quote}
                </p>
                <div className="pt-4 border-t border-white/10 font-semibold text-xs text-slate-300 flex items-center justify-between">
                  <span>— {item.author}, <span className="text-slate-500">{item.location}</span></span>
                  <div className="flex text-[#e5c158] gap-0.5 text-xs">
                    {"★★★★★"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



