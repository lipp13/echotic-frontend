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
import Decor3D from "@/components/ui/Decor3D";

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
      addToast("Please login to continue checkout", "error");
      router.push("/login");
      return;
    }

    const pending = localStorage.getItem("echotic_checkout_pending");
    if (!pending) {
      addToast("No active checkout session found", "error");
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
        addToast("Failed to load event details", "error");
      }
    }
    fetchEvent();
  }, [router, addToast]);

  // Form validations for Step 1
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!fullName || !email || !idNumber) {
      addToast("Please fill in all attendee fields", "error");
      return;
    }
    if (!email.includes("@")) {
      addToast("Please enter a valid email", "error");
      return;
    }
    if (idNumber.length < 8) {
      addToast("Please enter a valid National ID Number", "error");
      return;
    }

    setStep(2);
    addToast("Attendee information verified", "info");
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
        // Clean checkout cache
        localStorage.removeItem("echotic_checkout_pending");

        addToast("Transaction Approved! Generating tickets...", "success");
        setIsProcessing(false);
        
        // Forward to confirmation
        router.push(`/ticket/${result.data.orderId}`);
      }
    } catch (error) {
      setIsProcessing(false);
      setStep(2);
      addToast(error.error || "Payment failed. Please try again.", "error");
    }
  };

  if (!booking || !event) {
    return (
      <div className="flex justify-center items-center py-24 flex-grow">
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
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
    <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
      {/* Back button / header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-zinc-900 pb-8">
        <div>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase mb-3"
            data-cursor="pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Abandon Checkout</span>
          </Link>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            Checkout Protocol
          </h1>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#ccff00]" : "text-zinc-600"}`}>
            <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px]">1</span>
            <span className="font-bold">ATTENDEE</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#00f0ff]" : "text-zinc-600"}`}>
            <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px]">2</span>
            <span className="font-bold">PAYMENT</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-800" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-zinc-400" : "text-zinc-650"}`}>
            <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px]">3</span>
            <span className="font-bold">GENERATE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Forms based on current step */}
        <div className="lg:col-span-7">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
              className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-900">
                <UserCheck className="w-5 h-5 text-[#ccff00]" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Holder Identification Details
                </h3>
              </div>

              <form onSubmit={handleProceedToPayment} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    Full Name (As in ID Card)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Alif Alfathar"
                    className="w-full bg-black/60 border border-zinc-900 focus:border-[#ccff00] px-4 py-3 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    Email Address (Ticket Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alif@domain.com"
                    className="w-full bg-black/60 border border-zinc-900 focus:border-[#ccff00] px-4 py-3 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Ensure email is correct; your digital QR pass will be issued here.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-xs text-zinc-400 uppercase">
                    National ID Card Number (NIK / Passport)
                  </label>
                  <input
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="327xxxxxxxxxxxxx"
                    className="w-full bg-black/60 border border-zinc-900 focus:border-[#ccff00] px-4 py-3 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Required for identity verification at the concert gates.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-center justify-center mt-6"
                  data-cursor="pointer"
                >
                  Verify & Proceed <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
              className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-900 justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#00f0ff]" />
                  <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    Secured Payment Gateway
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <Decor3D type="shield" className="w-10 h-10" />
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-zinc-500 hover:text-white cursor-pointer"
                  >
                    Edit Info
                  </button>
                </div>
              </div>

              {/* Payment selection list */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-4 border font-mono text-left flex flex-col justify-between aspect-[16/10] transition-colors cursor-pointer ${
                    paymentMethod === "qris"
                      ? "bg-[#00f0ff]/5 border-[#00f0ff] text-white"
                      : "bg-black/60 border-zinc-900 text-zinc-500"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#00f0ff]" />
                  <div className="text-xs font-bold">QRIS INSTANT</div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod("va")}
                  className={`p-4 border font-mono text-left flex flex-col justify-between aspect-[16/10] transition-colors cursor-pointer ${
                    paymentMethod === "va"
                      ? "bg-[#00f0ff]/5 border-[#00f0ff] text-white"
                      : "bg-black/60 border-zinc-900 text-zinc-500"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-white" />
                  <div className="text-xs font-bold">VIRTUAL ACCOUNT</div>
                </button>
              </div>

              {/* Dynamic Payment Method View */}
              {paymentMethod === "qris" ? (
                <div className="border border-zinc-900 bg-black/40 p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-40 h-40 bg-white p-3 border border-zinc-800 flex items-center justify-center relative shadow-lg">
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-700">
                      <span className="font-mono text-xs font-black tracking-tighter text-black">
                        MOCK QRIS BARCODE
                      </span>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    Scan via any banking app (Gopay, OVO, ShopeePay, BCA)
                  </div>
                </div>
              ) : (
                <div className="border border-zinc-900 bg-black/40 p-6 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">BANK PARTNER</span>
                    <span className="text-white font-bold">BCA MANDIRI OR BNI</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500">MOCK ACCOUNT NO</span>
                    <span className="text-[#00f0ff] font-bold">8930 2003 1204 9011</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">RECEIPT NAME</span>
                    <span className="text-white">ECHOTIC TICKET INTL</span>
                  </div>
                </div>
              )}

              {/* Guarantee */}
              <div className="border border-zinc-900 bg-zinc-900/10 p-4 flex gap-3 text-zinc-400 font-mono text-[10px] leading-relaxed">
                <AlertCircle className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />
                <span>
                  Please complete the payment inside 10 minutes. The tickets will be automatically released back to the general pool if the payment is not received.
                </span>
              </div>

              <Button
                variant="primary"
                onClick={handleCompletePayment}
                className="w-full py-4 text-center justify-center"
                data-cursor="pointer"
              >
                CONFIRM & PAY {formatPrice(finalTotal)}
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-950 border border-zinc-800 p-12 text-center space-y-6 flex flex-col items-center"
            >
              <Loader2 className="w-12 h-12 text-[#ccff00] animate-spin" />
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">
                  CRYPTOGRAPHIC GENERATION IN PROGRESS
                </h3>
                <p className="font-mono text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
                  We are validating the payment receipt, issuing your seat allocations, and embedding the ticket keys into your digital pass. Do not reload.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-900">
            <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest">
              Pass Purchase Summary
            </h4>
          </div>

          {/* Show info */}
          <div className="flex gap-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 object-cover border border-zinc-800 grayscale"
            />
            <div className="font-mono">
              <h5 className="text-xs font-bold text-white uppercase line-clamp-1">{event.title}</h5>
              <span className="text-[10px] text-zinc-500 block mb-1">{event.subtitle}</span>
              <span className="text-[9px] bg-zinc-900 text-[#ccff00] px-2 py-0.5 uppercase tracking-wider">
                {booking.categoryName}
              </span>
            </div>
          </div>

          {/* Venue Detail */}
          <div className="border-t border-zinc-900 pt-4 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Date</span>
              <span className="text-white">{formatDate(event.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Venue</span>
              <span className="text-white">{venue?.name}</span>
            </div>
            {booking.isSeated ? (
              <div className="flex justify-between">
                <span className="text-zinc-500">Seat Allocations</span>
                <span className="text-white font-bold">
                  {booking.seats.map((s) => `${s.row}-${s.seatNum}`).join(", ")}
                </span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-zinc-500">Quantity</span>
                <span className="text-white font-bold">{booking.quantity} passes</span>
              </div>
            )}
          </div>

          {/* Pricing Breakdowns */}
          <div className="border-t border-zinc-900 pt-4 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Passes Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">System Booking Fee</span>
              <span className="text-white">{formatPrice(adminFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Government Tax (10%)</span>
              <span className="text-white">{formatPrice(governmentTax)}</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t border-zinc-900 pt-4 flex justify-between items-center font-mono">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Total Charge
            </span>
            <span className="text-xl font-black text-[#ccff00]">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

      </div>
    </main>
  );
}
