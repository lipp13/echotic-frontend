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
      bg: "bg-black/90 border-[#ccff00]/40 shadow-[#ccff00]/10",
      icon: <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />,
      barBg: "bg-[#ccff00]",
    },
    error: {
      bg: "bg-black/90 border-[#ff0055]/40 shadow-[#ff0055]/10",
      icon: <AlertTriangle className="w-5 h-5 text-[#ff0055]" />,
      barBg: "bg-[#ff0055]",
    },
    info: {
      bg: "bg-black/90 border-[#00f0ff]/40 shadow-[#00f0ff]/10",
      icon: <Info className="w-5 h-5 text-[#00f0ff]" />,
      barBg: "bg-[#00f0ff]",
    },
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`pointer-events-auto flex flex-col overflow-hidden rounded-lg border backdrop-blur-md p-4 shadow-xl ${config.bg}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {config.icon}
          <p className="text-sm font-medium text-white font-mono tracking-tight">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-800">
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
