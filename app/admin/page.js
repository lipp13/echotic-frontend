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
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import {
  apiGetEvents,
  apiGetVenues,
  apiCreateEvent,
  apiUpdateEvent,
  apiDeleteEvent,
  getUserData,
  isAuthenticated,
} from "@/lib/api";

export default function AdminPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
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
      addToast("Akses ditolak. Perlu akun Administrator.", "error");
      router.push("/login");
      return;
    }

    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [eventsRes, venuesRes] = await Promise.all([
        apiGetEvents(),
        apiGetVenues(),
      ]);

      if (eventsRes.success) setEvents(eventsRes.data);
      if (venuesRes.success) setVenues(venuesRes.data);
    } catch (err) {
      addToast("Gagal memuat data event.", "error");
    } finally {
      setLoading(false);
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
    // Format date string to YYYY-MM-DD
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
        { name: "Category Baru", price: 500000, capacity: 500 },
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
      addToast("Harap isi Judul, Tanggal, dan URL Gambar.", "error");
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
            ? "Event baru berhasil ditambahkan!"
            : "Event berhasil diperbarui!",
          "success"
        );
        setIsModalOpen(false);
        fetchInitialData();
      } else {
        addToast(res.error || "Gagal menyimpan event.", "error");
      }
    } catch (err) {
      addToast("Terjadi kesalahan saat menyimpan event.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const res = await apiDeleteEvent(id);
      if (res.success) {
        addToast("Event berhasil dihapus.", "success");
        setDeletingId(null);
        fetchInitialData();
      } else {
        addToast(res.error || "Gagal menghapus event.", "error");
      }
    } catch (err) {
      addToast("Terjadi kesalahan sistem.", "error");
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
    <div className="min-h-screen text-white relative flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-cyan-500/30 bg-cyan-500/10 font-mono text-[10px] uppercase text-cyan-400 tracking-widest">
                <Shield className="w-3 h-3" />
                Admin Dashboard
              </span>
              <span className="font-mono text-xs text-zinc-500">
                {events.length} Total Events
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-mono font-black text-white tracking-tight">
              MANAJEMEN EVENT KONSER
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Tambah, perbarui detail, atur kategori tiket, atau hapus event konser platform EchoTic.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center justify-center gap-2 bg-[#ccff00] text-black font-mono font-bold text-xs uppercase tracking-widest px-6 py-3.5 hover:bg-[#b8e600] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Event Baru</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari judul event atau artis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 pl-11 pr-4 py-3 font-mono text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["all", "rock", "edm", "pop", "jazz", "indie", "metal"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedGenre === g
                    ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-900 hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Event List Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-zinc-900 bg-zinc-950">
            <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
            <span className="font-mono text-xs text-zinc-500">Memuat katalog event...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 border border-zinc-900 bg-zinc-950">
            <p className="font-mono text-sm text-zinc-500 mb-4">
              Tidak ada event yang cocok dengan pencarian "{search}".
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedGenre("all");
              }}
              className="font-mono text-xs text-[#ccff00] border border-[#ccff00]/20 bg-[#ccff00]/5 px-4 py-2 hover:bg-[#ccff00] hover:text-black transition-all"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="border border-zinc-900 bg-zinc-950 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-zinc-900/60 border-b border-zinc-900 text-zinc-400 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Event</th>
                  <th className="py-4 px-4">Genre</th>
                  <th className="py-4 px-4">Tanggal & Waktu</th>
                  <th className="py-4 px-4">Lokasi Venue</th>
                  <th className="py-4 px-4">Status Tag</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-zinc-900/40 transition-colors">
                    {/* Event Detail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.image_url}
                          alt={evt.title}
                          className="w-12 h-12 object-cover border border-zinc-800 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-sm line-clamp-1">
                            {evt.title}
                          </div>
                          <div className="text-zinc-500 text-[11px] line-clamp-1">
                            {evt.subtitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Genre */}
                    <td className="py-4 px-4">
                      <span className="uppercase px-2 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-bold">
                        {evt.genre}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Calendar className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span>{evt.date ? new Date(evt.date).toLocaleDateString("id-ID") : "-"}</span>
                      </div>
                      <div className="text-zinc-500 text-[10px] mt-0.5">
                        {evt.time}
                      </div>
                    </td>

                    {/* Venue */}
                    <td className="py-4 px-4">
                      <div className="text-zinc-300 font-medium">
                        {evt.venue_name || evt.venue_id}
                      </div>
                      <div className="text-zinc-500 text-[10px]">
                        {evt.venue_city || "Indonesia"}
                      </div>
                    </td>

                    {/* Badges */}
                    <td className="py-4 px-4">
                      <div className="flex gap-1.5">
                        {Boolean(evt.featured) && (
                          <span className="flex items-center gap-1 text-[10px] text-[#ccff00] bg-[#ccff00]/10 border border-[#ccff00]/30 px-2 py-0.5">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                        {Boolean(evt.trending) && (
                          <span className="flex items-center gap-1 text-[10px] text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5">
                            <Flame className="w-3 h-3" /> Trending
                          </span>
                        )}
                        {!evt.featured && !evt.trending && (
                          <span className="text-zinc-600 text-[10px]">Standard</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(evt)}
                          className="p-2 border border-zinc-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 transition-all cursor-pointer"
                          title="Edit Event"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(evt.id)}
                          className="p-2 border border-zinc-800 hover:border-red-500 hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
                          title="Hapus Event"
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
              className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl my-8 p-6 md:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-mono font-bold text-white mb-1 uppercase tracking-tight">
                {modalMode === "create" ? "➕ Tambah Event Konser" : "✏️ Edit Event Konser"}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mb-6">
                Isi rincian informasi konser dan kategori harga tiket di bawah ini.
              </p>

              <form onSubmit={handleSubmitForm} className="space-y-4 font-mono text-xs">
                {/* Title & Genre */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-zinc-400 mb-1">Judul Event *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. NEON FUTURE MASSIVE 2026"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Genre *</label>
                    <select
                      value={form.genre}
                      onChange={(e) => setForm({ ...form, genre: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none uppercase"
                    >
                      <option value="rock">Rock</option>
                      <option value="edm">EDM</option>
                      <option value="pop">Pop</option>
                      <option value="jazz">Jazz</option>
                      <option value="indie">Indie</option>
                      <option value="metal">Metal</option>
                    </select>
                  </div>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-zinc-400 mb-1">Subtitle / Lineup Highlights</label>
                  <input
                    type="text"
                    placeholder="e.g. Steve Aoki & Alesso Live in Jakarta"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                  />
                </div>

                {/* Date, Time, Venue */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Tanggal *</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Waktu *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 20:00 WIB"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Lokasi Venue *</label>
                    <select
                      value={form.venue_id}
                      onChange={(e) => setForm({ ...form, venue_id: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                    >
                      {venues.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.city})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Poster Image URL */}
                <div>
                  <label className="block text-zinc-400 mb-1">URL Gambar Poster *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                  />
                  {form.image_url && (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={form.image_url}
                        alt="Preview"
                        className="w-20 h-12 object-cover border border-zinc-800"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      <span className="text-[10px] text-zinc-500">Preview poster</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-zinc-400 mb-1">Deskripsi Lengkap</label>
                  <textarea
                    rows={3}
                    placeholder="Tuliskan detail acara konser..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-white focus:border-[#ccff00] outline-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6 py-2 border-y border-zinc-900">
                  <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="accent-[#ccff00] w-4 h-4"
                    />
                    <span>⭐ Featured Banner</span>
                  </label>

                  <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.trending}
                      onChange={(e) => setForm({ ...form, trending: e.target.checked })}
                      className="accent-orange-500 w-4 h-4"
                    />
                    <span>🔥 Trending Tag</span>
                  </label>
                </div>

                {/* Ticket Categories Section */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-zinc-300 font-bold uppercase tracking-wider">
                      Kategori Tiket & Harga
                    </label>
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="text-[#ccff00] border border-[#ccff00]/30 bg-[#ccff00]/10 px-2.5 py-1 text-[11px] hover:bg-[#ccff00] hover:text-black transition-all cursor-pointer"
                    >
                      + Tambah Kategori
                    </button>
                  </div>

                  <div className="space-y-2">
                    {form.categories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-2 items-center bg-zinc-900/60 p-2 border border-zinc-800"
                      >
                        <div className="col-span-5">
                          <input
                            type="text"
                            placeholder="Nama Kategori (VIP / Presale)"
                            value={cat.name}
                            onChange={(e) =>
                              handleCategoryChange(idx, "name", e.target.value)
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 px-2 py-1.5 text-white"
                          />
                        </div>

                        <div className="col-span-4">
                          <input
                            type="number"
                            placeholder="Harga (Rp)"
                            value={cat.price}
                            onChange={(e) =>
                              handleCategoryChange(idx, "price", e.target.value)
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 px-2 py-1.5 text-white"
                          />
                        </div>

                        <div className="col-span-2">
                          <input
                            type="number"
                            placeholder="Kapasitas"
                            value={cat.capacity}
                            onChange={(e) =>
                              handleCategoryChange(idx, "capacity", e.target.value)
                            }
                            className="w-full bg-zinc-950 border border-zinc-800 px-2 py-1.5 text-white"
                          />
                        </div>

                        <div className="col-span-1 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(idx)}
                            disabled={form.categories.length <= 1}
                            className="text-zinc-500 hover:text-red-400 disabled:opacity-30 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#ccff00] text-black font-bold uppercase hover:bg-[#b8e600] disabled:opacity-50 cursor-pointer flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{saving ? "Menyimpan..." : "Simpan Event"}</span>
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
              className="bg-zinc-950 border border-red-500/40 p-6 md:p-8 max-w-md w-full relative shadow-2xl text-center font-mono"
            >
              <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">HAPUS EVENT INI?</h3>
              <p className="text-xs text-zinc-400 mb-6">
                Tindakan ini tidak dapat dibatalkan. Seluruh data event dan kategori tiket terkait akan terhapus secara permanen.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-5 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDeleteEvent(deletingId)}
                  className="px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Ya, Hapus Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
