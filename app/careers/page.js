"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Users, Zap, Heart, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, MapPin, Building2, Send, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Modal from "@/components/ui/Modal";

export default function CareersPage() {
  const { addToast } = useToast();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const perks = [
    {
      icon: Zap,
      title: "Akses Konser Gratis",
      desc: "Nikmati akses VIP pass untuk setiap konser dan festival musik resmi yang bekerjasama dengan EchoTic.",
    },
    {
      icon: Heart,
      title: "Kerja Fleksibel & Hybrid",
      desc: "Kami mengutamakan hasil rekayasa berkualitas tinggi dengan jam kerja fleksibel dan opsi WFH.",
    },
    {
      icon: Users,
      title: "Tim Inovatif & Berenergi",
      desc: "Kolaborasi bersama desainer, arsitek 3D, dan insinyur backend berpengalaman di industri musik.",
    },
  ];

  const openPositions = [
    {
      id: "fe-arch",
      title: "Senior Frontend Architect (Next.js & Three.js)",
      department: "Engineering",
      location: "Jakarta (Hybrid)",
      type: "Full-Time",
      experience: "3+ Tahun",
      description: "Memimpin pengembangan visualizer 3D denah panggung, animasi antarmuka, dan optimasi performa Next.js.",
    },
    {
      id: "be-eng",
      title: "Event Systems & API Engineer",
      department: "Backend Infrastructure",
      location: "Jakarta (Hybrid)",
      type: "Full-Time",
      experience: "2+ Tahun",
      description: "Merancang API REST Express.js berkecepatan tinggi, logika enkripsi kode QR gate, dan manajemen transaksi.",
    },
    {
      id: "uiux-des",
      title: "UI/UX Product Designer (Music Products)",
      department: "Product Design",
      location: "Jakarta / Remote",
      type: "Full-Time",
      experience: "2+ Tahun",
      description: "Merancang sistem desain estetis bertema musik, pengalaman pengguna mobile wallet, dan mikro-interaksi.",
    },
    {
      id: "gate-ops",
      title: "Live Event & Gate Operations Lead",
      department: "Event Operations",
      location: "Jakarta (On-Site)",
      type: "Full-Time / Project",
      experience: "1+ Tahun",
      description: "Mengelola tim scanner gate venue, verifikasi tiket fisik, dan koordinasi dengan promotor konser.",
    },
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !portfolioUrl) {
      addToast("Silakan isi nama, email, dan tautan portofolio / LinkedIn Anda", "error");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      addToast(`Lamaran untuk posisi "${selectedJob.title}" berhasil dikirim!`, "success");
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setPortfolioUrl("");
      setCoverNote("");
    }, 800);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow text-white relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#e5c158]/5 blur-[120px] pointer-events-none" />

      {/* Navigation Back Link */}
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

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-left space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e5c158]/30 bg-[#e5c158]/10 text-xs font-semibold text-[#e5c158]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>KARIR & KESEMPATAN BERGABUNG</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Bangun Masa Depan <br />
          <span className="text-gradient-gold">Industri Tiket Konser.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Kami di EchoTic selalu mencari talenta berbakat yang antusias dengan teknologi web modern, desain estetis, dan musik live. Mari ciptakan pengalaman konser terbaik bersama kami.
        </p>
      </motion.div>

      {/* Perks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {perks.map((perk, idx) => {
          const Icon = perk.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel-premium glass-panel-hover rounded-3xl p-8 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e5c158] mb-6">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">{perk.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Open Positions List */}
      <div className="space-y-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-1">
              Lowongan Terbuka
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Posisi Yang Dibutuhkan.
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {openPositions.length} posisi aktif tersedia
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {openPositions.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel-premium glass-panel-hover rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="bg-[#e5c158]/15 text-[#e5c158] border border-[#e5c158]/30 px-3 py-0.5 rounded-full uppercase">
                    {job.department}
                  </span>
                  <span className="bg-white/5 text-slate-300 border border-white/10 px-3 py-0.5 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="bg-white/5 text-slate-300 border border-white/10 px-3 py-0.5 rounded-full">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {job.description}
                </p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 pt-4 md:pt-0 border-t border-white/10 md:border-0">
                <Button
                  variant="accent"
                  size="md"
                  onClick={() => setSelectedJob(job)}
                  className="font-bold text-xs"
                  data-cursor="pointer"
                >
                  LAMAR POSISI INI <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title={`Lamar Posisi: ${selectedJob.title}`}
        >
          <form onSubmit={handleApplySubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="budi@domain.com"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tautan Portofolio / GitHub / LinkedIn
              </label>
              <input
                type="url"
                required
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Catatan Singkat (Opsional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Ceritakan singkat alasan Anda tertarik bergabung..."
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                variant="accent"
                disabled={submitting}
                className="w-full py-3.5 text-center justify-center font-bold text-sm"
              >
                {submitting ? "Mengirim Lamaran..." : "KIRIM LAMARAN SEKARANG"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </motion.main>
  );
}
