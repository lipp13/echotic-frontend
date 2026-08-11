"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Apple Dynamic Island / macOS Floating Container Top-Center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2.5 max-w-md w-[90vw] pointer-events-none">
        <AnimatePresence mode="sync">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastItem({ toast, onClose }) {
  const { message, type, duration } = toast;

  const typeConfig = {
    success: {
      badgeBg: "bg-[#e5c158]/20 text-[#e5c158] border border-[#e5c158]/40",
      icon: <Check className="w-3.5 h-3.5" />,
      glowColor: "shadow-[#e5c158]/10",
      barBg: "bg-[#e5c158]",
      label: "Sukses",
    },
    error: {
      badgeBg: "bg-rose-500/20 text-rose-400 border border-rose-500/40",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
      glowColor: "shadow-rose-500/10",
      barBg: "bg-rose-500",
      label: "Pemberitahuan",
    },
    info: {
      badgeBg: "bg-sky-500/20 text-sky-400 border border-sky-500/40",
      icon: <Info className="w-3.5 h-3.5" />,
      glowColor: "shadow-sky-500/10",
      barBg: "bg-sky-400",
      label: "Informasi",
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -30, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { type: "spring", stiffness: 500, damping: 28 } 
      }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        scale: 0.95, 
        transition: { duration: 0.2 } 
      }}
      className={`pointer-events-auto w-full max-w-sm glass-panel-premium bg-[#0a0b10]/90 backdrop-blur-2xl rounded-full px-4 py-2.5 shadow-2xl ${config.glowColor} border border-white/20 flex items-center justify-between gap-3 relative overflow-hidden ring-1 ring-white/10`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Apple Status Badge Pill */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${config.badgeBg}`}>
          {config.icon}
        </div>

        {/* Message */}
        <p className="text-xs font-semibold text-white truncate tracking-tight">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Subtle Apple-style progress hairline */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-white/10">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`h-full ${config.barBg} opacity-80`}
        />
      </div>
    </motion.div>
  );
}


