"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ticket, User, ShieldCheck, History, ArrowRight, Loader2, LogOut, Lock } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import { apiGetMyOrders, apiGetProfile, apiLogout, isAuthenticated, getUserData } from "@/lib/api";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export default function UserDashboardPage() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // active, past

  useEffect(() => {
    async function loadDashboard() {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const [profileResult, ordersResult] = await Promise.all([
          apiGetProfile(),
          apiGetMyOrders(),
        ]);

        if (profileResult.success) {
          setUser(profileResult.data);
        }

        if (ordersResult.success) {
          setOrders(ordersResult.data);
        }
      } catch (error) {
        console.error("Dashboard load error:", error);
        const localUser = getUserData();
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();

    const handleAuthChange = () => {
      if (!isAuthenticated()) {
        setUser(null);
        setOrders([]);
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = async () => {
    await apiLogout();
    setUser(null);
    setOrders([]);
    window.dispatchEvent(new Event("authChange"));
    addToast("Logged out successfully", "info");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 flex-grow">
        <Loader2 className="w-8 h-8 text-[#9d4edd] animate-spin" />
      </div>
    );
  }

  // Guest State - clean sign-in screen
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex-grow flex flex-col justify-center">
        <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-card-subtle">
          <Lock className="w-12 h-12 text-[#9d4edd] mx-auto" />
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold uppercase text-white">Sign In Required</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Please sign in to your EchoTic account to view your purchased tickets and passes.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Link href="/login" data-cursor="pointer">
              <Button variant="accent" className="w-full justify-center">
                SIGN IN SECURELY
              </Button>
            </Link>
            <Link href="/register" className="text-xs font-semibold text-zinc-400 hover:text-white underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders
  const activeOrders = orders.filter((o) => o.status === "active" || o.status === "approved");
  const pastOrders = orders.filter((o) => o.status === "used" || o.status === "expired");

  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex-grow"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-semibold text-[#9d4edd] tracking-wider uppercase block mb-1">
            User Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
            MY DASHBOARD.
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 px-4 py-2 rounded-full text-xs font-semibold text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-2 cursor-pointer"
          data-cursor="pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Profile overview */}
        <div className="lg:col-span-4 bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-card-subtle">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center justify-center font-bold text-xl text-[#9d4edd]">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase">{user.username}</h3>
              <span className="text-xs font-semibold bg-[#9d4edd]/15 text-[#9d4edd] px-2.5 py-0.5 rounded-full inline-block mt-1">
                Concert Goer
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs border-t border-zinc-800 pt-6 font-medium">
            <div className="flex justify-between">
              <span className="text-zinc-400">Email</span>
              <span className="text-white truncate max-w-[180px]">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Role</span>
              <span className="text-white uppercase">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Total Passes</span>
              <span className="text-[#9d4edd] font-bold">{orders.length} tickets</span>
            </div>
          </div>
        </div>

        {/* Right Side: Passes Feed */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section Navigation Tabs */}
          <div className="flex border-b border-zinc-800 gap-6 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 uppercase tracking-wider relative cursor-pointer ${
                activeTab === "active" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Active Passes ({activeOrders.length})
              {activeTab === "active" && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#9d4edd]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`pb-4 uppercase tracking-wider relative cursor-pointer ${
                activeTab === "past" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Past Shows ({pastOrders.length})
              {activeTab === "past" && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#9d4edd]" />
              )}
            </button>
          </div>

          {/* List display */}
          <div className="space-y-4">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-[#121212] border border-zinc-800 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card-subtle hover:border-zinc-700 transition-all"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={order.eventImage}
                      alt={order.eventTitle}
                      className="w-16 h-16 object-cover rounded-2xl border border-zinc-700 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white uppercase line-clamp-1">
                        {order.eventTitle}
                      </h4>
                      <span className="text-xs text-zinc-400 block">
                        {order.venueName} • {order.eventDate}
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full uppercase">
                          {order.categoryName}
                        </span>
                        {order.status === "approved" && (
                          <span className="text-[11px] font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                        {order.isSeated && (
                          <span className="text-[11px] font-semibold bg-[#9d4edd]/10 border border-[#9d4edd]/30 text-[#9d4edd] px-2.5 py-0.5 rounded-full uppercase">
                            Seats: {order.seats.map((s) => `${s.row}-${s.seatNum}`).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-2 border-t border-zinc-800 md:border-0 pt-4 md:pt-0">
                    <span className="text-sm font-bold text-white">
                      {formatPrice(order.totalPrice)}
                    </span>
                    
                    <Link href={`/ticket/${order.orderId}`} data-cursor="pointer">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5 font-semibold text-xs">
                        <Ticket className="w-3.5 h-3.5 text-[#9d4edd]" />
                        <span>VIEW PASS</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-12 text-center space-y-4 shadow-card-subtle">
                <Ticket className="w-8 h-8 text-zinc-600 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase text-white">
                    No tickets found
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed font-normal">
                    You don&apos;t have any ticket passes logged under this tab yet. Explore upcoming concerts in our directory.
                  </p>
                </div>
                <Link href="/events" data-cursor="pointer">
                  <Button variant="outline" size="sm" className="mt-2">
                    EXPLORE CONCERTS
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
