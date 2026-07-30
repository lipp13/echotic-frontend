"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Mail, User, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import { apiRegister, isAuthenticated } from "@/lib/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (!username || !email || !password || !confirmPassword) {
      addToast("Please fill in all fields", "error");
      return;
    }

    if (!email.includes("@")) {
      addToast("Please enter a valid email", "error");
      return;
    }

    if (password.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await apiRegister(username, email, password);

      // Dispatch custom event to notify Navbar component
      window.dispatchEvent(new Event("authChange"));

      addToast(result.message || `Account created successfully! Welcome, ${username}!`, "success");
      router.push("/dashboard");
    } catch (error) {
      const message = error.details
        ? error.details.map((d) => d.message).join(". ")
        : error.error || "Registration failed. Please try again.";
      addToast(message, "error");
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
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#ff0055]/5 blur-3xl" />
        
        {/* Top brand */}
        <div className="font-mono text-lg font-black tracking-widest text-[#ff0055] z-10">
          ECHOTIC.
        </div>

        {/* Big Statement */}
        <div className="my-auto space-y-4 z-10">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            JOIN <br />
            THE <span className="text-[#ccff00]">PIT.</span>
          </h1>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest max-w-sm">
            Create an account to track tickets, secure early access pre-sales, and customize your festival alerts.
          </p>
        </div>

        {/* Decorative footer */}
        <div className="flex justify-between font-mono text-[9px] text-zinc-600 border-t border-zinc-900 pt-6 z-10">
          <span>SECURE SYSTEM PROTOCOL</span>
          <span>NO TEMPLATES ALLOWED</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-24 bg-[#07070a]">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 p-8 md:p-10 relative">
          {/* Neon corner accents */}
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-[#ff0055]" />
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-[#ff0055]" />

          <h2 className="text-2xl font-mono font-bold tracking-tight uppercase mb-2">
            Create Account
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-8">
            Fill in details to register
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="musiclover101"
                  disabled={loading}
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ff0055] px-10 py-3 text-sm font-mono text-white placeholder-zinc-750 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
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
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ff0055] px-10 py-3 text-sm font-mono text-white placeholder-zinc-700 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                Password
              </label>
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
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ff0055] px-10 py-3 text-sm font-mono text-white placeholder-zinc-750 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-600">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-black/60 border border-zinc-900 focus:border-[#ff0055] px-10 py-3 text-sm font-mono text-white placeholder-zinc-750 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="pink"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold mt-4"
              data-cursor="pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Account...</span>
                </div>
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>

          {/* Bottom links */}
          <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
            <p className="font-mono text-xs text-zinc-500">
              ALREADY REGISTERED?{" "}
              <Link href="/login" className="text-[#ccff00] hover:underline" data-cursor="pointer">
                SIGN IN NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
