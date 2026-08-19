"use client";

import React, { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-[#060608] text-white">
      <div className="w-16 h-16 rounded-3xl bg-[#ff2e63]/10 border border-[#ff2e63]/30 flex items-center justify-center text-[#ff2e63] text-2xl font-bold mb-6">
        !
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Terjadi Kendala Memuat Halaman</h2>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        {error?.message || "Halaman mengalami kesalahan saat memuat komponen. Silakan coba muat ulang."}
      </p>
      <div className="flex gap-4">
        <Button variant="accent" onClick={() => reset ? reset() : window.location.reload()}>
          Coba Lagi
        </Button>
        <Button variant="secondary" onClick={() => window.location.href = "/"}>
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
