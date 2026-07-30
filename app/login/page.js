"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { apiLogin, isAuthenticated } from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { addToast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in all fields", "error");
      return;
    }

    if (!email.includes("@")) {
      addToast("Please enter a valid email", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await apiLogin(email, password);

      // Dispatch custom event to notify Navbar component
      window.dispatchEvent(new Event("authChange"));

      addToast(result.message || `Welcome back, ${result.data.user.username}!`, "success");
      router.push("/dashboard");
    } catch (error) {
      addToast(error.error || "Login failed. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col lg:flex-row relative">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Side: Bold Typography & Visuals */}
      <div className="flex-1 bg-black border-r border-zinc-900 flex flex-col justify-between p-12 lg:p-24 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#ccff00]/5 blur-3xl" />
        
        {/* Top brand */}
        <div className="font-mono text-lg font-black tracking-widest text-[#ccff00] z-10">
          ECHOTIC.
        </div>

        {/* Big Statement */}
        <div className="my-auto space-y-4 z-10">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            ENTER <br />
            THE <span className="text-[#00f0ff]">STAGE.</span>
          </h1>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest max-w-sm">
            Access your gig passes, purchase history, and personalized concert preferences in one sleek hub.
          </p>
        </div>

        {/* Decorative concert details footer */}
        <div className="flex justify-between font-mono text-[9px] text-zinc-600 border-t border-zinc-900 pt-6 z-10">
          <span>SECURE PROTOCOL v2.0</span>
          <span>LIVE IS LIFE</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-24 bg-[#07070a]">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-8 md:p-10 relative">
          {/* Neon corner accents */}
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-[#ccff00]" />
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-[#ccff00]" />

          <h2 className="text-2xl font-mono font-bold tracking-tight uppercase mb-2">
            Sign In
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-8">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  disabled={loading}
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ccff00] px-10 py-3.5 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="font-mono text-[10px] text-zinc-500 hover:text-white uppercase">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ccff00] px-10 py-3.5 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold"
              data-cursor="pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                "AUTHENTICATE"
              )}
            </Button>
          </form>

          {/* Bottom links */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <p className="font-mono text-xs text-zinc-500">
              NEW TO ECHOTIC?{" "}
              <Link href="/register" className="text-[#00f0ff] hover:underline" data-cursor="pointer">
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
