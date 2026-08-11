"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowLeft,
  Mail,
  Award,
  Calendar,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Globe,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function CareersPage() {
  const developers = [
    {
      id: "alif",
      name: "Alif Alfathar",
      role: "Lead Fullstack & UI/UX Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
      bio: "Fokus pada arsitektur web modern Next.js, pembuatan visualizer 3D panggung, sistem desain liquid glass bertema musik, serta animasi mikro antarmuka pengguna.",
      badge: "Frontend & UI Visionary",
      tech: ["Next.js 16", "React 19", "Three.js / R3F", "Framer Motion", "TailwindCSS", "JavaScript ES6+"],
      timeline: [
        {
          year: "2026 - Sekarang",
          title: "Lead Developer & UI Architect - EchoTic Platform",
          desc: "Merancang ulang sistem desain EchoTic menjadi gaya Apple Music liquid glass, mengimplementasikan tiket 3D interaktif, serta animasi transisi di seluruh rute.",
        },
        {
          year: "2024 - 2025",
          title: "Fullstack Web Developer",
          desc: "Mengembangkan aplikasi web dinamis berkinerja tinggi, sistem otentikasi JWT, dan integrasi API pembayaran modern.",
        },
      ],
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:alif@echotic.id",
      },
    },
    {
      id: "farras",
      name: "Farras Khairy",
      role: "Co-Founder & Backend Systems Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      bio: "Spesialis dalam arsitektur server Express.js berkecepatan tinggi, logika enkripsi kode QR tiket gate venue, manajemen database, dan otentikasi akun aman.",
      badge: "Backend & Systems Specialist",
      tech: ["Node.js", "Express.js", "PostgreSQL / MongoDB", "REST APIs", "QR Security", "System Architecture"],
      timeline: [
        {
          year: "2026 - Sekarang",
          title: "Co-Founder & Lead Backend Architect - EchoTic Platform",
          desc: "Merancang API REST otentikasi, enkripsi token QR gate venue, serta alur manajemen transaksi dan verifikasi tiket otomatis.",
        },
        {
          year: "2024 - 2025",
          title: "Backend & Database Engineer",
          desc: "Fokus pada pembuatan infrastruktur API scalable, pemrosesan transaksi real-time, dan pengamanan sistem data pengguna.",
        },
      ],
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:farras@echotic.id",
      },
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow text-white relative overflow-hidden"
    >
      {/* Ambient Background Lights */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#e5c158]/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#ff2e63]/5 blur-[130px] pointer-events-none" />

      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase group"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Header Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-left space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e5c158]/30 bg-[#e5c158]/10 text-xs font-semibold text-[#e5c158]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TIM PENGEMBANG & PROFIL KARIR</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Jejak Karir & Karya <br />
          <span className="text-gradient-gold">Para Pengembang EchoTic.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Profil karir, keahlian teknis, dan perjalanan profesional Alif Alfathar & Farras Khairy dalam merancang platform tiket musik modern bertema Apple Music.
        </p>
      </motion.div>

      {/* Developers Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
        {developers.map((dev, idx) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="glass-panel-premium rounded-3xl p-8 md:p-10 shadow-2xl border border-white/15 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-md">
                  <img
                    src={dev.avatar}
                    alt={dev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#e5c158] uppercase tracking-widest block mb-0.5">
                    {dev.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {dev.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal mb-6">
              {dev.bio}
            </p>

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Keahlian & Spesialisasi
              </span>
              <div className="flex flex-wrap gap-2">
                {dev.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Riwayat Karir & Proyek
              </span>
              <div className="space-y-4">
                {dev.timeline.map((item, tIdx) => (
                  <div key={tIdx} className="flex gap-3 items-start text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#e5c158] mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-[#e5c158] font-bold block">
                        {item.year}
                      </span>
                      <h4 className="font-bold text-white text-xs mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Tautan Profesional</span>
              <div className="flex items-center gap-3">
                <a
                  href={dev.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub Portfolio"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                </a>
                <a
                  href={dev.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn Profile"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href={dev.socials.email}
                  title="Email Direct"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform Vision Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel-premium rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-2xl relative border border-white/15"
      >
        <Code2 className="w-10 h-10 text-[#e5c158] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">
          Komitmen Kualitas & Inovasi
        </h3>
        <p className="text-xs md:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          EchoTic dirancang dari nol dengan standar antarmuka premium ala Apple Music untuk memberikan pengalaman memesan tiket konser yang elegan, cepat, dan terpercaya bagi pengguna di Indonesia.
        </p>
        <Link href="/events" data-cursor="pointer">
          <Button variant="accent" size="md">
            JELAJAHI TIKET KONSER <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </motion.main>
  );
}
