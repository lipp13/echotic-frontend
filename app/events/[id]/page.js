"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, ShieldAlert, ArrowLeft, Users, ChevronRight, Share2, Loader2 } from "lucide-react";
import { apiGetEvent } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import SeatMap from "@/components/sections/SeatMap";
import { useToast } from "@/components/ui/Toast";
import Decor3D from "@/components/ui/Decor3D";

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
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShieldAlert className="w-12 h-12 text-[#ff0055] mx-auto mb-4" />
        <h2 className="font-mono text-xl font-bold uppercase mb-2">Show Not Found</h2>
        <p className="font-mono text-zinc-500 text-xs mb-8">
          The requested event key does not exist or has expired.
        </p>
        <Link href="/events" data-cursor="pointer">
          <Button variant="primary">Browse Events</Button>
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
      addToast("Event link copied to clipboard!", "info");
    }
  };

  const handleCheckoutRedirect = () => {
    // If seated, must select at least one seat
    if (event.seatingConfig?.hasSeatedMap) {
      if (selectedSeats.length === 0) {
        addToast("Please select at least one seat from the map", "error");
        return;
      }
      
      // Store details in localStorage to pass to checkout
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
        addToast("Please select a ticket category", "error");
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
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 py-12 flex-grow"
    >
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to directory</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Visual details, Artist, Venue Info */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Banner Graphic */}
          <div className="border border-zinc-800 bg-zinc-950 p-2 overflow-hidden aspect-[16/9] relative group">
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Stamp Overlay */}
            <div className="absolute bottom-6 right-6 border border-[#ccff00]/60 bg-black/90 px-4 py-2 font-mono text-[9px] text-[#ccff00] uppercase tracking-widest">
              OFFICIAL HOSTED PASS
            </div>
          </div>

          {/* Titles & Meta */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase block">
              {event.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-900 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ccff00]" />
                <span>{formatDate(event.date)} at {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff0055]" />
                <span>{venue?.name}, {venue?.city}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 border-t border-zinc-900 pt-8">
            <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Event Abstract
            </h4>
            <p className="font-mono text-sm leading-relaxed text-zinc-300">
              {event.description}
            </p>
          </div>

          {/* Artist Bio */}
          {artist && (
            <div className="border border-zinc-900 bg-zinc-950/40 p-6 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#00f0ff]" />
                  <h4 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                    Featured Artist / Lineup
                  </h4>
                </div>
                <Decor3D type="mic" className="w-10 h-10" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover border border-zinc-800 grayscale"
                  />
                )}
                <div className="space-y-2">
                  <h5 className="font-mono text-sm font-bold text-white uppercase">{artist.name}</h5>
                  <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                    {artist.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Location Map Embed */}
          {venue && (
            <div className="space-y-4 border-t border-zinc-900 pt-8">
              <h4 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                Venue Location
              </h4>
              <p className="font-mono text-xs text-zinc-400">{venue.address}</p>
              
              <div className="border border-zinc-900 bg-zinc-950 p-1 aspect-[21/9] overflow-hidden">
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
          <div className="bg-zinc-950 border border-zinc-800 p-6 md:p-8 relative">
            {/* Corner visual accent */}
            <div className="absolute top-0 right-0 w-8 h-[2px] bg-[#ccff00]" />
            
            <h3 className="text-xl font-mono font-bold uppercase text-white mb-6 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#ccff00]" />
              <span>ACQUIRE GIG PASSES</span>
            </h3>

            {/* SEATED CONFIGURATION */}
            {event.seatingConfig?.hasSeatedMap ? (
              <div className="space-y-6">
                <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                  This show features reserved seating. Review the stage chart below, click your preferred rows, and click seats to select.
                </p>
                
                {/* Seating Map selector */}
                <SeatMap event={event} onSelectionChange={handleSeatSelection} />

                {/* Subtotal buy widget */}
                {selectedSeats.length > 0 ? (
                  <div className="space-y-4 pt-4 border-t border-zinc-900">
                    <Button
                      variant="primary"
                      onClick={handleCheckoutRedirect}
                      className="w-full py-4 text-center justify-center"
                      data-cursor="pointer"
                    >
                      SECURE SELECTED SEATS ({selectedSeats.length}) <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ) : (
                  <div className="border border-zinc-900 p-4 text-center text-xs font-mono text-zinc-600 bg-black/40">
                    Please select your seats above to checkout
                  </div>
                )}
              </div>
            ) : (
              /* GENERAL ADMISSION (Counter Selection) */
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Choose Tier
                  </span>
                  
                  <div className="space-y-2">
                    {event.ticketCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left p-4 border font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          selectedCategory?.id === cat.id
                            ? "bg-[#ccff00]/5 border-[#ccff00] text-white"
                            : "bg-black/60 border-zinc-900 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <div>
                          <h5 className="text-xs font-bold uppercase">{cat.name}</h5>
                          <span className="text-[9px] text-zinc-500">
                            Available • {cat.capacity - cat.sold} passes left
                          </span>
                        </div>
                        <span className={`text-xs font-bold ${selectedCategory?.id === cat.id ? "text-[#ccff00]" : "text-white"}`}>
                          {formatPrice(cat.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Counter */}
                <div className="flex justify-between items-center border-t border-zinc-900 pt-6">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Select Quantity
                  </span>

                  <div className="flex items-center gap-4 bg-black border border-zinc-900 px-3 py-1.5">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-6 text-zinc-500 hover:text-white font-black text-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-sm w-6 text-center text-white">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(5, ticketQuantity + 1))}
                      className="w-6 text-zinc-500 hover:text-white font-black text-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pricing subtotal */}
                {selectedCategory && (
                  <div className="border-y border-zinc-900 py-4 flex justify-between items-center font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-lg font-black text-[#ccff00]">
                      {formatPrice(selectedCategory.price * ticketQuantity)}
                    </span>
                  </div>
                )}

                {/* Buy Button */}
                <Button
                  variant="primary"
                  onClick={handleCheckoutRedirect}
                  className="w-full py-4 text-center justify-center"
                  data-cursor="pointer"
                >
                  SECURE PASSES ({ticketQuantity}) <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Guarantee and share */}
            <div className="mt-6 pt-6 border-t border-zinc-900 flex justify-between items-center font-mono text-[9px] text-zinc-600">
              <span>✓ ENCRYPTED GATEWAY</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE SHOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
