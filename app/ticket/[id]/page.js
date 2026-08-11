"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Download, Share2, ShieldCheck, Ticket, User, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { apiGetOrder, isAuthenticated } from "@/lib/api";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import QrCodeGenerator from "@/components/ui/QrCodeGenerator";

export default function TicketConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!isAuthenticated()) {
        addToast("Please login to view your ticket", "error");
        router.push("/login");
        return;
      }

      try {
        const result = await apiGetOrder(params.id);
        if (result.success) {
          setOrder(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [params.id, router, addToast]);

  const handleDownload = () => {
    addToast("Saved Digital Pass to your Downloads!", "success");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      addToast("Ticket URL copied to clipboard!", "info");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 flex-grow">
        <Loader2 className="w-8 h-8 text-[#e5c158] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShieldCheck className="w-12 h-12 text-[#e5c158] mx-auto mb-4" />
        <h2 className="text-xl font-bold uppercase mb-2">Ticket Not Found</h2>
        <p className="text-slate-400 text-xs mb-8">
          The booking confirmation ID could not be retrieved.
        </p>
        <Link href="/events" data-cursor="pointer">
          <Button variant="accent">Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-6 md:px-10 py-12 flex-grow"
    >
      {/* Back button & status banner */}
      <div className="mb-8 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Purchased Passes</span>
        </Link>
        
        <span className="text-xs text-[#e5c158] font-bold flex items-center gap-1.5 bg-[#e5c158]/10 border border-[#e5c158]/30 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span>CONFIRMED PASS</span>
        </span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Digital Pass Graphic */}
        <div className="md:col-span-7 flex flex-col items-center">
          <motion.div
            whileHover={{ rotateY: 3, rotateX: 2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="w-full glass-panel-premium rounded-3xl overflow-hidden shadow-2xl relative"
          >
            {/* Top Gold Accent line */}
            <div className="h-1.5 bg-gradient-to-r from-[#f5d77f] via-[#e5c158] to-[#d4af37]" />

            {/* Ticket Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/30">
              <div>
                <span className="text-[10px] text-[#e5c158] uppercase tracking-widest block font-bold">
                  Concert Pass
                </span>
                <span className="text-white font-bold text-sm">ECHOTIC TICKETS</span>
              </div>
              <div className="text-right text-xs text-slate-400 font-mono">
                #{order.orderId}
              </div>
            </div>

            {/* Ticket Image */}
            <div className="relative aspect-[21/9] overflow-hidden border-b border-white/10 bg-white/5">
              <img
                src={order.eventImage}
                alt={order.eventTitle}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] to-transparent opacity-80" />
              <div className="absolute bottom-4 left-6">
                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  {order.eventTitle}
                </h3>
              </div>
            </div>

            {/* Ticket Body Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Attendee</span>
                  <span className="text-white font-bold truncate block">{order.attendeeName}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium font-mono">Pass Code</span>
                  <span className="text-[#e5c158] font-mono font-bold block">{order.ticketCode}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Date & Time</span>
                  <span className="text-white block">{order.eventDate} @ {order.eventTime}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Pass Tier</span>
                  <span className="text-[#e5c158] font-bold block uppercase">{order.categoryName}</span>
                </div>
              </div>

              {/* Seating detailed items */}
              {order.isSeated && (
                <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Seats</span>
                  <div className="flex gap-2">
                    {order.seats.map((s) => (
                      <span
                        key={s.id}
                        className="bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-full text-white font-bold font-mono"
                      >
                        {s.row}-{s.seatNum}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Barcode Tear-off */}
            <div className="border-t border-dashed border-white/15 p-6 flex flex-col items-center bg-black/40 relative">
              {/* Notches */}
              <div className="absolute w-6 h-6 rounded-full bg-[#060608] -left-3 top-[-12px] border-r border-white/10" />
              <div className="absolute w-6 h-6 rounded-full bg-[#060608] -right-3 top-[-12px] border-l border-white/10" />

              {/* Barcode */}
              <div className="w-full flex items-center justify-center gap-1.5 h-10 mb-2 opacity-80">
                {Array.from({ length: 35 }).map((_, idx) => {
                  const width = [1, 2, 3, 4][(idx * 7) % 4];
                  return (
                    <div
                      key={idx}
                      className="bg-white h-full"
                      style={{ width: `${width}px` }}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest">{order.ticketCode}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: QR Code & Gate Info */}
        <div className="md:col-span-5 glass-panel-premium rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="text-center pb-4 border-b border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Venue Admission QR
            </h4>
            <span className="text-xs text-slate-400">
              Present at gate for scanning
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center my-2">
            {order.status === "approved" || order.status === "used" ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ADMISSION VERIFIED</span>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-2">
                <Ticket className="w-4 h-4 text-[#e5c158]" />
                <span>READY FOR GATE SCAN</span>
              </div>
            )}
          </div>

          {/* QR Code */}
          <div className="flex justify-center py-3 bg-white p-4 rounded-2xl border border-slate-200 w-fit mx-auto shadow-md">
            <QrCodeGenerator value={order.ticketCode} size={180} />
          </div>

          <div className="space-y-3 text-xs pt-4 border-t border-white/10 font-medium">
            <div className="flex gap-2.5 text-slate-300">
              <User className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Ticket Holder</span>
                <span className="text-white font-bold">{order.attendeeName} ({order.attendeeId})</span>
              </div>
            </div>
            <div className="flex gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-[#e5c158] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Venue</span>
                <span className="text-white">{order.venueName}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-6 border-t border-white/10">
            <Button
              variant="accent"
              onClick={handleDownload}
              className="w-full py-3.5 text-center justify-center font-semibold text-xs"
              data-cursor="pointer"
            >
              <Download className="w-4 h-4 mr-2" /> SAVE DIGITAL PASS
            </Button>
            <Button
              variant="glass"
              onClick={handleShare}
              className="w-full py-3.5 text-center justify-center font-semibold text-xs"
              data-cursor="pointer"
            >
              <Share2 className="w-4 h-4 mr-2" /> SHARE PASS
            </Button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
