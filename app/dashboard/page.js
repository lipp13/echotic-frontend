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
import Decor3D from "@/components/ui/Decor3D";

export default function UserDashboardPage() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // active, past

  useEffect(() => {
    async function loadDashboard() {
      // Check if authenticated
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile and orders in parallel
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
        // If auth fails, user data from localStorage
        const localUser = getUserData();
        if (localUser) {
          setUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();

    // Listen for auth changes
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
        <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
      </div>
    );
  }

  // Guest State - styled lock screen
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center flex-grow flex flex-col justify-center">
        <div className="border border-zinc-800 bg-zinc-950 p-8 space-y-6 relative">
          <div className="absolute top-0 right-10 w-8 h-[2px] bg-[#ff0055]" />
          
          <Lock className="w-12 h-12 text-[#ff0055] mx-auto" />
          
          <div className="space-y-2">
            <h2 className="font-mono text-xl font-bold uppercase text-white">ACCESS BLOCKED</h2>
            <p className="font-mono text-xs text-zinc-500 leading-relaxed">
              You must authenticate your credentials to enter the tickets vault and purchase dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link href="/login" data-cursor="pointer">
              <Button variant="primary" className="w-full justify-center">
                SIGN IN SECURELY
              </Button>
            </Link>
            <Link href="/register" className="font-mono text-xs text-zinc-400 hover:text-white uppercase underline" data-cursor="pointer">
              Create a free account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter orders
  const activeOrders = orders.filter((o) => o.status === "active");
  const pastOrders = orders.filter((o) => o.status === "used" || o.status === "expired");

  const displayedOrders = activeTab === "active" ? activeOrders : pastOrders;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-6 py-12 flex-grow"
    >
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-900 pb-8">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase block mb-1">
              Personal Center
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
              VANGUARD HUB.
            </h1>
          </div>
          <Decor3D type="shield" className="w-14 h-14 md:w-16 md:h-16" />
        </div>

        <button
          onClick={handleLogout}
          className="border border-zinc-800 hover:border-[#ff0055]/30 hover:bg-[#ff0055]/5 px-4 py-2 font-mono text-xs text-zinc-400 hover:text-[#ff0055] transition-all flex items-center gap-2 cursor-pointer"
          data-cursor="pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Dashboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Profile overview */}
        <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 p-6 md:p-8 space-y-6 relative">
          {/* Highlight indicator */}
          <div className="absolute top-0 left-0 w-[3px] h-full bg-[#ccff00]" />

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xl font-bold text-[#ccff00]">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="font-mono">
              <h3 className="text-sm font-bold text-white uppercase">{user.username}</h3>
              <span className="text-[9px] bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] px-2 py-0.5 uppercase tracking-wider">
                Vanguard VIP
              </span>
            </div>
          </div>

          <div className="space-y-4 font-mono text-xs border-t border-zinc-900 pt-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">Security Email</span>
              <span className="text-white truncate max-w-[200px]">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Membership Tier</span>
              <span className="text-white">LEVEL 01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Purchases logged</span>
              <span className="text-[#00f0ff] font-bold">{orders.length} passes</span>
            </div>
          </div>
        </div>

        {/* Right Side: Passes Feed */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section Navigation Tabs */}
          <div className="flex border-b border-zinc-900 gap-6 font-mono text-xs">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-4 uppercase tracking-wider relative cursor-pointer ${
                activeTab === "active" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Active Passes ({activeOrders.length})
              {activeTab === "active" && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#ccff00]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("past")}
              className={`pb-4 uppercase tracking-wider relative cursor-pointer ${
                activeTab === "past" ? "text-white font-bold" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Archived Shows ({pastOrders.length})
              {activeTab === "past" && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#ccff00]" />
              )}
            </button>
          </div>

          {/* List display */}
          <div className="space-y-4">
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#ccff00]/40 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={order.eventImage}
                      alt={order.eventTitle}
                      className="w-16 h-16 object-cover border border-zinc-800 grayscale flex-shrink-0"
                    />
                    <div className="font-mono space-y-1">
                      <h4 className="text-xs font-bold text-white uppercase line-clamp-1">
                        {order.eventTitle}
                      </h4>
                      <span className="text-[10px] text-zinc-500 block">
                        {order.venueName} • {order.eventDate}
                      </span>
                      <div className="flex gap-2">
                        <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">
                          {order.categoryName}
                        </span>
                        {order.isSeated && (
                          <span className="text-[9px] bg-[#ccff00]/5 border border-[#ccff00]/10 text-[#ccff00] px-2 py-0.5 uppercase font-bold">
                            SEATS: {order.seats.map((s) => `${s.row}-${s.seatNum}`).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-1.5 border-t border-zinc-900 md:border-0 pt-4 md:pt-0">
                    <span className="font-mono text-xs font-bold text-[#ccff00]">
                      {formatPrice(order.totalPrice)}
                    </span>
                    
                    <Link href={`/ticket/${order.orderId}`} data-cursor="pointer">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5" />
                        <span>OPEN TICKET</span>
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              /* Custom Empty state inside dashboard tab */
              <div className="border border-zinc-900 bg-zinc-950/40 p-12 text-center space-y-4">
                <Ticket className="w-8 h-8 text-zinc-700 mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-mono text-xs font-bold uppercase text-white">
                    No matching passes logged
                  </h4>
                  <p className="font-mono text-[10px] text-zinc-500 max-w-xs mx-auto leading-relaxed">
                    You don&apos;t have any tickets logged under this category. Visit the directory to secure show passes.
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
