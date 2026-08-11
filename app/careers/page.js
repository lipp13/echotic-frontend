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
      avatar: "/team/alif.jpg",
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
        github: "https://github.com/lipp13",
        linkedin: "https://www.linkedin.com/in/alif-alfathar-183402407/",
        instagram: "https://instagram.com/alfthrr13",
      },
    },
    {
      id: "farras",
      name: "Farras Khairy",
      role: "Co-Founder & Backend Systems Architect",
      avatar: "/team/farras.jpg",
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
        github: "https://github.com/farraskhairy",
        linkedin: "https://linkedin.com/in/farraskhairy",
        instagram: "https://www.instagram.com/farraskhairy_/",
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

            {/* Official Brand Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Tautan Profesional</span>
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a
                  href={dev.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  title={`GitHub ${dev.name}`}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={dev.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title={`LinkedIn ${dev.name}`}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href={dev.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  title={`Instagram ${dev.name}`}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
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
