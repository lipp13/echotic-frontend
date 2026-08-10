"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Shield,
  ArrowLeft,
  X,
  Check,
  AlertTriangle,
  Loader2,
  Sparkles,
  Flame,
  QrCode,
  Scan,
  CheckCircle2,
  XCircle,
  Ticket,
  User,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import {
  apiGetEvents,
  apiGetVenues,
  apiCreateEvent,
  apiUpdateEvent,
  apiDeleteEvent,
  apiVerifyTicket,
  apiApproveTicketEntry,
  apiGetAdminStats,
  getUserData,
  isAuthenticated,
} from "@/lib/api";
import QrCodeGenerator from "@/components/ui/QrCodeGenerator";
import CameraQrScanner from "@/components/admin/CameraQrScanner";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Tab State: 'events' or 'scanner'
  const [activeTab, setActiveTab] = useState("events");

  // QR Scanner & Gate Verification State
  const [scannerInput, setScannerInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [approving, setApproving] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [verifyError, setVerifyError] = useState(null);
  const [adminStats, setAdminStats] = useState({
    totalOrders: 0,
    totalTicketsSold: 0,
    checkedInCount: 0,
    pendingCount: 0,
  });

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [form, setForm] = useState({
    id: "",
    title: "",
    subtitle: "",
    genre: "rock",
    date: "",
    time: "20:00 WIB",
    venue_id: "jiexpo",
    image_url: "",
    featured: false,
    trending: false,
    description: "",
    categories: [
      { name: "General Admission", price: 500000, capacity: 1000 },
    ],
  });

  useEffect(() => {
    // Check Admin Privileges
    const user = getUserData();
    if (!isAuthenticated() || !user || user.role !== "admin") {
      addToast("Access restricted. Admin credentials required.", "error");
      router.push("/login");
      return;
    }

    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [eventsRes, venuesRes, statsRes] = await Promise.all([
        apiGetEvents(),
        apiGetVenues(),
        apiGetAdminStats().catch(() => ({ success: false })),
      ]);

      if (eventsRes.success) setEvents(eventsRes.data);
      if (venuesRes.success) setVenues(venuesRes.data);
      if (statsRes.success) setAdminStats(statsRes.data);
    } catch (err) {
      addToast("Failed to load initial admin data.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchStats = async () => {
    try {
      const res = await apiGetAdminStats();
      if (res.success) {
        setAdminStats(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerifyTicket = async (e) => {
    if (e) e.preventDefault();
    if (!scannerInput.trim()) {
      addToast("Enter a ticket code or scan QR.", "error");
      return;
    }

    setVerifying(true);
    setVerifyError(null);
    setTicketInfo(null);

    try {
      const res = await apiVerifyTicket(scannerInput.trim());
      if (res.success) {
        setTicketInfo(res.data);
        if (res.data.isAlreadyScanned) {
          addToast("Warning: Ticket has already been scanned!", "info");
        } else {
          addToast("Valid pass! Ready for gate entry authorization.", "success");
        }
      }
    } catch (err) {
      setVerifyError(err.error || "Ticket code not found.");
      addToast(err.error || "Ticket not found.", "error");
    } finally {
      setVerifying(false);
    }
  };

  const handleApproveTicket = async (codeToApprove) => {
    const code = codeToApprove || ticketInfo?.ticketCode || scannerInput;
    if (!code) return;

    setApproving(true);
    try {
      const res = await apiApproveTicketEntry(code);
      if (res.success) {
        addToast(res.message || "Entry Approved!", "success");
        if (ticketInfo) {
          setTicketInfo({
            ...ticketInfo,
            status: "approved",
            isAlreadyScanned: true,
            canApprove: false,
            scannedAt: res.data.scannedAt,
          });
        }
        handleFetchStats();
      }
    } catch (err) {
      addToast(err.error || "Gate entry authorization failed.", "error");
    } finally {
      setApproving(false);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setForm({
      id: "",
      title: "",
      subtitle: "",
      genre: "rock",
      date: new Date().toISOString().split("T")[0],
      time: "20:00 WIB",
      venue_id: venues[0]?.id || "jiexpo",
      image_url:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
      featured: false,
      trending: false,
      description: "",
      categories: [
        { name: "VIP Experience", price: 1500000, capacity: 200 },
        { name: "General Admission", price: 650000, capacity: 1500 },
      ],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (evt) => {
    setModalMode("edit");
    const dateStr = evt.date ? new Date(evt.date).toISOString().split("T")[0] : "";
    setForm({
      id: evt.id,
      title: evt.title || "",
      subtitle: evt.subtitle || "",
      genre: evt.genre || "rock",
      date: dateStr,
      time: evt.time || "20:00 WIB",
      venue_id: evt.venue_id || venues[0]?.id || "jiexpo",
      image_url: evt.image_url || "",
      featured: Boolean(evt.featured),
      trending: Boolean(evt.trending),
      description: evt.description || "",
      categories: evt.categories && evt.categories.length > 0
        ? evt.categories.map((c) => ({
            id: c.id,
            name: c.name,
            price: parseFloat(c.price),
            capacity: parseInt(c.capacity),
          }))
        : [{ name: "General Admission", price: 500000, capacity: 1000 }],
    });
    setIsModalOpen(true);
  };

  const handleCategoryChange = (index, field, value) => {
    const updated = [...form.categories];
    updated[index][field] = value;
    setForm({ ...form, categories: updated });
  };

  const handleAddCategory = () => {
    setForm({
      ...form,
      categories: [
        ...form.categories,
        { name: "New Category", price: 500000, capacity: 500 },
      ],
    });
  };

  const handleRemoveCategory = (index) => {
    if (form.categories.length <= 1) return;
    const updated = form.categories.filter((_, i) => i !== index);
    setForm({ ...form, categories: updated });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.image_url) {
      addToast("Please fill in Title, Date, and Image URL.", "error");
      return;
    }

    setSaving(true);
    try {
      let res;
      if (modalMode === "create") {
        res = await apiCreateEvent(form);
      } else {
        res = await apiUpdateEvent(form.id, form);
      }

      if (res.success) {
        addToast(
          modalMode === "create"
            ? "New event created!"
            : "Event updated successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchInitialData();
      } else {
        addToast(res.error || "Failed to save event.", "error");
      }
    } catch (err) {
      addToast("An error occurred while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const res = await apiDeleteEvent(id);
      if (res.success) {
        addToast("Event deleted.", "success");
        setDeletingId(null);
        fetchInitialData();
      } else {
        addToast(res.error || "Failed to delete event.", "error");
      }
    } catch (err) {
      addToast("System error occurred.", "error");
    }
  };

  const filteredEvents = events.filter((evt) => {
    const matchSearch =
      evt.title?.toLowerCase().includes(search.toLowerCase()) ||
      evt.subtitle?.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === "all" || evt.genre === selectedGenre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="min-h-screen text-white relative flex flex-col font-sans bg-[#080808]">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-10 pt-10 pb-20">
        {/* Main Tab Navigation */}
        <div className="flex border-b border-zinc-800 mb-10 gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "events"
                ? "border-[#9d4edd] text-[#9d4edd]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Event Management ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer whitespace-nowrap ${
              activeTab === "scanner"
                ? "border-[#9d4edd] text-[#9d4edd]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>Gate Entry & Scanner</span>
            <span className="bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/30 text-[10px] px-2.5 py-0.5 rounded-full font-bold ml-1">
              LIVE CONTROL
            </span>
          </button>
        </div>

        {/* TAB 2: GATE ENTRY & SCANNER QR */}
        {activeTab === "scanner" && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#121212] border border-zinc-800 p-6 rounded-3xl shadow-card-subtle">
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block mb-1">Total Passes Sold</span>
                <div className="text-3xl font-black text-white">{adminStats.totalTicketsSold || 0}</div>
              </div>

              <div className="bg-[#121212] border border-emerald-500/30 p-6 rounded-3xl shadow-card-subtle">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block mb-1">Gate Checked-In</span>
                <div className="text-3xl font-black text-emerald-400">{adminStats.checkedInCount || 0}</div>
              </div>

              <div className="bg-[#121212] border border-amber-500/30 p-6 rounded-3xl shadow-card-subtle">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">Awaiting Gate Scan</span>
                <div className="text-3xl font-black text-amber-300">{adminStats.pendingCount || 0}</div>
              </div>

              <div className="bg-[#121212] border border-zinc-800 p-6 rounded-3xl flex flex-col justify-between shadow-card-subtle">
                <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Live Updates</span>
                <button
                  onClick={handleFetchStats}
                  className="mt-3 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Stats</span>
                </button>
              </div>
            </div>

            {/* Live Camera Scanner */}
            <CameraQrScanner
              onScanSuccess={(decodedText) => {
                setScannerInput(decodedText);
                handleApproveTicket(decodedText);
              }}
            />

            {/* Manual Code Input & Fallback Box */}
            <div className="bg-[#121212] border border-zinc-800 p-8 rounded-3xl shadow-card-subtle">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9d4edd]/10 border border-[#9d4edd]/30 text-[#9d4edd] text-xs font-bold uppercase rounded-full">
                    <Scan className="w-4 h-4" />
                    <span>Manual Gate Lookup</span>
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase">
                    Manual Ticket Code Entry
                  </h2>
                  <p className="text-zinc-400 text-xs font-normal">
                    Enter ticket code (e.g. <code className="text-[#9d4edd] font-mono">TKT-XXXXXX</code>) to verify and authorize gate entry.
                  </p>
                </div>

                <form onSubmit={handleVerifyTicket} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <QrCode className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Enter ticket code (TKT-XXXXXX)..."
                      value={scannerInput}
                      onChange={(e) => setScannerInput(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#9d4edd] transition-colors uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={verifying}
                    className="bg-[#9d4edd] hover:bg-[#b565f7] text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#9d4edd]/20 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {verifying ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>VERIFY PASS</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Verification Result Card */}
            {ticketInfo && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-3xl bg-[#121212] p-8 space-y-6 font-sans shadow-card-subtle ${
                  ticketInfo.isAlreadyScanned
                    ? "border-red-500/40"
                    : "border-[#9d4edd]/50"
                }`}
              >
                {/* Status Banner */}
                <div
                  className={`p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    ticketInfo.isAlreadyScanned
                      ? "bg-red-950/80 border border-red-800 text-red-300"
                      : "bg-emerald-950/80 border border-emerald-800 text-emerald-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ticketInfo.isAlreadyScanned ? (
                      <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                    )}
                    <div>
                      <h3 className="font-bold text-sm md:text-base uppercase tracking-wide">
                        {ticketInfo.isAlreadyScanned
                          ? "ALREADY SCANNED / USED TICKET"
                          : "VALID TICKET — READY FOR AUTHORIZATION"}
                      </h3>
                      <p className="text-xs opacity-80 mt-0.5">
                        {ticketInfo.isAlreadyScanned
                          ? `Scanned at: ${new Date(ticketInfo.scannedAt).toLocaleString()}`
                          : "Attendee ID verified. Authorize gate entry below."}
                      </p>
                    </div>
                  </div>

                  {!ticketInfo.isAlreadyScanned && (
                    <button
                      onClick={() => handleApproveTicket(ticketInfo.ticketCode)}
                      disabled={approving}
                      className="bg-[#9d4edd] hover:bg-[#b565f7] text-white font-bold text-xs uppercase px-6 py-3 rounded-full transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                    >
                      {approving ? "PROCESSING..." : "AUTHORIZE ENTRY"}
                    </button>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800 text-xs font-medium">
                  <div className="space-y-3">
                    <h4 className="text-xs text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-800 pb-2">
                      ATTENDEE DETAILS
                    </h4>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Name</span>
                      <span className="text-white font-bold text-sm uppercase">{ticketInfo.attendeeName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">National ID</span>
                      <span className="text-white font-mono">{ticketInfo.attendeeId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Email</span>
                      <span className="text-zinc-300">{ticketInfo.attendeeEmail}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs text-zinc-400 uppercase font-bold tracking-wider border-b border-zinc-800 pb-2">
                      CONCERT PASS DETAILS
                    </h4>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Concert Title</span>
                      <span className="text-[#9d4edd] font-bold text-sm uppercase">{ticketInfo.eventTitle}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Pass Category</span>
                      <span className="text-white font-bold uppercase">{ticketInfo.categoryName} ({ticketInfo.quantity} Pass)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Venue & Date</span>
                      <span className="text-zinc-300">{ticketInfo.venueName} — {ticketInfo.eventDate} ({ticketInfo.eventTime})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {/* TAB 1: EVENT MANAGEMENT */}
        {activeTab === "events" && (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8 mb-8">
              <div>
                <span className="text-xs font-semibold text-[#9d4edd] tracking-wider uppercase block mb-1">
                  Management Console
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
                  EVENT DIRECTORY.
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                  Create, edit, or manage concert offerings across EchoTic platform.
                </p>
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center gap-2 bg-[#9d4edd] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#b565f7] transition-all cursor-pointer shadow-lg shadow-[#9d4edd]/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search concert title or artist..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#121212] border border-zinc-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#9d4edd] transition-colors"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                {["all", "rock", "edm", "pop", "jazz", "indie", "metal"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap rounded-full cursor-pointer ${
                      selectedGenre === g
                        ? "bg-[#9d4edd] text-white"
                        : "bg-[#121212] text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Event List Table */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 border border-zinc-800 bg-[#121212] rounded-3xl">
                <Loader2 className="w-8 h-8 text-[#9d4edd] animate-spin" />
                <span className="text-xs text-zinc-400 font-medium">Loading events...</span>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-20 border border-zinc-800 bg-[#121212] rounded-3xl">
                <p className="text-sm text-zinc-400 mb-4">
                  No events found matching "{search}".
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedGenre("all");
                  }}
                  className="text-xs font-semibold text-[#9d4edd] underline cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="border border-zinc-800 bg-[#121212] rounded-3xl overflow-hidden shadow-card-subtle">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-6">Event</th>
                        <th className="py-4 px-4">Genre</th>
                        <th className="py-4 px-4">Date & Time</th>
                        <th className="py-4 px-4">Venue</th>
                        <th className="py-4 px-4">Tags</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-zinc-300 font-medium">
                      {filteredEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={evt.image_url}
                                alt={evt.title}
                                className="w-12 h-12 object-cover rounded-xl border border-zinc-700 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-white text-sm line-clamp-1">
                                  {evt.title}
                                </div>
                                <div className="text-zinc-400 text-xs line-clamp-1">
                                  {evt.subtitle}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="uppercase px-2.5 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-[10px] text-zinc-300 font-bold">
                              {evt.genre}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5 text-zinc-300">
                              <Calendar className="w-3.5 h-3.5 text-[#9d4edd]" />
                              <span>{evt.date ? new Date(evt.date).toLocaleDateString("en-US") : "-"}</span>
                            </div>
                            <div className="text-zinc-500 text-[10px] mt-0.5">
                              {evt.time}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="text-white font-semibold">
                              {evt.venue_name || evt.venue_id}
                            </div>
                            <div className="text-zinc-400 text-[10px]">
                              {evt.venue_city || "Indonesia"}
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex gap-1.5">
                              {Boolean(evt.featured) && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-[#9d4edd] bg-[#9d4edd]/10 border border-[#9d4edd]/30 px-2 py-0.5 rounded-full">
                                  Featured
                                </span>
                              )}
                              {Boolean(evt.trending) && (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
                                  Trending
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditModal(evt)}
                                className="p-2 border border-zinc-700 hover:border-[#9d4edd] hover:text-[#9d4edd] text-zinc-400 rounded-xl transition-all cursor-pointer"
                                title="Edit Event"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingId(evt.id)}
                                className="p-2 border border-zinc-700 hover:border-red-500 hover:text-red-400 text-zinc-400 rounded-xl transition-all cursor-pointer"
                                title="Delete Event"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121212] border border-zinc-800 rounded-3xl w-full max-w-2xl my-8 p-6 md:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">
                {modalMode === "create" ? "Create New Concert" : "Edit Concert Details"}
              </h2>
              <p className="text-xs text-zinc-400 mb-6 font-normal">
                Fill in the event information and ticket pricing categories below.
              </p>

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-zinc-300 uppercase font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="E.g. World Tour 2026"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-zinc-300 uppercase font-semibold">Genre</label>
                    <select
                      value={form.genre}
                      onChange={(e) => setForm({ ...form, genre: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                    >
                      {["rock", "edm", "pop", "jazz", "indie", "metal"].map((g) => (
                        <option key={g} value={g}>{g.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-300 uppercase font-semibold">Subtitle / Artist</label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="E.g. Live in Jakarta"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-zinc-300 uppercase font-semibold">Date</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-zinc-300 uppercase font-semibold">Time</label>
                    <input
                      type="text"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      placeholder="20:00 WIB"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-300 uppercase font-semibold">Venue</label>
                  <select
                    value={form.venue_id}
                    onChange={(e) => setForm({ ...form, venue_id: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                  >
                    {venues.map((v) => (
                      <option key={v.id} value={v.id}>{v.name} ({v.city})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-300 uppercase font-semibold">Artwork Image URL</label>
                  <input
                    type="url"
                    required
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-300 uppercase font-semibold">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#9d4edd]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex justify-end gap-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-full bg-[#9d4edd] text-white font-bold hover:bg-[#b565f7] transition-colors"
                  >
                    {saving ? "Saving..." : "Save Event"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121212] border border-zinc-800 rounded-3xl w-full max-w-md p-6 text-center space-y-4 shadow-2xl"
            >
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
              <h3 className="text-base font-bold text-white uppercase">Confirm Delete</h3>
              <p className="text-xs text-zinc-400">Are you sure you want to remove this concert from the directory?</p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-5 py-2 rounded-full border border-zinc-700 text-zinc-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(deletingId)}
                  className="px-5 py-2 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
