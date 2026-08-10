"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Ticket, Search } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { isAuthenticated, getUserData, apiLogout } from "@/lib/api";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    const checkUser = () => {
      if (isAuthenticated()) {
        setUser(getUserData());
      } else {
        setUser(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    checkUser();
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
    { name: "Events", href: "/events" },
    { name: "Genres", href: "/events?genre=all" },
    { name: "About", href: "/about" },
    ...(user?.role === "admin" ? [{ name: "Gate Control", href: "/admin" }] : []),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/85 backdrop-blur-md py-4 border-b border-white/5 shadow-lg"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group cursor-pointer"
            data-cursor="pointer"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
              ECHOTIC<span className="text-[#9d4edd]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-zinc-400"
                  }`}
                  data-cursor="pointer"
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search link icon button */}
            <Link
              href="/events"
              className="p-2.5 text-zinc-400 hover:text-white transition-colors"
              title="Search Events"
            >
              <Search className="w-4 h-4" />
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-white hover:bg-zinc-800 transition-all"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#9d4edd]" />
                  <span>My Passes ({user.username})</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/events"
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
                >
                  Get Tickets
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions & Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/events" className="p-2 text-zinc-400 hover:text-white">
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 pt-24 pb-8 bg-[#080808]/98 border-b border-zinc-800 z-40 flex flex-col px-6 md:hidden gap-6 backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-zinc-300 hover:text-white transition-colors py-2.5 border-b border-zinc-900"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-semibold text-white"
                  >
                    <Ticket className="w-4 h-4 text-[#9d4edd]" />
                    <span>My Dashboard ({user.username})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-sm font-semibold text-zinc-400 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-full bg-[#9d4edd] text-white font-semibold text-sm shadow-md"
                  >
                    Get Tickets
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white font-semibold text-sm"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
