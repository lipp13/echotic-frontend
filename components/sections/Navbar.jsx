"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Ticket, Search } from "lucide-react";

import { useToast } from "@/components/ui/Toast";
import { isAuthenticated, getUserData, apiLogout } from "@/lib/api";

function NavbarContentInner({ searchParams }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const checkUser = () => {
      if (isAuthenticated()) {
        setUser(getUserData());
      } else {
        setUser(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChange", checkUser);

    checkUser();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChange", checkUser);
    };
  }, []);

  const handleLogout = async () => {
    await apiLogout();

    setUser(null);
    window.dispatchEvent(new Event("authChange"));

    addToast("Berhasil keluar dari akun", "info");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      name: "Konser",
      href: "/events",
    },
    {
      name: "Tentang Kami",
      href: "/about",
    },
    {
      name: "Kontak",
      href: "/contact",
    },
    {
      name: "Karir",
      href: "/careers",
    },
    ...(user?.role === "admin"
      ? [
          {
            name: "Kontrol Gate",
            href: "/admin",
          },
        ]
      : []),
  ];

  const isLinkActive = (href) => {
    if (href === "/events") {
      return pathname === "/events" && (searchParams ? searchParams.get("genre") === null : true);
    }
    return pathname === href;
  };

  return (
    <>
      {/* =========================================================
          DESKTOP / MAIN NAVBAR
      ========================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#060608]/80 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/40"
            : "bg-gradient-to-b from-[#060608]/90 via-[#060608]/40 to-transparent py-5"
        }`}
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            md:px-10
            flex
            lg:grid
            lg:grid-cols-[1fr_auto_1fr]
            items-center
            gap-6
            lg:gap-10
            transition-all
            duration-300
          "
        >
          {/* =====================================================
              BRAND
          ===================================================== */}
          <Link
            href="/"
            className="
              flex
              items-center
              gap-2
              group
              cursor-pointer
              lg:justify-self-start
            "
            data-cursor="pointer"
          >
            <span
              className="
                text-xl
                font-black
                tracking-tight
                text-white
                group-hover:text-slate-200
                transition-colors
              "
            >
              ECHOTIC
              <span className="text-[#e5c158]">.</span>
            </span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-8
              justify-self-center
              bg-white/[0.04]
              border
              border-white/10
              px-6
              py-2
              rounded-full
              backdrop-blur-md
              shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            "
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    relative
                    text-xs
                    tracking-wide
                    transition-all
                    duration-200
                    whitespace-nowrap
                    ${
                      isActive
                        ? "text-[#e5c158] font-bold"
                        : "text-slate-400 font-semibold hover:text-white"
                    }
                  `}
                  data-cursor="pointer"
                >
                  {link.name}

                  {isActive && (
                    <motion.span
                      layoutId="navbar-active"
                      className="
                        absolute
                        -bottom-1.5
                        left-1/2
                        -translate-x-1/2
                        w-1
                        h-1
                        rounded-full
                        bg-[#e5c158]
                      "
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* =====================================================
              DESKTOP RIGHT ACTIONS
          ===================================================== */}
          <div
            className="
              hidden
              md:flex
              items-center
              justify-end
              gap-3
              lg:justify-self-end
            "
          >
            {/* Search */}
            <Link
              href="/events"
              className="
                p-2.5
                text-slate-400
                hover:text-white
                transition-colors
                rounded-full
                hover:bg-white/5
              "
              title="Cari Konser"
              data-cursor="pointer"
            >
              <Search className="w-4 h-4" />
            </Link>

            {user ? (
              /* =================================================
                 LOGGED IN
              ================================================= */
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="
                      px-3.5
                      py-1.5
                      rounded-full
                      text-xs
                      font-bold
                      bg-white/10
                      border
                      border-white/15
                      text-slate-200
                      hover:text-white
                      hover:border-white/30
                      transition-all
                    "
                    data-cursor="pointer"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  href="/dashboard"
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    border
                    border-white/15
                    text-xs
                    font-semibold
                    text-white
                    hover:bg-white/15
                    transition-all
                    backdrop-blur-md
                    shadow-sm
                  "
                  data-cursor="pointer"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#e5c158]" />

                  <span>Tiket Saya ({user.username})</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="
                    p-2
                    text-slate-400
                    hover:text-rose-400
                    transition-colors
                    cursor-pointer
                    rounded-full
                    hover:bg-white/5
                  "
                  title="Keluar Akun"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* =================================================
                 LOGGED OUT
              ================================================= */
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="
                    text-xs
                    font-semibold
                    text-slate-300
                    hover:text-white
                    px-3.5
                    py-2
                    transition-colors
                  "
                  data-cursor="pointer"
                >
                  Masuk
                </Link>

                <Link
                  href="/login"
                  className="
                    px-5
                    py-2
                    rounded-full
                    bg-gradient-to-r
                    from-[#f5d77f]
                    via-[#e5c158]
                    to-[#d4af37]
                    text-black
                    font-bold
                    text-xs
                    hover:brightness-110
                    transition-all
                    shadow-md
                    shadow-[#e5c158]/15
                  "
                  data-cursor="pointer"
                >
                  Beli Tiket
                </Link>
              </div>
            )}
          </div>

          {/* =====================================================
              MOBILE ACTIONS
          ===================================================== */}
          <div className="flex items-center gap-2 md:hidden ml-auto">
            <Link
              href="/events"
              className="
                p-2
                text-slate-400
                hover:text-white
                transition-colors
              "
              data-cursor="pointer"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                p-2
                text-white
                hover:text-slate-300
                transition-colors
                cursor-pointer
              "
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              fixed
              inset-x-0
              top-0
              pt-24
              pb-8
              bg-[#060608]/95
              border-b
              border-white/10
              z-40
              flex
              flex-col
              px-6
              md:hidden
              gap-6
              backdrop-blur-2xl
            "
          >
            {/* Mobile Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      text-base
                      font-semibold
                      transition-colors
                      py-2.5
                      border-b
                      border-white/5
                      ${
                        isActive
                          ? "text-[#e5c158]"
                          : "text-slate-300 hover:text-[#e5c158]"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Account Actions */}
            <div className="flex flex-col gap-3 pt-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      bg-white/10
                      border
                      border-white/15
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    <Ticket className="w-4 h-4 text-[#e5c158]" />

                    <span>Tiket Saya ({user.username})</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      py-3
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      text-sm
                      font-semibold
                      text-slate-400
                      hover:text-rose-400
                      transition-colors
                    "
                  >
                    <LogOut className="w-4 h-4" />

                    <span>Keluar Akun</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      py-3
                      rounded-full
                      bg-gradient-to-r
                      from-[#f5d77f]
                      via-[#e5c158]
                      to-[#d4af37]
                      text-black
                      font-bold
                      text-sm
                      shadow-md
                    "
                  >
                    Beli Tiket
                  </Link>

                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      py-3
                      rounded-full
                      bg-white/10
                      border
                      border-white/15
                      text-white
                      font-semibold
                      text-sm
                    "
                  >
                    Masuk
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

function NavbarContentWithSearchParams() {
  const searchParams = useSearchParams();
  return <NavbarContentInner searchParams={searchParams} />;
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarContentInner searchParams={null} />}>
      <NavbarContentWithSearchParams />
    </Suspense>
  );
}
