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
      addToast("Please enter your email address", "error");
      return;
    }
    addToast("Subscribed to EchoTic presale announcements!", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-zinc-800/80">
          {/* Main Statement */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-white">
                ECHOTIC<span className="text-[#9d4edd]">.</span>
              </span>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              LIVE MUSIC, BETTER EXPERIENCED.
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              The premium concert pass platform. Discover, book, and access digital passes for major live music events worldwide.
            </p>
          </div>

          {/* Column 1: Explore */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/events?genre=all" className="hover:text-white transition-colors">
                  Genres
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Company
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">
              Support
            </h5>
            <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
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
            className="flex w-full lg:w-auto items-center bg-[#121212] border border-zinc-800 rounded-full p-1.5 focus-within:border-[#9d4edd] transition-colors max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email for presale alerts..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none flex-grow"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#9d4edd] text-white text-xs font-semibold hover:bg-[#b565f7] transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
              data-cursor="pointer"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Socials & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-xs text-zinc-500 font-medium">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                TikTok
              </a>
              <a href="#" className="hover:text-white transition-colors">
                X
              </a>
            </div>
            <span>© {new Date().getFullYear()} ECHOTIC. All rights reserved. Developed by <strong className="text-zinc-300 font-semibold">Alif Alfathar & Farras Khairy</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
