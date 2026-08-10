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
  const [genres, setGenres] = useState([{ id: "all", name: "All Genres" }]);

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
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex-grow">
      {/* Header Statement */}
      <div className="mb-12">
        <span className="text-xs font-semibold text-[#9d4edd] tracking-wider uppercase block mb-2">
          Concert Directory
        </span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
          EXPLORE ALL EVENTS.
        </h1>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl">
          Discover live music performances from legendary world tours to intimate live acoustic sessions.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search artists, venues, concerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-zinc-800 focus:border-[#9d4edd] rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Genre Selector */}
        <div className="lg:col-span-3 flex items-center bg-[#121212] border border-zinc-800 rounded-2xl px-4">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500 mr-2.5 flex-shrink-0" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer uppercase tracking-wider"
          >
            {genres.map((g) => (
              <option key={g.id} value={g.id} className="bg-[#121212] text-white">
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Selector */}
        <div className="lg:col-span-3 flex items-center bg-[#121212] border border-zinc-800 rounded-2xl px-4">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500 mr-2.5 flex-shrink-0" />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer uppercase tracking-wider"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="bg-[#121212] text-white">
                {city === "all" ? "All Locations" : city.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Selector */}
        <div className="lg:col-span-2 flex items-center bg-[#121212] border border-zinc-800 rounded-2xl px-4">
          <ArrowUpDown className="w-4 h-4 text-zinc-500 mr-2.5 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-0 text-xs font-semibold text-white focus:outline-none w-full py-3 cursor-pointer uppercase tracking-wider"
          >
            <option value="default" className="bg-[#121212] text-white">DEFAULT SORT</option>
            <option value="price-low" className="bg-[#121212] text-white">PRICE: LOW - HIGH</option>
            <option value="price-high" className="bg-[#121212] text-white">PRICE: HIGH - LOW</option>
            <option value="date-new" className="bg-[#121212] text-white">DATE: SOONEST</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(searchTerm || selectedGenre !== "all" || selectedCity !== "all" || sortBy !== "default") && (
        <div className="flex flex-wrap items-center gap-2.5 mb-10 text-xs font-medium">
          <span className="text-zinc-500">Active Filters:</span>
          {searchTerm && (
            <span className="bg-zinc-900 border border-zinc-700/80 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              Query: &quot;{searchTerm}&quot;
              <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white cursor-pointer" onClick={() => setSearchTerm("")} />
            </span>
          )}
          {selectedGenre !== "all" && (
            <span className="bg-[#9d4edd]/20 border border-[#9d4edd]/50 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              Genre: {selectedGenre.toUpperCase()}
              <X className="w-3.5 h-3.5 text-zinc-300 hover:text-white cursor-pointer" onClick={() => setSelectedGenre("all")} />
            </span>
          )}
          {selectedCity !== "all" && (
            <span className="bg-zinc-900 border border-zinc-700/80 px-3 py-1 rounded-full flex items-center gap-2 text-white">
              City: {selectedCity.toUpperCase()}
              <X className="w-3.5 h-3.5 text-zinc-400 hover:text-white cursor-pointer" onClick={() => setSelectedCity("all")} />
            </span>
          )}
          <button
            onClick={handleClearFilters}
            className="text-zinc-400 hover:text-white underline cursor-pointer ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-[#9d4edd] animate-spin" />
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
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
            >
              <Card event={event} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-4">
          <Compass className="w-10 h-10 text-zinc-600 mb-2" />
          <h3 className="text-base font-bold text-white uppercase tracking-wide">
            No Concerts Found
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            We couldn&apos;t find any upcoming shows matching your search filters. Try adjusting your query or resetting filters.
          </p>
          <Button variant="outline" size="sm" onClick={handleClearFilters} className="mt-2">
            Reset Filters
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
        <Loader2 className="w-8 h-8 text-[#9d4edd] animate-spin" />
      </div>
    }>
      <EventsContent />
    </Suspense>
  );
}
