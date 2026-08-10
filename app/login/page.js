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
    <main className="min-h-screen bg-[#080808] text-white flex flex-col lg:flex-row relative">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase"
          data-cursor="pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Left Side: Editorial Banner */}
      <div className="flex-1 bg-[#0a0a0a] border-r border-white/5 flex flex-col justify-between p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />

        <div className="text-xl font-black tracking-tight text-white z-10">
          ECHOTIC<span className="text-[#9d4edd]">.</span>
        </div>

        <div className="my-auto space-y-4 z-10">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight uppercase leading-none">
            ENTER <br />
            THE <span className="text-[#9d4edd]">STAGE.</span>
          </h1>
          <p className="text-sm text-zinc-300 max-w-sm font-normal">
            Access your gig passes, purchase history, and personalized concert preferences in one sleek hub.
          </p>
        </div>

        <div className="flex justify-between text-xs text-zinc-500 font-medium border-t border-zinc-800 pt-6 z-10">
          <span>SECURE AUTHENTICATION</span>
          <span>LIVE MUSIC PLATFORM</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20 bg-[#080808]">
        <div className="w-full max-w-md bg-[#121212] border border-zinc-800 rounded-3xl p-8 md:p-10 relative shadow-2xl">
          <h2 className="text-2xl font-bold tracking-tight uppercase mb-1">
            Sign In
          </h2>
          <p className="text-xs text-zinc-400 mb-8">
            Enter your credentials to manage your passes
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  disabled={loading}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#9d4edd] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#9d4edd] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="w-full py-4 text-center justify-center font-bold text-sm mt-2"
              data-cursor="pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "SIGN IN"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <p className="text-xs text-zinc-400">
              New to EchoTic?{" "}
              <Link href="/register" className="text-[#9d4edd] font-semibold hover:underline" data-cursor="pointer">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
