"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowUpDown, X, Loader2, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { apiGetEvents, apiGetGenres } from "@/lib/api";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

function EventsContent() {
  const searchParams = useSearchParams();
  
  // States for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [genres, setGenres] = useState([{ id: "all", name: "Semua Genre" }]);

  // Sync with URL query params if any
  useEffect(() => {
    const search = searchParams.get("search");
    const genre = searchParams.get("genre");
    if (search) setSearchTerm(search);
    if (genre) setSelectedGenre(genre);
  }, [searchParams]);

  // Fetch genres on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const result = await apiGetGenres();
        if (result.success) {
          setGenres(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    }
    fetchGenres();
  }, []);

  // Unique cities list
  const cities = ["all", "Jakarta", "Bandung"];

  // Fetch events from API
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiGetEvents({
        search: searchTerm,
        genre: selectedGenre,
        city: selectedCity,
        sort: sortBy,
      });

      if (result.success) {
        setEvents(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedGenre, selectedCity, sortBy]);

  // Debounce search, immediate for filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchEvents]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("all");
    setSelectedCity("all");
    setSortBy("default");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow">
      {/* Header Statement */}
      <div className="mb-10">
        <span className="text-xs font-bold text-[#e5c158] tracking-widest uppercase block mb-2">
          Katalog Konser Musik
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Jelajahi Semua Konser.
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-xl">
          Temukan pertunjukan musik live dari tur stadion spektakuler hingga sesi akustik intim.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Cari nama konser, artis, lokasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 focus:border-[#e5c158] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors backdrop-blur-md"
          />
        </div>

        {/* Genre Selector */}
        <div className="lg:col-span-3 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 backdrop-blur-md">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer tracking-wide"
          >
            {genres.map((g) => (
              <option key={g.id} value={g.id} className="bg-[#0d0e14] text-white">
                {g.id === "all" ? "Semua Genre" : g.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Selector */}
        <div className="lg:col-span-3 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 backdrop-blur-md">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer tracking-wide"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="bg-[#0d0e14] text-white">
                {city === "all" ? "Semua Kota" : city.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Selector */}
        <div className="lg:col-span-2 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 backdrop-blur-md">
          <ArrowUpDown className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer tracking-wide"
          >
            <option value="default" className="bg-[#0d0e14] text-white">URUTAN DEFAULT</option>
            <option value="price-low" className="bg-[#0d0e14] text-white">HARGA: TERMURAH</option>
            <option value="price-high" className="bg-[#0d0e14] text-white">HARGA: TERMAHAL</option>
            <option value="date-new" className="bg-[#0d0e14] text-white">TANGGAL: TERDEKAT</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(searchTerm || selectedGenre !== "all" || selectedCity !== "all" || sortBy !== "default") && (
        <div className="flex flex-wrap items-center gap-2.5 mb-10 text-xs font-medium">
          <span className="text-slate-400">Filter Aktif:</span>
          {searchTerm && (
            <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              Cari: &quot;{searchTerm}&quot;
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" onClick={() => setSearchTerm("")} />
            </span>
          )}
          {selectedGenre !== "all" && (
            <span className="bg-[#e5c158]/20 border border-[#e5c158]/40 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              Genre: {selectedGenre.toUpperCase()}
              <X className="w-3.5 h-3.5 text-slate-300 hover:text-white cursor-pointer" onClick={() => setSelectedGenre("all")} />
            </span>
          )}
          {selectedCity !== "all" && (
            <span className="bg-white/10 border border-white/15 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              Kota: {selectedCity.toUpperCase()}
              <X className="w-3.5 h-3.5 text-slate-400 hover:text-white cursor-pointer" onClick={() => setSelectedCity("all")} />
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-slate-400 hover:text-white underline cursor-pointer ml-2"
          >
            Hapus Semua
          </button>
        </div>
      )}

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-[#e5c158] animate-spin" />
        </div>
      ) : events.length > 0 ? (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.06
              }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
            >
              <Card event={event} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="glass-panel-premium rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-4">
          <Compass className="w-10 h-10 text-slate-500 mb-2" />
          <h3 className="text-base font-bold text-white uppercase tracking-wide">
            Konser Tidak Ditemukan
          </h3>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Kami tidak dapat menemukan jadwal konser yang sesuai dengan kata kunci Anda. Coba reset filter.
          </p>
          <Button variant="outline" size="sm" onClick={handleClearFilters} className="mt-2">
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-8 h-8 text-[#e5c158] animate-spin" />
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}


