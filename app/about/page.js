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
import FAQAccordion from "@/components/sections/FAQAccordion";

export default function AboutPage() {
  const stats = [
    { label: "Tiket Digital", value: "100%", sub: "Terenkripsi & Aman" },
    { label: "Validasi Gate", value: "< 1s", sub: "Scan QR Instan" },
    { label: "Visualisasi Venue", value: "3D", sub: "Pemilihan Kursi Interaktif" },
    { label: "Sinkronisasi", value: "Real-Time", sub: "Web & Mobile Native" },
  ];

  const pillars = [
    {
      icon: Ticket,
      title: "Pemesanan Tiket 3D Interaktif",
      description:
        "Bukan sekadar daftar pilihan datar. EchoTic menawarkan tampilan denah panggung 3D interaktif agar Anda dapat melihat sudut pandang tempat duduk sebelum membeli.",
      tag: "INOVASI",
    },
    {
      icon: ShieldCheck,
      title: "Tiket Digital Berenkripsi",
      description:
        "Setiap tiket terhubung dengan kode QR dinamis dan hash keamanan pengguna. Mencegah pemalsuan dan calo tiket secara total.",
      tag: "KEAMANAN",
    },
    {
      icon: Zap,
      title: "Kontrol Gate Instan",
      description:
        "Dirancang khusus untuk pengelola acara. Petugas gate memindai tiket dengan respon langsung, memvalidasi kehadiran dalam waktu kurang dari satu detik.",
      tag: "KECEPATAN",
    },
    {
      icon: Smartphone,
      title: "Ekosistem Multi-Platform",
      description:
        "Baik menggunakan aplikasi web Next.js maupun aplikasi mobile React Native kami, tiket dan status akun Anda selalu tersinkronisasi sempurna.",
      tag: "EKOSISTEM",
    },
  ];

  const techStack = [
    { name: "Next.js 16", category: "Framework Web", desc: "React 19 App Router & Server Components" },
    { name: "Three.js & R3F", category: "Grafik 3D", desc: "Model panggung & tiket 3D WebGL interaktif" },
    { name: "Framer Motion", category: "Animasi", desc: "Mikro-interaksi & transisi antarmuka yang mulus" },
    { name: "TailwindCSS v4", category: "Sistem Desain", desc: "Styling modern dengan tema gelap premium" },
    { name: "Express.js REST", category: "API Backend", desc: "Layanan microservice Node.js berkecepatan tinggi" },
    { name: "React Native / Expo", category: "Aplikasi Mobile", desc: "Pengalaman tiket digital di aplikasi mobile" },
  ];

  const team = [
    {
      name: "Alif Alfathar",
      role: "Lead Fullstack Architect",
      bio: "Merancang arsitektur web modern, visualisasi 3D Three.js, dan sistem antarmuka utama.",
      avatarBg: "from-[#f5d77f] to-[#e5c158]",
      initial: "A",
      image: "/team/alif.jpg",
      github: "https://github.com/lipp13",
      skills: ["Next.js 16", "Three.js", "React 19", "Tailwind v4"],
    },
    {
      name: "Farras Khairy",
      role: "Backend & Systems Engineer",
      bio: "Merancang API REST performa tinggi, skema basis data, dan logika verifikasi tiket.",
      avatarBg: "from-[#e5c158] to-[#d4af37]",
      initial: "F",
      image: "/team/farras.jpg",
      github: "https://github.com/FarrasKhairy",
      skills: ["Express.js", "Node.js", "MySQL", "JWT Auth"],
    },
  ];

  return (
    <main className="flex-grow bg-[#060608]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden hero-ambient-glow border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e5c158]/30 bg-[#e5c158]/10 text-xs font-semibold text-[#e5c158]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
              <span>PLATFORM ECHOTIC</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.92] text-white"
            >
              Mendefinisikan Ulang <br />
              Pengalaman <br />
              <span className="text-gradient-gold">
                Tiket Konser.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-base md:text-lg max-w-xl font-normal leading-relaxed"
            >
              EchoTic hadir untuk menghilangkan kendala dalam pemesanan tiket konser musik. Dari pratinjau kursi 3D interaktif hingga validasi QR gate instan, kami menghubungkan Anda dengan momen musik favorit secara praktis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link href="/events" data-cursor="pointer">
                <Button variant="accent" size="lg">
                  JELAJAHI KONSER <ArrowRight className="ml-2.5 w-4 h-4" />
                </Button>
              </Link>
              <a href="#vision" data-cursor="pointer">
                <Button variant="glass" size="lg">
                  VISI KAMI
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
              className="w-full max-w-md glass-panel-premium rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative group flex flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-slate-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#e5c158] animate-pulse" />
                MESIN GRAPHIC 3D INTERAKTIF
              </div>

              <About3D />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE SCROLL BANNER */}
      <Marquee
        text="PEMESANAN TIKET TANPA RIBET • PREVIEW KURSI 3D • SCAN GATE CEPAT • EKOSISTEM ECHOTIC • PLATFORM TIKET KONSER MODERN"
        speed={22}
      />

      {/* 3. METRICS BANNER */}
      <section className="py-16 bg-[#08090d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel-premium glass-panel-hover rounded-2xl p-6 flex flex-col justify-between shadow-2xl transition-all duration-300"
              >
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  {stat.label}
                </span>
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-xs text-[#e5c158] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {stat.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION & STORY */}
      <section id="vision" className="py-24 bg-[#060608] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block">
                MISI & CERITA KAMI
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Diciptakan Untuk Penonton, <br />
                Dirancang Untuk Venue.
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Sistem pemesanan tiket konser tradisional seringkali terasa rumit, lambat, dan rentan pemalsuan. Kami membangun <strong className="text-white">EchoTic</strong> untuk memberikan satu platform terpadu yang menyatukan pemesanan tiket, pemilihan kursi 3D, penyimpanan tiket digital, hingga kontrol akses gate.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Baik Anda memesan tiket tur stadion dari laptop maupun menunjukkan tiket di gate menggunakan smartphone, EchoTic memberikan kecepatan, keandalan, dan tampilan estetis yang elegan.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                  <Layers className="w-4 h-4 text-[#e5c158]" />
                  <span>Arsitektur Modular</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                  <Globe className="w-4 h-4 text-[#e5c158]" />
                  <span>Siap Multi-Platform</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="glass-panel-premium rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#e5c158]/20 flex items-center justify-center text-[#e5c158] font-bold">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Prinsip Rekayasa</h4>
                    <p className="text-slate-400 text-xs">Kualitas Tinggi • Tanpa Kompromi</p>
                  </div>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e5c158] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Pengalaman Pengguna Cepat:</strong> Performa tinggi dengan optimasi Next.js dan kanvas 3D WebGL yang ringan.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e5c158] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Keamanan Terverifikasi:</strong> Enkripsi tiket digital yang mencegah penggandaan dan pemalsuan saat masuk venue.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#e5c158] mt-1.5 flex-shrink-0" />
                    <span><strong className="text-white">Validasi Real-Time:</strong> Respon konfirmasi langsung bagi petugas gate scan tiket.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS GRID */}
      <section className="py-24 bg-[#08090d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
              KEUNGGULAN UTAMA
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Keunggulan Platform EchoTic.
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base">
              Empat fitur utama yang dirancang untuk menciptakan pengalaman konser terbaik.
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
                  className="glass-panel-premium glass-panel-hover rounded-3xl p-8 md:p-10 flex flex-col justify-between group shadow-2xl relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e5c158] group-hover:scale-110 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-[#e5c158]/10 border border-[#e5c158]/20 text-[#e5c158]">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>Fitur Utama EchoTic</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TECH STACK OVERVIEW */}
      <section className="py-24 bg-[#060608] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
                TEKNOLOGI YANG DIGUNAKAN
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Teknologi Modern & Handal.
              </h2>
            </div>
            <p className="text-slate-400 text-xs md:text-sm max-w-md">
              Ditenagai teknologi modern untuk memastikan waktu muat cepat, animasi 60FPS yang mulus, dan layanan API backend yang andal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="glass-panel-premium rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold text-base">{tech.name}</span>
                  <Cpu className="w-4 h-4 text-[#e5c158]" />
                </div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  {tech.category}
                </span>
                <p className="text-xs text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. MEET THE CREATORS */}
      <section className="py-24 bg-[#08090d] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
              TIM PENGEMBANG
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Pengembang Dibalik EchoTic.
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base">
              Tim rekayasa perangkat lunak di balik platform EchoTic.
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
                className="glass-panel-premium glass-panel-hover rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative group"
              >
                {/* Avatar Photo */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${member.avatarBg} p-1 shadow-xl mb-6 group-hover:scale-105 transition-transform overflow-hidden`}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#060608] rounded-full flex items-center justify-center font-black text-2xl text-white">
                      {member.initial}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">{member.name}</h3>
                <span className="text-xs font-semibold text-[#e5c158] tracking-wide uppercase mt-1 mb-3">
                  {member.role}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-5">
                  {member.bio}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {member.skills?.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 w-full flex justify-center items-center gap-4 text-xs text-slate-400 font-semibold">
                  <a
                    href="/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#e5c158]" />
                    <span>Karir Kami.</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION SECTION */}
      <FAQAccordion />

      {/* 9. CALL TO ACTION BANNER */}
      <section className="py-24 bg-[#060608] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="glass-panel-premium rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl border border-white/15">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block">
                BERGABUNG SEKARANG
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Siap Untuk Konser Berikutnya?
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Jelajahi jadwal konser mendatang, dapatkan tiket digital Anda, dan bersiaplah untuk malam yang tak terlupakan.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/events" data-cursor="pointer">
                  <Button variant="accent" size="lg">
                    LIHAT SEMUA KONSER <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/register" data-cursor="pointer">
                  <Button variant="glass" size="lg">
                    BUAT AKUN BARU
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


