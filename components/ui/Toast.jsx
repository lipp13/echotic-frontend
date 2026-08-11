"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, X, Info } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
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
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
        <AnimatePresence>
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
      bg: "bg-[#0d0e14]/90 border-[#e5c158]/30 shadow-[#e5c158]/10",
      icon: <CheckCircle2 className="w-5 h-5 text-[#e5c158]" />,
      barBg: "bg-[#e5c158]",
    },
    error: {
      bg: "bg-[#0d0e14]/90 border-rose-500/30 shadow-rose-500/10",
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      barBg: "bg-rose-500",
    },
    info: {
      bg: "bg-[#0d0e14]/90 border-sky-500/30 shadow-sky-500/10",
      icon: <Info className="w-5 h-5 text-sky-400" />,
      barBg: "bg-sky-400",
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      className={`pointer-events-auto flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl p-4 shadow-2xl ${config.bg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {config.icon}
          <p className="text-xs font-semibold text-white tracking-tight">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: duration / 1000, ease: "linear" }}
          className={`h-full ${config.barBg}`}
        />
      </div>
    </motion.div>
  );
}

