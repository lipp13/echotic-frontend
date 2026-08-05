"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Download, Share2, ShieldCheck, Ticket, User, ArrowLeft, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { apiGetOrder, isAuthenticated } from "@/lib/api";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import Decor3D from "@/components/ui/Decor3D";
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
    addToast("Generating premium ticket card PDF... Saved to Downloads!", "success");
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
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShieldCheck className="w-12 h-12 text-[#ff0055] mx-auto mb-4" />
        <h2 className="font-mono text-xl font-bold uppercase mb-2">Ticket Not Found</h2>
        <p className="font-mono text-zinc-500 text-xs mb-8">
          The booking confirmation ID could not be retrieved from the server.
        </p>
        <Link href="/events" data-cursor="pointer">
          <Button variant="primary">Browse Events</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-6 py-12 flex-grow"
    >
      {/* Back button */}
      <div className="mb-8 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Purchased Tickets</span>
        </Link>
        
        <span className="font-mono text-xs text-[#ccff00] font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>ORDER COMPLETED</span>
        </span>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Digital Ticket Card */}
        <div className="md:col-span-7 flex flex-col items-center">
          {/* Rotating Hologram Ticket Container */}
          <motion.div
            whileHover={{ rotateY: 5, rotateX: 2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl relative"
          >
            {/* Top aesthetic glow line */}
            <div className="h-[3px] bg-gradient-to-r from-[#ccff00] to-[#00f0ff]" />

            {/* Ticket Header */}
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/40">
              <div className="font-mono">
                <span className="text-[9px] text-[#ccff00] uppercase tracking-widest block font-bold">
                  Official Pass
                </span>
                <span className="text-white font-bold text-xs uppercase">ECHOTIC TICKETS</span>
              </div>
              <div className="text-right font-mono text-[9px] text-zinc-500">
                NO: {order.orderId}
              </div>
            </div>

            {/* Ticket Image & Headline Overlay */}
            <div className="relative aspect-[21/9] overflow-hidden border-b border-zinc-900 bg-zinc-900">
              <img
                src={order.eventImage}
                alt={order.eventTitle}
                className="object-cover w-full h-full grayscale opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight">
                  {order.eventTitle}
                </h3>
              </div>
            </div>

            {/* Ticket Body Content */}
            <div className="p-6 space-y-6 font-mono">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Attendee</span>
                  <span className="text-white font-bold uppercase truncate block">{order.attendeeName}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Gate Code</span>
                  <span className="text-[#00f0ff] font-bold block">{order.ticketCode}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Date & Time</span>
                  <span className="text-white block">{order.eventDate} @ {order.eventTime}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Pass Category</span>
                  <span className="text-[#ccff00] font-bold block uppercase">{order.categoryName}</span>
                </div>
              </div>

              {/* Seating detailed items */}
              {order.isSeated && (
                <div className="border-t border-zinc-900 pt-4 flex justify-between items-center text-xs">
                  <span className="text-[9px] text-zinc-500 uppercase">Allocated Seats</span>
                  <div className="flex gap-2">
                    {order.seats.map((s) => (
                      <span
                        key={s.id}
                        className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-white font-bold"
                      >
                        {s.row}-{s.seatNum}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ticket Footer / Barcode rip-off */}
            <div className="border-t border-dashed border-zinc-800 p-6 flex flex-col items-center bg-black/60 relative">
              {/* Circular cut notches on ticket sides */}
              <div className="absolute w-6 h-6 rounded-full bg-[#07070a] -left-3 top-[-12px] border-r border-zinc-800" />
              <div className="absolute w-6 h-6 rounded-full bg-[#07070a] -right-3 top-[-12px] border-l border-zinc-800" />

              {/* Barcode representation */}
              <div className="w-full flex items-center justify-center gap-1.5 h-10 mb-2 opacity-70">
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
              <span className="text-[9px] text-zinc-500 tracking-widest">{order.ticketCode}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: QR Gate scanning info */}
        <div className="md:col-span-5 bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6">
          <div className="text-center pb-4 border-b border-zinc-900">
            <Decor3D type="shield" className="w-10 h-10 mx-auto mb-2" />
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-1">
              GATE ADMISSION PASS
            </h4>
            <span className="text-[9px] text-zinc-500 uppercase font-mono">
              Scan this code at gates to enter venue
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center my-2">
            {order.status === "approved" || order.status === "used" ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>TERVERIFIKASI / DIPERSILAKAN MASUK</span>
              </div>
            ) : (
              <div className="bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                <span>MENUNGGU SCAN GATE ENTRY</span>
              </div>
            )}
          </div>

          {/* Glowing QR Code */}
          <div className="flex justify-center py-2">
            <QrCodeGenerator value={order.ticketCode} size={180} />
          </div>

          <div className="space-y-4 font-mono text-xs pt-4 border-t border-zinc-900">
            <div className="flex gap-2.5 text-zinc-400 leading-relaxed">
              <User className="w-4 h-4 text-[#ccff00] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-zinc-500 block uppercase">Gate Holder</span>
                <span className="text-white font-bold">{order.attendeeName} ({order.attendeeId})</span>
              </div>
            </div>
            <div className="flex gap-2.5 text-zinc-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#ff0055] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] text-zinc-500 block uppercase">Location</span>
                <span className="text-white">{order.venueName}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3 pt-6 border-t border-zinc-900">
            <Button
              variant="primary"
              onClick={handleDownload}
              className="w-full py-3.5 text-center justify-center font-mono text-xs"
              data-cursor="pointer"
            >
              <Download className="w-4 h-4 mr-2" /> DOWNLOAD PDF PASS
            </Button>
            <Button
              variant="secondary"
              onClick={handleShare}
              className="w-full py-3.5 text-center justify-center font-mono text-xs"
              data-cursor="pointer"
            >
              <Share2 className="w-4 h-4 mr-2" /> SHARE SECURED PASS
            </Button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
