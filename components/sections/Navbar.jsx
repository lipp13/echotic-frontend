"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Ticket } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { isAuthenticated, getUserData, apiLogout } from "@/lib/api";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const { addToast } = useToast();

  useEffect(() => {
    // Check scroll
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Check user auth state
    const checkUser = () => {
      if (isAuthenticated()) {
        setUser(getUserData());
      } else {
        setUser(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkUser();

    // Custom event listener for simulated auth updates
    window.addEventListener("authChange", checkUser);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChange", checkUser);
    };
  }, []);

  const handleLogout = async () => {
    await apiLogout();
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    addToast("Logged out successfully", "info");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Jelajahi Events", href: "/events" },
    { name: "Verifikasi Tiket", href: "/events?search=NEON" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 border-b border-zinc-900/80 py-4 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor="pointer"
          >
            <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center font-mono font-black text-black text-lg transition-transform duration-300 group-hover:rotate-12">
              E
            </div>
            <span className="font-mono text-xl font-black tracking-widest text-white group-hover:text-[#ccff00] transition-colors">
              ECHOTIC.
            </span>
          </Link>

          {/* Desktop NavLinks */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-[#ccff00] ${
                    isActive ? "text-[#ccff00] font-bold" : "text-zinc-400"
                  }`}
                  data-cursor="pointer"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action/Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 font-mono text-xs text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                    data-cursor="pointer"
                  >
                    <span>ADMIN PANEL</span>
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 border border-[#ccff00]/20 bg-[#ccff00]/5 px-4 py-2 font-mono text-xs text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all"
                  data-cursor="pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>My Tickets ({user.username})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 border border-zinc-800 hover:border-red-500/40 hover:bg-red-500/5 px-4 py-2 font-mono text-xs text-zinc-400 hover:text-red-500 transition-all cursor-pointer"
                  data-cursor="pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 border border-zinc-800 bg-zinc-950 px-5 py-2.5 font-mono text-xs text-white hover:border-[#ccff00] hover:shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all"
                data-cursor="pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>MASUK</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-[#ccff00] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 pt-24 pb-8 bg-zinc-950/98 border-b border-zinc-900 z-30 flex flex-col px-6 md:hidden gap-6 backdrop-blur-lg"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest text-zinc-400 hover:text-[#ccff00] transition-colors py-2 border-b border-zinc-900"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 border border-[#ccff00]/20 bg-[#ccff00]/5 py-3 font-mono text-xs text-[#ccff00]"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Dashboardmu ({user.username})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-zinc-800 py-3 font-mono text-xs text-zinc-400 hover:text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>KELUAR</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-950 py-3 font-mono text-xs text-white hover:border-[#ccff00]"
                >
                  <User className="w-4 h-4" />
                  <span>SIGN IN</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
