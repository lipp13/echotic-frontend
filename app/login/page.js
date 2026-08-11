"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { apiLogin, isAuthenticated } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!email || !password) {
      addToast("Silakan isi semua kolom", "error");
      return;
    }

    if (!email.includes("@")) {
      addToast("Silakan masukkan alamat email yang valid", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await apiLogin(email, password);
      window.dispatchEvent(new Event("authChange"));
      addToast(result.message || `Selamat datang kembali, ${result.data.user.username}!`, "success");
      router.push("/dashboard");
    } catch (error) {
      addToast(error.error || "Gagal masuk. Periksa kembali email dan kata sandi Anda.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060608] text-white flex flex-col lg:flex-row relative">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Left Side: Editorial Banner */}
      <div className="flex-1 bg-[#08090d] border-r border-white/10 flex flex-col justify-between p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/70 to-transparent" />

        <div className="text-xl font-black tracking-tight text-white z-10">
          ECHOTIC<span className="text-[#e5c158]">.</span>
        </div>

        <div className="my-auto space-y-4 z-10">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
            Selamat Datang <br />
            <span className="text-gradient-gold">Kembali.</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-sm font-normal">
            Akses tiket konser, riwayat transaksi, dan profil personal Anda dalam satu tempat.
          </p>
        </div>

        <div className="flex justify-between text-xs text-slate-400 font-medium border-t border-white/10 pt-6 z-10">
          <span>OTENTIKASI AMAN</span>
          <span>PLATFORM TIKET MUSIK</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 bg-[#060608]">
        <div className="w-full max-w-md glass-panel-premium rounded-3xl p-8 md:p-10 relative shadow-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Masuk Akun
          </h2>
          <p className="text-xs text-slate-400 mb-8">
            Masukkan email dan kata sandi akun EchoTic Anda
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
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
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Kata Sandi
                </label>
              </div>
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
                  className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold text-sm mt-2"
              data-cursor="pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </div>
              ) : (
                "MASUK SEKARANG"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Belum punya akun EchoTic?{" "}
              <Link href="/register" className="text-[#e5c158] font-semibold hover:underline" data-cursor="pointer">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


