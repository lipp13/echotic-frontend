"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Ticket,
  ShieldCheck,
  Zap,
  Smartphone,
  Cpu,
  Globe,
  Layers,
  Code2,
  Users,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Marquee from "@/components/ui/Marquee";
import About3D from "@/components/ui/About3D";

export default function AboutPage() {
  const stats = [
    { label: "Digital Passes", value: "100%", sub: "Encrypted & Secure" },
    { label: "Gate Validation", value: "< 1s", sub: "Instant QR Check-in" },
    { label: "Venue Visualizer", value: "3D", sub: "Interactive Seat Selection" },
    { label: "Ecosystem Sync", value: "Real-Time", sub: "Web & Mobile Native" },
  ];

  const pillars = [
    {
      icon: Ticket,
      title: "Interactive 3D Ticketing",
      description:
        "Say goodbye to flat list selection. EchoTic offers immersive 3D stage rendering and seat previews so fans know exactly what their concert view will be before committing.",
      tag: "INNOVATION",
    },
    {
      icon: ShieldCheck,
      title: "Encrypted Digital Passes",
      description:
        "Every ticket is linked to a dynamically generated QR payload and secure user hash. Scalping friction is eliminated while user security is guaranteed.",
      tag: "SECURITY",
    },
    {
      icon: Zap,
      title: "Instant Gate Control",
      description:
        "Designed with event management in mind. Gate administrators scan passes with immediate feedback, validating attendance in less than one second.",
      tag: "SPEED",
    },
    {
      icon: Smartphone,
      title: "Omnichannel Ecosystem",
      description:
        "Whether using our high-performance Next.js web application or our React Native mobile app, tickets and account states remain perfectly in sync.",
      tag: "ECOSYSTEM",
    },
  ];

  const techStack = [
    { name: "Next.js 16", category: "Web Framework", desc: "React 19 App Router & Server Components" },
    { name: "Three.js & R3F", category: "3D Graphics", desc: "Interactive WebGL stage & pass models" },
    { name: "Framer Motion", category: "Animations", desc: "Fluid UI micro-interactions & transitions" },
    { name: "TailwindCSS v4", category: "Design System", desc: "Modern utility styling & dark themes" },
    { name: "Express.js REST", category: "Backend API", desc: "High-throughput Node.js microservice" },
    { name: "React Native / Expo", category: "Mobile App", desc: "Cross-platform mobile wallet experience" },
  ];

  const team = [
    {
      name: "Alif Alfathar",
      role: "Lead Fullstack Architect",
      bio: "Crafting modern web architectures, Three.js 3D user experiences, and frontend systems.",
      avatarBg: "from-purple-600 to-indigo-600",
      initial: "A",
    },
    {
      name: "Farras Khairy",
      role: "Backend & Systems Engineer",
      bio: "Architecting high-throughput REST APIs, database schemas, and ticket verification logic.",
      avatarBg: "from-fuchsia-600 to-purple-800",
      initial: "F",
    },
  ];

  return (
    <main className="flex-grow bg-[#080808]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden hero-grid border-b border-white/5">
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#9d4edd]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#9d4edd]/30 bg-[#9d4edd]/10 text-xs font-semibold text-[#b565f7]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ECHOTIC PLATFORM</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.92] text-white"
            >
              REDEFINING <br />
              THE CONCERT PASS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-[#9d4edd]">
                EXPERIENCE.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-base md:text-lg max-w-xl font-normal leading-relaxed"
            >
              EchoTic is built to eliminate friction in live music ticketing. From interactive 3D seat previews to instant QR gate validation, we bridge the gap between fans, venues, and unforgettable live moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link href="/events" data-cursor="pointer">
                <Button variant="primary" size="lg">
                  EXPLORE EVENTS <ArrowRight className="ml-2.5 w-4 h-4" />
                </Button>
              </Link>
              <a href="#vision" data-cursor="pointer">
                <Button variant="secondary" size="lg">
                  OUR VISION
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column 3D Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-md bg-[#121212]/90 border border-zinc-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative group flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[11px] font-semibold text-zinc-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#9d4edd] animate-pulse" />
                INTERACTIVE 3D ENGINE
              </div>

              <About3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL BANNER */}
      <Marquee
        text="ZERO TICKET FRICTION • 3D SEAT PREVIEWS • INSTANT GATE CONTROL • ECHOTIC ECOSYSTEM • REVOLUTIONIZING LIVE MUSIC PASSES"
        speed={22}
      />

      {/* 3. METRICS BANNER */}
      <section className="py-16 bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#121212] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-card-subtle hover:border-[#9d4edd]/50 transition-all duration-300"
              >
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  {stat.label}
                </span>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-xs text-[#9d4edd] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {stat.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & STORY */}
      <section id="vision" className="py-28 bg-[#080808] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#9d4edd] tracking-widest uppercase block">
                OUR MISSION & STORY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                BUILT FOR FANS, <br />
                DESIGNED FOR VENUES.
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Traditional concert ticketing systems are often fragmented, clunky, and prone to counterfeiting. We created <strong className="text-white">EchoTic</strong> to provide a seamless end-to-end platform that unifies fan booking, seat selection, digital pass storage, and venue entry control into one cohesive aesthetic experience.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Whether you are booking a stadium tour on your desktop or presenting your pass at the gate using our mobile app, EchoTic delivers speed, reliability, and modern visual elegance.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-300">
                <div className="flex items-center gap-2 bg-[#121212] p-3 rounded-xl border border-zinc-800">
                  <Layers className="w-4 h-4 text-[#9d4edd]" />
                  <span>Modular Architecture</span>
                </div>
                <div className="flex items-center gap-2 bg-[#121212] p-3 rounded-xl border border-zinc-800">
                  <Globe className="w-4 h-4 text-[#9d4edd]" />
                  <span>Cross-Platform Ready</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#151518] to-[#0d0d10] border border-zinc-800 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#9d4edd]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#9d4edd]/20 flex items-center justify-center text-[#9d4edd] font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Engineering Principles</h4>
                    <p className="text-zinc-500 text-xs">High Quality • Zero Compromise</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-zinc-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#9d4edd] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Performance-First UX:</strong> Ultra-fast rendering with Next.js client-side optimizations and lightweight WebGL canvas setup.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#9d4edd] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Verified Security:</strong> Pass payload encryption preventing un-authorized duplication or spoofing during entry.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#9d4edd] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Real-Time Validation:</strong> Immediate administrative status feedback for gate ticket controllers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS GRID */}
      <section className="py-28 bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-[#9d4edd] tracking-widest uppercase block mb-2">
              PLATFORM HIGHLIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              WHAT SETS ECHOTIC APART.
            </h2>
            <p className="mt-4 text-zinc-400 text-sm md:text-base">
              Four core features engineered to create the ultimate concert pass workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between group hover:border-[#9d4edd]/60 transition-all duration-300 shadow-card-subtle relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-[#9d4edd] group-hover:scale-110 group-hover:border-[#9d4edd] transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-[#9d4edd]/10 border border-[#9d4edd]/20 text-[#b565f7]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold uppercase text-white tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <span>EchoTic Core Feature</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK OVERVIEW */}
      <section className="py-28 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-bold text-[#9d4edd] tracking-widest uppercase block mb-2">
                DEVELOPMENT STACK
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
                BUILT WITH MODERN TECH.
              </h2>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm max-w-md">
              Powered by industry-standard frameworks ensuring lightning-fast client loading, fluid 60FPS animations, and robust backend microservices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="bg-[#121212] border border-zinc-800/80 rounded-2xl p-6 hover:bg-[#151515] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold text-base">{tech.name}</span>
                  <Cpu className="w-4 h-4 text-[#9d4edd]" />
                </div>
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  {tech.category}
                </span>
                <p className="text-xs text-zinc-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE CREATORS */}
      <section className="py-28 bg-[#0a0a0a] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-bold text-[#9d4edd] tracking-widest uppercase block mb-2">
              ENGINEERING & DESIGN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              MEET THE CREATORS.
            </h2>
            <p className="mt-4 text-zinc-400 text-sm md:text-base">
              The engineering team behind the EchoTic platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-[#121212] border border-zinc-800/80 rounded-3xl p-8 flex flex-col items-center text-center shadow-card-subtle relative group hover:border-[#9d4edd]/50 transition-all"
              >
                {/* Glowing Avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${member.avatarBg} p-1 shadow-lg shadow-purple-900/30 mb-6 group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-[#0d0d0d] rounded-full flex items-center justify-center font-black text-2xl text-white">
                    {member.initial}
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">{member.name}</h3>
                <span className="text-xs font-semibold text-[#9d4edd] tracking-wide uppercase mt-1 mb-4">
                  {member.role}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mb-6">
                  {member.bio}
                </p>

                <div className="pt-4 border-t border-zinc-800/80 w-full flex justify-center gap-4 text-xs text-zinc-400 font-semibold">
                  <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                    <Users className="w-3.5 h-3.5" /> Contributor
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-gradient-to-r from-purple-950/40 via-[#121212] to-purple-950/40 border border-[#9d4edd]/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[#9d4edd]/5 pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs font-bold text-[#9d4edd] tracking-widest uppercase block">
                JOIN THE EXPERIENCE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                READY FOR YOUR NEXT CONCERT?
              </h2>
              <p className="text-zinc-400 text-sm md:text-base">
                Discover upcoming live shows, grab digital passes, and get ready for an unforgettable night.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/events" data-cursor="pointer">
                  <Button variant="primary" size="lg">
                    BROWSE ALL EVENTS <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/register" data-cursor="pointer">
                  <Button variant="secondary" size="lg">
                    CREATE ACCOUNT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
