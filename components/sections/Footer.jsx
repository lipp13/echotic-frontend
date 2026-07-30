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
      addToast("Please fill in your email address", "error");
      return;
    }
    addToast("Thanks for subscribing to EchoTic updates!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-8 mt-auto relative overflow-hidden">
      {/* Decorative Neon Ring in Footer Background */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-[#ccff00]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-zinc-900">
          {/* Main Statement */}
          <div className="lg:col-span-5">
            <div className="space-y-9">
              <div>
                <h3 className="font-mono text-3xl font-black text-white tracking-widest mb-4">
                  ECHOTIC.
                </h3>

                <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-sm">
                  Platform tiket konser premium untuk para pecinta musik live.
                  Temukan event favoritmu dan nikmati pengalaman konser yang
                  seru, aman, dan tak terlupakan.
                </p>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors"
                  data-cursor="pointer"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>{" "}
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>{" "}
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>{" "}
                  </svg>
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#00f0ff] hover:border-[#00f0ff]/40 transition-colors"
                  data-cursor="pointer"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>{" "}
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#ff0055] hover:border-[#ff0055]/40 transition-colors"
                  data-cursor="pointer"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>{" "}
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>{" "}
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Directory Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h5 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Jelajahi
              </h5>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <Link
                    href="/events"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    All Concerts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events?genre=edm"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Electronic / EDM
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events?genre=rock"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Rock & Heavy Metal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events?genre=jazz"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Jazz / Acoustic
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Bantuan
              </h5>
              <ul className="space-y-2 font-mono text-xs">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    FAQ & Help
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Ticket Resale
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    Terms & Refund
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="lg:col-span-4 space-y-4">
            <h5 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Jangan Sampai Ketinggalan
            </h5>
            <p className="text-zinc-400 font-mono text-xs leading-relaxed">
              Jadilah yang pertama mengetahui informasi presale, pengumuman artis terbaru, serta pengingat saat tiket mulai dijual.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex border border-zinc-800 bg-zinc-950/60 focus-within:border-[#ccff00] transition-colors"
            >
              <input
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-0 px-4 py-3 text-xs text-white font-mono placeholder-zinc-600 focus:outline-none flex-grow"
              />
              <button
                type="submit"
                className="px-4 bg-zinc-900 text-white hover:bg-[#ccff00] hover:text-black border-l border-zinc-800 transition-colors cursor-pointer"
                data-cursor="pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 font-mono text-[10px] text-zinc-600">
          <p>
            © {new Date().getFullYear()} ECHOTIC. SELURUH HAK CIPTA DILINDUNGI.
          </p>
          <div className="flex gap-4">
            <span>DIBUAT UNTUK PECINTA KONSER</span>
            <span className="text-zinc-800">•</span>
            <span>DIBANGUN DENGAN REACT 19 & NEXT.JS</span>
            <span className="text-zinc-800">•</span>
            <span>DEVELOPER: Alif Alfathar & Farras Khairy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
