"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, ShieldAlert, ArrowLeft, Users, ChevronRight, Share2, Loader2, Check } from "lucide-react";
import { apiGetEvent } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SeatMap from "@/components/sections/SeatMap";
import { useToast } from "@/components/ui/Toast";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  
  // Selection States
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const result = await apiGetEvent(params.id);
        if (result.success) {
          setEvent(result.data);
          // Default select first ticket category
          if (result.data.ticketCategories?.length > 0) {
            setSelectedCategory(result.data.ticketCategories[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 flex-grow">
        <Loader2 className="w-8 h-8 text-[#e5c158] animate-spin" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShieldAlert className="w-12 h-12 text-[#e5c158] mx-auto mb-4" />
        <h2 className="text-xl font-bold uppercase mb-2">Konser Tidak Ditemukan</h2>
        <p className="text-slate-400 text-xs mb-8">
          Jadwal konser yang Anda cari tidak ditemukan atau telah berakhir.
        </p>
        <Link href="/events" data-cursor="pointer">
          <Button variant="accent">Cari Konser Lain</Button>
        </Link>
      </div>
    );
  }

  const venue = event.venue;
  const artist = event.artist;

  // Handle seat map selections
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      addToast("Tautan konser berhasil disalin ke papan klip!", "info");
    }
  };

  const handleCheckoutRedirect = () => {
    // If seated, must select at least one seat
    if (event.seatingConfig?.hasSeatedMap) {
      if (selectedSeats.length === 0) {
        addToast("Silakan pilih minimal 1 kursi pada denah", "error");
        return;
      }
      
      const checkoutDetails = {
        eventId: event.id,
        categoryName: selectedSeats[0].sectionName,
        seats: selectedSeats.map((s) => ({
          row: s.row,
          seatNum: s.seatNum,
          id: s.id,
          price: s.price,
          sectionId: s.sectionId,
        })),
        totalPrice: selectedSeats.reduce((acc, curr) => acc + curr.price, 0),
        isSeated: true
      };
      
      localStorage.setItem("echotic_checkout_pending", JSON.stringify(checkoutDetails));
      router.push("/checkout");
    } else {
      // General Admission Checkout
      if (!selectedCategory) {
        addToast("Silakan pilih kategori tiket", "error");
        return;
      }

      const checkoutDetails = {
        eventId: event.id,
        categoryName: selectedCategory.name,
        categoryId: selectedCategory.id,
        quantity: ticketQuantity,
        totalPrice: selectedCategory.price * ticketQuantity,
        isSeated: false
      };
      
      localStorage.setItem("echotic_checkout_pending", JSON.stringify(checkoutDetails));
      router.push("/checkout");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow"
    >
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-semibold uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke katalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visual details, Artist, Venue Info */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Banner Graphic */}
          <div className="glass-panel-premium rounded-3xl overflow-hidden aspect-[16/9] relative group shadow-2xl">
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Tag Overlay */}
            <div className="absolute bottom-6 right-6 border border-white/15 bg-black/75 backdrop-blur-xl px-4 py-1.5 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-lg">
              TIKET RESMI KONSER
            </div>
          </div>

          {/* Titles & Meta */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block">
              {event.subtitle || "KONSER MUSIK LIVE"}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#e5c158]" />
                <span>{formatDate(event.date)} pukul {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e5c158]" />
                <span>{venue?.name}, {venue?.city}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 border-t border-white/10 pt-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Tentang Konser Ini
            </h4>
            <p className="text-sm leading-relaxed text-slate-300 font-normal">
              {event.description}
            </p>
          </div>

          {/* Location Map Embed */}
          {venue && (
            <div className="space-y-4 border-t border-white/10 pt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Lokasi & Alamat Venue
              </h4>
              <p className="text-xs text-slate-300">{venue.address}</p>
              
              <div className="glass-panel-premium rounded-2xl overflow-hidden aspect-[21/9]">
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert opacity-80"
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Ticket Buying Interface */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel-premium rounded-3xl p-6 md:p-8 relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
              <Ticket className="w-5 h-5 text-[#e5c158]" />
              <span>Pilih Kategori Tiket</span>
            </h3>

            {/* SEATED CONFIGURATION */}
            {event.seatingConfig?.hasSeatedMap ? (
              <div className="space-y-6">
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Konser ini menggunakan nomor kursi. Klik titik kursi yang diinginkan pada denah di bawah.
                </p>
                
                {/* Seating Map selector */}
                <SeatMap event={event} onSelectionChange={handleSeatSelection} />

                {/* Subtotal buy widget */}
                {selectedSeats.length > 0 ? (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <Button
                      variant="accent"
                      onClick={handleCheckoutRedirect}
                      className="w-full py-4 text-center justify-center font-bold text-sm"
                      data-cursor="pointer"
                    >
                      BELI TIKET ({selectedSeats.length}) <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ) : (
                  <div className="border border-white/10 rounded-2xl p-4 text-center text-xs text-slate-400 bg-white/5">
                    Pilih kursi Anda dari denah di atas
                  </div>
                )}
              </div>
            ) : (
              /* GENERAL ADMISSION */
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Pilih Kategori Tiket
                  </span>
                  
                  <div className="space-y-2.5">
                    {event.ticketCategories.map((cat) => {
                      const isSelected = selectedCategory?.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#e5c158]/15 border-[#e5c158] text-white shadow-md shadow-[#e5c158]/10"
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold uppercase">{cat.name}</h5>
                              {isSelected && <Check className="w-4 h-4 text-[#e5c158]" />}
                            </div>
                            <span className="text-xs text-slate-400">
                              Tersedia • sisa {cat.capacity - cat.sold} tiket
                            </span>
                          </div>
                          <span className={`text-sm font-bold ${isSelected ? "text-[#e5c158]" : "text-white"}`}>
                            {formatPrice(cat.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Counter */}
                <div className="flex justify-between items-center border-t border-white/10 pt-6">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Jumlah Tiket
                  </span>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/15 rounded-full px-4 py-1.5">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-6 text-slate-400 hover:text-white font-bold text-base text-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm text-white w-6 text-center">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(5, ticketQuantity + 1))}
                      className="w-6 text-slate-400 hover:text-white font-bold text-base text-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing subtotal */}
                {selectedCategory && (
                  <div className="border-y border-white/10 py-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-white">
                      {formatPrice(selectedCategory.price * ticketQuantity)}
                    </span>
                  </div>
                )}

                {/* Buy Button */}
                <Button
                  variant="accent"
                  onClick={handleCheckoutRedirect}
                  className="w-full py-4 text-center justify-center font-bold text-sm"
                  data-cursor="pointer"
                >
                  BELI TIKET SEKARANG →
                </Button>
              </div>
            )}

            {/* Guarantee and share */}
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400 font-medium">
              <span>Pemesanan Resmi EchoTic</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}


