"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Music,
  Zap,
  Shield,
  HelpCircle,
  Loader2,
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

  // Get trending/featured events
  const featuredEvents = events.filter((e) => e.featured);

  // Filter events based on genre
  const filteredEvents =
    selectedGenre === "all"
      ? events
      : events.filter((e) => e.genre === selectedGenre);

  const steps = [
    {
      num: "01",
      title: "SELECT SHOW",
      desc: "Explore trending acts, underground sets, or legendary global rock tours.",
      icon: <Music className="w-5 h-5 text-[#ccff00]" />,
    },
    {
      num: "02",
      title: "CHOOSE SEATING",
      desc: "Use our interactive visual seat map grid to pick your exact vantage point.",
      icon: <Zap className="w-5 h-5 text-[#00f0ff]" />,
    },
    {
      num: "03",
      title: "SECURE PASS",
      desc: "Instant encrypted transactions with virtual mock confirmations & QR codes.",
      icon: <Shield className="w-5 h-5 text-[#ff0055]" />,
    },
  ];

  return (
    <main className="flex-grow">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 md:py-24 border-b border-zinc-900 overflow-hidden hero-grid">
        {/* Glow backdrop circles */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#ccff00]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-[#ff0055]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Asymmetric Big Headline */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MASA DEPAN TIKET KONSER DIMULAI DI SINI</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              MUSIK <br />
              MENJADI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#00f0ff] to-[#ff0055]">
                KENYATAAN.
              </span>
            </h1>

            <p className="text-zinc-400 font-mono text-sm max-w-lg leading-relaxed">
              Lupakan pengalaman membeli tiket yang membosankan. EchoTic
              menghadirkan suasana konser langsung melalui tiket interaktif 3D,
              denah kursi visual, dan desain yang modern serta imersif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/events" data-cursor="pointer">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  JELAJAHI EVENTS <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register" data-cursor="pointer">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Buat Akun
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Interactive Canvas */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md border border-zinc-800 bg-zinc-950/40 p-4 backdrop-blur-sm relative shadow-2xl">
              {/* Corner industrial notches */}
              <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]" />
              <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-[#ff0055]" />

              <Hero3D />

              <div className="text-center font-mono text-[9.5px] text-zinc-500 uppercase tracking-widest mt-4">
                RENDER 3D • GESER UNTUK MEMUTAR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL BANNER */}
      <Marquee
        text="MUSIK TANPA BATAS • PESAN TIKETMU SEKARANG • JANGAN SAMPAI KEHABISAN • ECHOTIC"
        speed={30}
      />

      {/* 3. URGENCY COUNTDOWN TIMER SECTION */}
      <section className="bg-black py-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <Countdown
            targetDate="2026-08-24T20:00:00"
            title="NEON FUTURE MASSIVE TICKETS CLOSE IN:"
          />
        </div>
      </section>

      {/* 4. GENRE FILTER & HOT SHOWS LISTINGS */}
      <section className="py-20 bg-[#07070a] border-b border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="text-left">
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-1">
                Hot Curated Events
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                LIVE EXPERIENCE DIRECTORY.
              </h2>
            </div>

            {/* Asymmetric Filters */}
            <div className="flex flex-wrap gap-2">
              {["all", "edm", "rock", "pop"].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border cursor-pointer transition-all ${
                    selectedGenre === g
                      ? "bg-white text-black border-white font-bold"
                      : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500"
                  }`}
                  data-cursor="pointer"
                >
                  {g === "all" ? "All Genre" : g.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Events Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} event={event} />
            ))}
          </div>

          {/* No Events State */}
          {filteredEvents.length === 0 && (
            <div className="border border-zinc-900 bg-zinc-950 p-12 text-center">
              <p className="font-mono text-zinc-500 text-sm">
                No events currently scheduled in this genre. Check back later!
              </p>
            </div>
          )}

          {/* Catalog Link */}
          <div className="mt-12 text-center">
            <Link href="/events" data-cursor="pointer">
              <Button variant="secondary" size="md">
                VIEW ALL EVENTS ({events.length}){" "}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS - CONCERT PROTOCOL STYLE */}
      <section className="py-28 bg-black border-b border-zinc-900 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#ccff00]/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[11px] font-mono text-[#ccff00] tracking-[0.4em] uppercase">
              Ticket Access System
            </span>

            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              HOW IT
              <span className="text-[#ccff00]"> WORKS.</span>
            </h2>

            <p className="mt-5 text-zinc-500 font-mono text-sm">
              Secure your concert experience in three simple protocols.
            </p>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Line Connector */}
            <div className="hidden md:block absolute top-[90px] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#ccff00]/50 to-transparent" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Number */}
                <div
                  className="
            absolute -top-10 left-1/2 -translate-x-1/2
            text-[120px]
            font-black
            text-zinc-900
            group-hover:text-[#ccff00]/10
            transition duration-500
          "
                >
                  {step.num}
                </div>

                {/* Card */}
                <div
                  className="
              relative
              h-full
              min-h-[380px]
              bg-zinc-950
              border border-zinc-800
              p-8
              flex
              flex-col
              justify-between
              overflow-hidden
              transition-all
              duration-500
              group-hover:border-[#ccff00]/50
              group-hover:-translate-y-3
            "
                >
                  {/* Glow */}
                  <div
                    className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#ccff00]/10
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition
              duration-500
              "
                  />

                  {/* Top */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <span
                        className="
                  text-[10px]
                  font-mono
                  text-[#ccff00]
                  tracking-widest
                  uppercase
                "
                      >
                        Protocol {step.num}
                      </span>

                      <h3
                        className="
                  mt-4
                  text-2xl
                  font-black
                  uppercase
                  text-white
                  tracking-tight
                "
                      >
                        {step.title}
                      </h3>
                    </div>

                    <div
                      className="
                w-14
                h-14
                flex
                items-center
                justify-center
                bg-black
                border
                border-zinc-700
                text-[#ccff00]
                group-hover:border-[#ccff00]
                transition
                "
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10">
                    <div
                      className="
                w-full
                h-px
                bg-zinc-800
                mb-6
              "
                    />

                    <p
                      className="
                text-sm
                font-mono
                text-zinc-400
                leading-relaxed
              "
                    >
                      {step.desc}
                    </p>

                    <div
                      className="
                mt-8
                flex
                items-center
                gap-2
                text-[10px]
                font-mono
                text-zinc-600
                uppercase
              "
                    >
                      <span
                        className="
                  w-2
                  h-2
                  bg-[#ccff00]
                  rounded-full
                  animate-pulse
                "
                      />
                      System Ready
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS - FAN ARCHIVE STYLE */}
      <section className="py-28 bg-[#07070a] relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ff0055]/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00f0ff]/10 blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="mb-20">
            <span className="text-[10px] font-mono text-[#ff0055] tracking-[0.4em] uppercase">
              Fan Database // Feedback Loop
            </span>
            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              WHAT THE
              <span className="text-[#ff0055]"> COLLECTIVE</span>
              <br />
              SAYS.
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="
            group
            relative
            bg-zinc-950
            border
            border-zinc-800
            p-8
            overflow-hidden
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-[#ff0055]/60
          "
              >
                {/* Top Accent */}
                <div
                  className="
            absolute
            top-0
            left-0
            w-full
            h-[2px]
            bg-gradient-to-r
            from-transparent
            via-[#ff0055]
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition
          "
                />

                {/* Quote Icon */}
                <div
                  className="
            absolute
            top-6
            right-7
            text-6xl
            font-black
            text-zinc-900
            group-hover:text-[#ff0055]/20
            transition
          "
                >
                  "
                </div>

                {/* Status */}
                <div
                  className="
            flex
            items-center
            gap-2
            mb-8
          "
                >
                  <span
                    className="
              w-2
              h-2
              bg-[#00ff99]
              rounded-full
              animate-pulse
            "
                  />

                  <span
                    className="
              text-[9px]
              font-mono
              tracking-widest
              uppercase
              text-zinc-500
            "
                  >
                    Verified Attendee
                  </span>
                </div>

                {/* Review */}
                <p
                  className="
            relative
            z-10
            font-mono
            text-sm
            text-zinc-300
            leading-relaxed
            mb-10
          "
                >
                  "{t.comment}"
                </p>

                {/* Rating */}
                <div
                  className="
            flex
            gap-1
            mb-8
          "
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="
                  text-[#ffcc00]
                  text-sm
                "
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* User */}
                <div
                  className="
            flex
            items-center
            gap-4
            pt-6
            border-t
            border-zinc-800
          "
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="
                w-12
                h-12
                rounded-full
                object-cover
                grayscale
                border
                border-zinc-700
                group-hover:grayscale-0
                transition
              "
                  />

                  <div>
                    <h5
                      className="
                font-mono
                text-sm
                font-bold
                uppercase
                text-white
              "
                    >
                      {t.name}
                    </h5>

                    <span
                      className="
                font-mono
                text-[10px]
                text-zinc-500
                uppercase
                tracking-widest
              "
                    >
                      {t.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
