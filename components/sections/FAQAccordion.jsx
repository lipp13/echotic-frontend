"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Bagaimana cara kerja visualisasi Denah Kursi 3D EchoTic?",
      a: "Engine 3D kami mengolah pencahayaan panggung, sektor tempat duduk, dan sudut pandang visual secara real-time langsung di browser Anda menggunakan Three.js dan WebGL. Anda bisa melihat estimasi sudut pandang panggung sebelum melakukan pemesanan tiket.",
    },
    {
      q: "Apakah tiket digital EchoTic aman dari percaloan dan tiket palsu?",
      a: "Ya, sangat aman. Setiap tiket digital menghasilkan enkripsi unik yang terhubung dengan akun pengguna dan token QR dinamis. Petugas gate venue memverifikasi tiket secara langsung sehingga mencegah tangkapan layar (screenshot) palsu atau penjualan kembali yang tidak resmi.",
    },
    {
      q: "Apakah tiket yang dibeli di website bisa diakses dari aplikasi mobile?",
      a: "Tentu saja! EchoTic mendukung sinkronisasi lintas platform. Setiap tiket yang Anda beli di situs web otomatis muncul di dompet tiket akun Anda.",
    },
    {
      q: "Bagaimana jika konser mengalami perubahan jadwal atau dibatalkan?",
      a: "Jika terjadi perubahan jadwal, informasi tiket digital Anda akan diperbarui secara otomatis. Apabila acara dibatalkan, proses pengembalian dana (refund) akan diproses secara otomatis ke akun yang terdaftar.",
    },
  ];

  return (
    <section className="py-24 bg-[#060608] border-b border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5c158]/10 border border-[#e5c158]/20 text-xs font-semibold text-[#e5c158] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PERTANYAAN YANG SERING DIAJUKAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Segala Hal Yang Perlu Anda Ketahui.
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2">
            Punya pertanyaan seputar denah kursi 3D, tiket digital, atau pemindaian di gate venue?
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel-premium rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-white tracking-wide pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#e5c158] border-[#e5c158]/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


