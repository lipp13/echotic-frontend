"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

/**
 * Official Standard ISO/IEC 18004 QR Code Component
 * Renders crisp, standard high-contrast QR codes for EchoTic passes.
 */
export default function QrCodeGenerator({ value = "TKT-ECHOTIC", size = 180, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-white border-2 border-[#ccff00] rounded-xl shadow-[0_0_25px_rgba(204,255,0,0.25)] ${className}`}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
      <div className="mt-3 px-3 py-1 bg-black text-[#ccff00] font-mono text-[11px] font-bold uppercase tracking-widest rounded border border-zinc-800">
        {value}
      </div>
    </div>
  );
}
