"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Silakan masukkan alamat email Anda", "error");
      return;
    }
    addToast("Berhasil berlangganan pengumuman presale EchoTic!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#060608] border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-[#e5c158]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Main Statement */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white">
                ECHOTIC<span className="text-[#e5c158]">.</span>
              </span>
            </Link>

            <p className="text-slate-300 text-sm font-semibold tracking-wide max-w-sm">
              MUSIK LIVE, PENGALAMAN LEBIH TERKESAN.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Platform tiket konser musik premium di Indonesia. Temukan, pesan, dan akses tiket digital resmi untuk konser musik terkini.
            </p>
          </div>

          {/* Column 1: Jelajahi */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Jelajahi
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Semua Konser
                </Link>
              </li>
              <li>
                <Link href="/events?genre=all" className="hover:text-white transition-colors">
                  Genre Musik
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Perusahaan */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Perusahaan
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Karir
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Dukungan */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Dukungan
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Newsletter */}
        <div className="pt-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex w-full lg:w-auto items-center bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-[#e5c158] transition-colors max-w-md backdrop-blur-md"
          >
            <input
              type="email"
              placeholder="Masukkan email untuk info presale..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none flex-grow"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#f5d77f] via-[#e5c158] to-[#d4af37] text-black text-xs font-bold hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0"
              data-cursor="pointer"
            >
              <span>Langganan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Socials & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                TikTok
              </a>
              <a href="#" className="hover:text-white transition-colors">
                X (Twitter)
              </a>
            </div>
            <span>© {new Date().getFullYear()} ECHOTIC. Hak cipta dilindungi. Dikembangkan oleh <strong className="text-slate-200 font-semibold">Alif Alfathar & Farras Khairy</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}


