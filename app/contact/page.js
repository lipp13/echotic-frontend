"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !subject || !message) {
      addToast("Silakan lengkapi semua kolom formulir kontak", "error");
      return;
    }

    if (!email.includes("@")) {
      addToast("Silakan masukkan alamat email yang valid", "error");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast("Pesan Anda berhasil dikirim! Tim EchoTic akan menghubungi Anda secepatnya.", "success");
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 800);
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email Bantuan",
      detail: "support@echotic.id",
      sub: "Respon rata-rata < 2 jam",
    },
    {
      icon: Phone,
      title: "Layanan Pelanggan",
      detail: "+62 (021) 8802-9910",
      sub: "Senin - Minggu, 09:00 - 21:00 WIB",
    },
    {
      icon: MapPin,
      title: "Kantor Pusat",
      detail: "SCBD Tower Level 24, Jakarta",
      sub: "Kawasan Niaga Terpadu Sudirman",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      detail: "24/7 Gate & System Support",
      sub: "Tim siap siaga saat hari konser",
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow text-white relative overflow-hidden"
    >
      {/* Background Animated Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#e5c158]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#ff2e63]/5 blur-[120px] pointer-events-none" />

      {/* Top Navigation Back Link */}
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
        className="mb-14 text-left space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e5c158]/30 bg-[#e5c158]/10 text-xs font-semibold text-[#e5c158]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DUKUNGAN & HUBUNGI KAMI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Ada Pertanyaan? <br />
          <span className="text-gradient-gold">Tim Kami Siap Membantu.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Punya pertanyaan seputar pembelian tiket konser, kemitraan event organizer, atau bantuan teknis? Hubungi kami langsung melalui formulir di bawah ini.
        </p>
      </motion.div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel-premium glass-panel-hover rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e5c158] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {card.title}
                </h4>
                <p className="text-base font-bold text-white tracking-tight">
                  {card.detail}
                </p>
              </div>
              <span className="text-[11px] text-[#e5c158] font-medium mt-4 block">
                {card.sub}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Form & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 glass-panel-premium rounded-3xl p-8 md:p-10 shadow-2xl space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <MessageSquare className="w-5 h-5 text-[#e5c158]" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Kirim Pesan Langsung
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Alex Rian"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Subjek Pertanyaan
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Contoh: Bantuan Pembayaran / Kerjasama Event"
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Pesan Anda
              </label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan kendala atau pesan Anda secara detail..."
                className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold text-sm shadow-lg shadow-[#e5c158]/10"
              data-cursor="pointer"
            >
              {loading ? "Mengirim Pesan..." : "KIRIM PESAN SEKARANG"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </motion.div>

        {/* Right Info Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="glass-panel-premium rounded-3xl p-8 space-y-6 shadow-2xl border border-white/15">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">
              Layanan Prioritas Penonton
            </h4>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Bantuan Tiket Kendala QR:</strong> Jika Anda mengalami kendala scan kode QR tiket saat hari konser, kunjungi Helpdesk EchoTic di Gate Utama venue.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Pengembalian & Perubahan Data:</strong> Perubahan data nama pemegang tiket dapat dilakukan maksimal H-3 sebelum konser dimulai.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
                <span><strong className="text-white">Kemitraan Promotor:</strong> Untuk integrasi sistem tiket dan 3D visualizer konser Anda, hubungi tim bisnis kami di partner@echotic.id.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Keamanan Terenkripsi SSL</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
