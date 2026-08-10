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
    addToast("Attendee information saved", "info");
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

        addToast("Payment successful! Issuing digital pass...", "success");
        setIsProcessing(false);
        
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
        <Loader2 className="w-8 h-8 text-[#9d4edd] animate-spin" />
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
        <div>
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase mb-2"
            data-cursor="pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Event</span>
          </Link>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">
            CHECKOUT.
          </h1>
        </div>

        {/* Wizard Steps */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#9d4edd]" : "text-zinc-600"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">1</span>
            <span>ATTENDEE</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-700" />
          <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#9d4edd]" : "text-zinc-600"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">2</span>
            <span>PAYMENT</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-700" />
          <div className={`flex items-center gap-2 ${step >= 3 ? "text-white" : "text-zinc-600"}`}>
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold">3</span>
            <span>CONFIRMATION</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-7">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-card-subtle"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                <UserCheck className="w-5 h-5 text-[#9d4edd]" />
                <h3 className="text-base font-bold uppercase text-white tracking-wide">
                  Attendee Information
                </h3>
              </div>

              <form onSubmit={handleProceedToPayment} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Full Name (As shown on ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Alex Johnson"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#9d4edd] rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Email Address (For Pass Delivery)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#9d4edd] rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                  <span className="text-xs text-zinc-500">
                    Your digital pass and entry QR code will be delivered here.
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    National ID / Passport Number
                  </label>
                  <input
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    placeholder="3271029302910002"
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#9d4edd] rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                  />
                  <span className="text-xs text-zinc-500">
                    Used for venue security verification upon entry.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  className="w-full py-4 text-center justify-center font-bold text-sm mt-4"
                  data-cursor="pointer"
                >
                  PROCEED TO PAYMENT →
                </Button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-card-subtle"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-zinc-800 justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-[#9d4edd]" />
                  <h3 className="text-base font-bold uppercase text-white tracking-wide">
                    Select Payment Method
                  </h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  Edit Info
                </button>
              </div>

              {/* Payment selection list */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("qris")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between aspect-[16/10] transition-all cursor-pointer ${
                    paymentMethod === "qris"
                      ? "bg-[#9d4edd]/15 border-[#9d4edd] text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <QrCode className="w-6 h-6 text-[#9d4edd]" />
                  <div className="text-sm font-bold">QRIS Instant</div>
                </button>
                
                <button
                  onClick={() => setPaymentMethod("va")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between aspect-[16/10] transition-all cursor-pointer ${
                    paymentMethod === "va"
                      ? "bg-[#9d4edd]/15 border-[#9d4edd] text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                  <div className="text-sm font-bold">Virtual Account</div>
                </button>
              </div>

              {/* Payment Method Details */}
              {paymentMethod === "qris" ? (
                <div className="border border-zinc-800 bg-zinc-900/40 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-44 h-44 bg-white p-3 rounded-2xl border border-zinc-300 flex items-center justify-center shadow-lg">
                    <div className="w-full h-full bg-zinc-100 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                      <QrCode className="w-16 h-16 text-zinc-800" />
                      <span className="text-[10px] font-bold tracking-widest text-zinc-800 mt-2">
                        SCAN QRIS CODE
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400">
                    Compatible with GoPay, OVO, ShopeePay, BCA, Mandiri mobile apps.
                  </span>
                </div>
              ) : (
                <div className="border border-zinc-800 bg-zinc-900/40 rounded-2xl p-6 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Bank Partners</span>
                    <span className="text-white font-semibold">BCA / Mandiri / BNI</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-zinc-400">Virtual Account Number</span>
                    <span className="text-[#9d4edd] font-bold">8930 2003 1204 9011</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Account Owner</span>
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
                PROCEED TO PAYMENT {formatPrice(finalTotal)}
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121212] border border-zinc-800 rounded-3xl p-12 text-center space-y-6 flex flex-col items-center shadow-card-subtle"
            >
              <Loader2 className="w-10 h-10 text-[#9d4edd] animate-spin" />
              <div className="space-y-2">
                <h3 className="text-base font-bold uppercase text-white tracking-wide">
                  Processing Your Payment
                </h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  We are confirming your transaction and issuing your digital concert pass. Please do not close or refresh this browser window.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="lg:col-span-5 bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-card-subtle">
          <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
            <ShieldCheck className="w-5 h-5 text-[#9d4edd]" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Order Summary
            </h4>
          </div>

          {/* Show info */}
          <div className="flex gap-4 items-center">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 object-cover rounded-2xl border border-zinc-700"
            />
            <div>
              <h5 className="text-sm font-bold text-white uppercase line-clamp-1">{event.title}</h5>
              <span className="text-xs text-zinc-400 block">{event.subtitle}</span>
              <span className="text-xs font-semibold text-[#9d4edd] block mt-1">
                {booking.categoryName}
              </span>
            </div>
          </div>

          {/* Venue Detail */}
          <div className="border-t border-zinc-800 pt-4 space-y-2.5 text-xs font-medium">
            <div className="flex justify-between">
              <span className="text-zinc-400">Date</span>
              <span className="text-white">{formatDate(event.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Venue</span>
              <span className="text-white">{venue?.name}</span>
            </div>
            {booking.isSeated ? (
              <div className="flex justify-between">
                <span className="text-zinc-400">Seats</span>
                <span className="text-white font-bold">
                  {booking.seats.map((s) => `${s.row}-${s.seatNum}`).join(", ")}
                </span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-zinc-400">Quantity</span>
                <span className="text-white font-bold">{booking.quantity} tickets</span>
              </div>
            )}
          </div>

          {/* Pricing Breakdowns */}
          <div className="border-t border-zinc-800 pt-4 space-y-2.5 text-xs font-medium">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Service Fee</span>
              <span className="text-white">{formatPrice(adminFee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Tax (10%)</span>
              <span className="text-white">{formatPrice(governmentTax)}</span>
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t border-zinc-800 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Total Amount
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
