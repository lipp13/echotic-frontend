"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, Mail, User, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { apiRegister, isAuthenticated } from "@/lib/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      addToast("Silakan isi semua kolom", "error");
      return;
    }

    if (!email.includes("@")) {
      addToast("Silakan masukkan alamat email yang valid", "error");
      return;
    }

    if (password.length < 6) {
      addToast("Kata sandi minimal harus 6 karakter", "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast("Konfirmasi kata sandi tidak cocok", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await apiRegister(username, email, password);
      window.dispatchEvent(new Event("authChange"));
      addToast(result.message || `Akun berhasil dibuat! Selamat datang, ${username}!`, "success");
      router.push("/dashboard");
    } catch (error) {
      const message = error.details
        ? error.details.map((d) => d.message).join(". ")
        : error.error || "Pendaftaran gagal. Silakan coba kembali.";
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#060608] text-white flex flex-col lg:flex-row relative overflow-hidden"
    >
      {/* Ambient Animated Glow Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e5c158]/20 blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#ff2e63]/15 blur-3xl pointer-events-none"
      />

      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase group"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Left Side: Editorial Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 bg-[#08090d] border-r border-white/10 flex flex-col justify-between p-12 lg:p-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none transform scale-105 transition-transform duration-1000" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/70 to-transparent" />

        <div className="text-xl font-black tracking-tight text-white z-10 flex items-center gap-2">
          ECHOTIC<span className="text-[#e5c158]">.</span>
          <span className="text-[10px] font-semibold tracking-widest px-2 py-0.5 rounded-full bg-[#e5c158]/15 text-[#e5c158] border border-[#e5c158]/30 uppercase">
            Platform Musik
          </span>
        </div>

        <div className="my-auto space-y-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              Buat Tiket <br />
              <span className="text-gradient-gold">Digital Anda.</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-sm font-normal mt-4 leading-relaxed">
              Daftar akun sekarang untuk melacak tiket, mengamankan akses presale konser, dan mempersonalisasi pengalaman musik Anda.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-between text-xs text-slate-400 font-medium border-t border-white/10 pt-6 z-10">
          <span>AKUN ANGGOTA GRATIS</span>
          <span>PLATFORM RESMI ECHOTIC</span>
        </div>
      </motion.div>

      {/* Right Side: Form */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex items-center justify-center p-6 lg:p-20 bg-[#060608] z-10"
      >
        <motion.div 
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md glass-panel-premium rounded-3xl p-8 md:p-10 relative shadow-2xl border border-white/15"
        >
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Buat Akun Baru
          </h2>
          <p className="text-xs text-slate-400 mb-8">
            Lengkapi data diri Anda untuk mulai memesan tiket konser
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="budi_santoso"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Alamat Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="budi@domain.com"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold text-sm mt-4 shadow-lg shadow-[#e5c158]/10"
              data-cursor="pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuat Akun...</span>
                </div>
              ) : (
                "DAFTAR SEKARANG"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Sudah memiliki akun EchoTic?{" "}
              <Link href="/login" className="text-[#e5c158] font-semibold hover:underline" data-cursor="pointer">
                Masuk Disini
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}


