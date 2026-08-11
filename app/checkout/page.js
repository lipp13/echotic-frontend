"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, CreditCard, ChevronRight, ArrowLeft, Loader2, AlertCircle, QrCode } from "lucide-react";
import { apiGetEvent, apiCreateOrder, isAuthenticated } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);

  // Wizard Steps
  const [step, setStep] = useState(1); // 1: Attendee Info, 2: Payment, 3: Processing

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load checkout data and fetch event
  useEffect(() => {
    // Check auth first
    if (!isAuthenticated()) {
      addToast("Silakan masuk untuk melanjutkan pembayaran", "error");
      router.push("/login");
      return;
    }

    const pending = localStorage.getItem("echotic_checkout_pending");
    if (!pending) {
      addToast("Sesi transaksi tidak ditemukan", "error");
      router.push("/events");
      return;
    }

    const details = JSON.parse(pending);
    setBooking(details);

    // Fetch event details from API
    async function fetchEvent() {
      try {
        const result = await apiGetEvent(details.eventId);
        if (result.success) {
          setEvent(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        addToast("Gagal memuat detail rincian konser", "error");
      }
    }
    fetchEvent();
  }, [router, addToast]);

  // Form validations for Step 1
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!fullName || !email || !idNumber) {
      addToast("Silakan lengkapi semua data pemesan", "error");
      return;
    }
    if (!email.includes("@")) {
      addToast("Silakan masukkan alamat email yang valid", "error");
      return;
    }
    if (idNumber.length < 8) {
      addToast("Silakan masukkan nomor KTP/NIK yang valid", "error");
      return;
    }

    setStep(2);
    addToast("Data pemesan berhasil disimpan", "info");
  };

  // Submit order to API
  const handleCompletePayment = async () => {
    setIsProcessing(true);
    setStep(3);

    try {
      const orderData = {
        eventId: booking.eventId,
        categoryName: booking.categoryName,
        categoryId: booking.categoryId,
        quantity: booking.quantity || (booking.seats ? booking.seats.length : 1),
        totalPrice: booking.totalPrice,
        attendeeName: fullName,
        attendeeEmail: email,
        attendeeId: idNumber,
        isSeated: booking.isSeated,
        seats: booking.seats || [],
        paymentMethod,
      };

      const result = await apiCreateOrder(orderData);

      if (result.success) {
        localStorage.removeItem("echotic_checkout_pending");

        addToast("Pembayaran berhasil! Menerbitkan tiket digital...", "success");
        setIsProcessing(false);
        
        router.push(`/ticket/${result.data.orderId}`);
      }
    } catch (error) {
      setIsProcessing(false);
      setStep(2);
      addToast(error.error || "Pembayaran gagal. Silakan coba kembali.", "error");
    }
  };

  if (!booking || !event) {
    return (
      <div className="flex justify-center items-center py-24 flex-grow">
        <Loader2 className="w-8 h-8 text-[#e5c158] animate-spin" />
      </div>
    );
  }

  const venue = event.venue;

  // Calculate pricing breakdown
  const subtotal = booking.totalPrice;
  const adminFee = 25000; // flat 25K IDR fee
  const governmentTax = Math.floor(subtotal * 0.1); // 10% tax
  const finalTotal = subtotal + adminFee + governmentTax;

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
        <div>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase mb-2"
            data-cursor="pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Acara</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Konfirmasi & Pembayaran.
          </h1>
        </div>

        {/* Wizard Steps */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#e5c158]" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">1</span>
            <span>DATA PENONTON</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#e5c158]" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">2</span>
            <span>PEMBAYARAN</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-white" : "text-slate-500"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">3</span>
            <span>KONFIRMASI</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-7">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-premium rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <UserCheck className="w-5 h-5 text-[#e5c158]" />
                <h3 className="text-base font-bold text-white tracking-wide">
                  Informasi Pemesan Tiket
                </h3>
              </div>

              <form onSubmit={handleProceedToPayment} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Nama Lengkap (Sesuai KTP / SIM / Paspor)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Alamat Email (Untuk Pengiriman Tiket)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="budi@domain.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <span className="text-xs text-slate-400">
                    Tiket digital dan kode QR gate akan dikirimkan ke email ini.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Nomor KTP / NIK / Paspor
                  </label>
                  <input
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="3271029302910002"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  <span className="text-xs text-slate-400">
                    Digunakan untuk verifikasi identitas fisik di gate venue.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full py-4 text-center justify-center font-bold text-sm mt-4"
                  data-cursor="pointer"
                >
                  LANJUT KE PEMBAYARAN →
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel-premium rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-white/10 justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#e5c158]" />
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Pilih Metode Pembayaran
                  </h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-400 hover:text-white cursor-pointer underline"
                >
                  Ubah Data
                </button>
              </div>

              {/* Payment selection list */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between aspect-[16/10] transition-all cursor-pointer ${
                    paymentMethod === "qris"
                      ? "bg-[#e5c158]/15 border-[#e5c158] text-white shadow-md shadow-[#e5c158]/10"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <QrCode className="w-6 h-6 text-[#e5c158]" />
                  <div className="text-sm font-bold">QRIS Instant</div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod("va")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between aspect-[16/10] transition-all cursor-pointer ${
                    paymentMethod === "va"
                      ? "bg-[#e5c158]/15 border-[#e5c158] text-white shadow-md shadow-[#e5c158]/10"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                  <div className="text-sm font-bold">Virtual Account Bank</div>
                </button>
              </div>

              {/* Payment Method Details */}
              {paymentMethod === "qris" ? (
                <div className="border border-white/10 bg-white/5 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-center shadow-lg">
                    <div className="w-full h-full bg-slate-50 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                      <QrCode className="w-16 h-16 text-slate-800" />
                      <span className="text-[10px] font-bold tracking-widest text-slate-800 mt-2">
                        SCAN KODE QRIS
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    Kompatibel dengan GoPay, OVO, ShopeePay, BCA, Mandiri, Dana, LinkAja.
                  </span>
                </div>
              ) : (
                <div className="border border-white/10 bg-white/5 rounded-2xl p-6 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Mitra Bank</span>
                    <span className="text-white font-semibold">BCA / Mandiri / BNI</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Nomor Virtual Account</span>
                    <span className="text-[#e5c158] font-bold font-mono">8930 2003 1204 9011</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nama Rekening</span>
                    <span className="text-white">EchoTic Live Entertainment</span>
                  </div>
                </div>
              )}

              <Button
                variant="accent"
                onClick={handleCompletePayment}
                className="w-full py-4 text-center justify-center font-bold text-sm"
                data-cursor="pointer"
              >
                BAYAR SEKARANG {formatPrice(finalTotal)}
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel-premium rounded-3xl p-12 text-center space-y-6 flex flex-col items-center shadow-2xl"
            >
              <Loader2 className="w-10 h-10 text-[#e5c158] animate-spin" />
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Memproses Pembayaran Anda
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Kami sedang mengonfirmasi transaksi dan menerbitkan tiket digital Anda. Harap jangan menutup atau menyegarkan halaman ini.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="lg:col-span-5 glass-panel-premium rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10">
            <ShieldCheck className="w-5 h-5 text-[#e5c158]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Ringkasan Pesanan
            </h4>
          </div>

          {/* Show info */}
          <div className="flex gap-4 items-center">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 object-cover rounded-2xl border border-white/15"
            />
            <div>
              <h5 className="text-sm font-bold text-white uppercase line-clamp-1">{event.title}</h5>
              <span className="text-xs text-slate-400 block">{event.subtitle}</span>
              <span className="text-xs font-semibold text-[#e5c158] block mt-1">
                {booking.categoryName}
              </span>
            </div>
          </div>

          {/* Venue Detail */}
          <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400">Tanggal</span>
              <span className="text-white">{formatDate(event.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lokasi Venue</span>
              <span className="text-white">{venue?.name}</span>
            </div>
            {booking.isSeated ? (
              <div className="flex justify-between">
                <span className="text-slate-400">Nomor Kursi</span>
                <span className="text-white font-bold font-mono">
                  {booking.seats.map((s) => `${s.row}-${s.seatNum}`).join(", ")}
                </span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-slate-400">Jumlah Tiket</span>
                <span className="text-white font-bold">{booking.quantity} tiket</span>
              </div>
            )}
          </div>

          {/* Pricing Breakdowns */}
          <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs font-medium">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Biaya Layanan & Admin</span>
              <span className="text-white">{formatPrice(adminFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Pajak (10%)</span>
              <span className="text-white">{formatPrice(governmentTax)}</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Total Pembayaran
            </span>
            <span className="text-2xl font-bold text-white">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}


