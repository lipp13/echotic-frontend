"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, FlipHorizontal, CheckCircle2, AlertCircle } from "lucide-react";

export default function CameraQrScanner({ onScanSuccess, active = false }) {
  const [cameraActive, setCameraActive] = useState(active);
  const [isMirrored, setIsMirrored] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastScanned, setLastScanned] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrcodeScanner = null;

    if (cameraActive) {
      // Dynamically import Html5Qrcode to avoid SSR issues
      import("html5-qrcode")
        .then(({ Html5Qrcode }) => {
          const scannerId = "interactive-qr-reader";
          const qrElement = document.getElementById(scannerId);
          if (!qrElement) return;

          html5QrcodeScanner = new Html5Qrcode(scannerId);
          scannerRef.current = html5QrcodeScanner;

          const config = {
            fps: 15,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          };

          html5QrcodeScanner
            .start(
              { facingMode: "user" }, // Default front webcam
              config,
              (decodedText) => {
                setLastScanned(decodedText);
                if (onScanSuccess) {
                  onScanSuccess(decodedText);
                }
              },
              () => {}
            )
            .catch((err) => {
              console.error("Camera access error:", err);
              setErrorMsg(
                "Tidak dapat mengakses kamera laptop/webcam. Pastikan izin kamera telah diberikan di browser."
              );
              setCameraActive(false);
            });
        })
        .catch((e) => {
          console.error("Failed to load html5-qrcode:", e);
        });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current = null;
          });
      }
    };
  }, [cameraActive, onScanSuccess]);

  const toggleCamera = () => {
    setErrorMsg(null);
    setCameraActive(!cameraActive);
  };

  const toggleMirror = () => {
    setIsMirrored((prev) => !prev);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4 font-mono">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${cameraActive ? "bg-red-500 animate-ping" : "bg-zinc-600"}`} />
          <h3 className="font-bold text-xs uppercase text-white tracking-widest flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>LIVE WEBCAM SCANNER</span>
          </h3>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {cameraActive && (
            <button
              type="button"
              onClick={toggleMirror}
              title="Mirror Flip Mode"
              className={`px-3 py-2 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 transition-all cursor-pointer ${
                isMirrored
                  ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-300"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <FlipHorizontal className="w-4 h-4" />
              <span>MIRROR {isMirrored ? "ON" : "OFF"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={toggleCamera}
            className={`px-4 py-2 font-bold text-xs uppercase tracking-wider rounded flex items-center gap-2 transition-all cursor-pointer flex-1 sm:flex-none justify-center ${
              cameraActive
                ? "bg-red-950 border border-red-800 text-red-400 hover:bg-red-900"
                : "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30"
            }`}
          >
            {cameraActive ? (
              <>
                <CameraOff className="w-4 h-4" /> Matikan Kamera
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" /> Buka Kamera
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {cameraActive ? (
        <div className="space-y-3">
          <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-xl border-2 border-cyan-500 bg-black shadow-[0_0_25px_rgba(0,240,255,0.2)]">
            <div
              id="interactive-qr-reader"
              className={`w-full overflow-hidden transition-transform duration-300 ${
                isMirrored ? "[&_video]:-scale-x-100" : "[&_video]:scale-x-100"
              }`}
            />
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2.5 py-1 text-[10px] text-cyan-400 border border-cyan-500/30 rounded uppercase font-bold flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>WEBCAM AKTIF ({isMirrored ? "MIRROR ON" : "MIRROR OFF"})</span>
            </div>
          </div>

          {lastScanned && (
            <div className="p-2 bg-emerald-950 border border-emerald-800 text-emerald-300 text-center text-xs rounded font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ TERDETEKSI: {lastScanned}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="py-8 text-center bg-black/40 border border-dashed border-zinc-800 rounded-lg space-y-2">
          <Camera className="w-8 h-8 text-zinc-600 mx-auto" />
          <p className="text-xs text-zinc-400">
            Klik tombol <strong className="text-cyan-400">"Buka Kamera"</strong> di atas untuk memindai QR Code pengunjung secara langsung melalui webcam.
          </p>
        </div>
      )}
    </div>
  );
}
