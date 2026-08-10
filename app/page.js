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
    { id: "all", name: "All" },
    { id: "pop", name: "Pop" },
    { id: "rock", name: "Rock" },
    { id: "edm", name: "EDM" },
    { id: "hip-hop", name: "Hip-Hop" },
    { id: "jazz", name: "Jazz" },
  ];

  const steps = [
    {
      num: "01",
      title: "FIND YOUR SHOW",
      desc: "Discover concerts from your favorite artists and explore upcoming global tours.",
    },
    {
      num: "02",
      title: "CHOOSE YOUR TICKET",
      desc: "Select your preferred ticket category or pick your vantage point on our seat map.",
    },
    {
      num: "03",
      title: "ENJOY THE SHOW",
      desc: "Get your digital pass instant confirmation and experience an unforgettable night.",
    },
  ];

  const featuredArtists = [
    {
      name: "The Weeknd",
      genre: "R&B / Pop",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Billie Eilish",
      genre: "Alt Pop",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Bruno Mars",
      genre: "Funk / Pop",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Coldplay",
      genre: "Alt Rock",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Taylor Swift",
      genre: "Pop / Country",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const editorialTestimonials = [
    {
      quote: "EchoTic made getting tickets ridiculously simple.",
      author: "Alex",
      location: "Jakarta",
    },
    {
      quote: "The cleanest ticket booking experience I have ever used for a stadium tour.",
      author: "Sarah",
      location: "Bandung",
    },
    {
      quote: "Instant digital passes with zero hassle. Beautiful visual design.",
      author: "Michael",
      location: "Surabaya",
    },
  ];

  return (
    <main className="flex-grow bg-[#080808]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden hero-grid border-b border-white/5">
        {/* Background Visual Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=2000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#9d4edd]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Bold Editorial Headline */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#9d4edd] animate-pulse" />
              <span>LIVE MUSIC / 2026</span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-white">
              MUSIC <br />
              BECOMES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#9d4edd]">
                MEMORY.
              </span>
            </h1>

            <p className="text-zinc-400 text-base md:text-lg max-w-xl font-normal leading-relaxed">
              Discover unforgettable live experiences from the artists you love. Simple, elegant, and built for true music fans.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/events" data-cursor="pointer">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  EXPLORE EVENTS <ArrowRight className="ml-2.5 w-4 h-4" />
                </Button>
              </Link>
              <a href="#artists" data-cursor="pointer">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  DISCOVER ARTISTS
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Ticket Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md bg-[#121212]/80 border border-zinc-800/80 rounded-3xl p-4 backdrop-blur-md shadow-2xl relative group">
              <Hero3D />
              <div className="text-center text-xs font-medium text-zinc-500 tracking-wider uppercase mt-3">
                INTERACTIVE PASS • DRAG TO ROTATE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL BANNER */}
      <Marquee
        text="LIVE MUSIC • BETTER EXPERIENCED • ECHOTIC PRESALE • UNFORGETTABLE EXPERIENCES • STADIUM TOURS • TICKET DISCOVERY"
        speed={25}
      />

      {/* 3. URGENCY COUNTDOWN TIMER SECTION */}
      <section className="py-16 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Countdown
            targetDate="2026-09-15T20:00:00"
            title="NEXT SHOW PRESALE CLOSES IN"
          />
        </div>
      </section>

      {/* 4. FEATURED EVENTS & GENRE FILTERS */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold text-[#9d4edd] tracking-wider uppercase block mb-2">
                Live Experiences
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                FEATURED EVENTS.
              </h2>
              <p className="text-sm text-zinc-400 mt-2">
                The shows everyone's talking about.
              </p>
            </div>

            {/* Minimal Pill Filters */}
            <div className="flex flex-wrap gap-2">
              {genresList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGenre(g.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedGenre.toLowerCase() === g.id.toLowerCase()
                      ? "bg-[#9d4edd] text-white shadow-lg shadow-[#9d4edd]/20"
                      : "bg-[#151515] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                  }`}
                  data-cursor="pointer"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} event={event} />
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-16 text-center">
              <Compass className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm font-medium">
                No events currently scheduled in this genre. Check back soon!
              </p>
            </div>
          )}

          {/* View Catalog Link */}
          <div className="mt-14 text-center">
            <Link href="/events" data-cursor="pointer">
              <Button variant="secondary" size="md">
                VIEW ALL EVENTS ({events.length}) <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-28 bg-[#080808] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold text-[#9d4edd] tracking-widest uppercase block mb-2">
              Simple 3-Step Access
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
              YOUR NIGHT STARTS HERE.
            </h2>
            <p className="mt-4 text-zinc-400 text-base">
              Secure your concert experience in three simple steps.
            </p>
          </div>

          {/* Editorial Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300 shadow-card-subtle"
              >
                <div>
                  <span className="text-4xl md:text-5xl font-black text-zinc-700 group-hover:text-[#9d4edd] transition-colors block mb-6">
                    {step.num}
                  </span>
                  <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center gap-2 text-xs font-semibold text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-[#9d4edd]" />
                  <span>EchoTic Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DISCOVER THE ARTISTS (NEW SECTION) */}
      <section id="artists" className="py-28 bg-[#0a0a0a] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-semibold text-[#9d4edd] tracking-wider uppercase block mb-2">
                Performers & Acts
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                DISCOVER THE ARTISTS.
              </h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              Experience world-class performers live in concert across major international venues.
            </p>
          </div>

          {/* Artist Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredArtists.map((artist, idx) => (
              <Link
                key={idx}
                href="/events"
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800 group-hover:border-[#9d4edd] transition-all duration-300 relative">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#9d4edd] transition-colors">
                  {artist.name}
                </h4>
                <span className="text-xs text-zinc-500 font-medium">
                  {artist.genre}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-28 bg-[#080808] border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#9d4edd] tracking-widest uppercase block mb-2">
              Fan Experiences
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              WHAT PEOPLE SAY.
            </h2>
          </div>

          {/* Editorial Quote Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {editorialTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-8 flex flex-col justify-between shadow-card-subtle relative"
              >
                <span className="text-6xl font-serif text-[#9d4edd]/30 leading-none select-none block mb-4">
                  “
                </span>
                <p className="text-zinc-200 text-base font-medium leading-relaxed mb-6">
                  {item.quote}
                </p>
                <div className="pt-4 border-t border-zinc-800/60 font-semibold text-xs text-zinc-400">
                  — {item.author}, <span className="text-zinc-500">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
