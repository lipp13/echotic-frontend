"use client";

import React, { useState } from "react";
import { formatPrice } from "@/lib/utils";

// Seed occupied seats deterministically based on row and seat index
const isOccupiedSeed = (row, index) => {
  const seed = (row.charCodeAt(0) * 7 + index * 13) % 5;
  return seed === 0 || seed === 3; // roughly 40% occupied
};

export default function SeatMap({ event, onSelectionChange }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const sections = event.seatingConfig?.sections || [];

  const handleSeatClick = (section, row, seatNum, price) => {
    const seatId = `${section.id}-${row}-${seatNum}`;
    
    setSelectedSeats((prev) => {
      const isSelected = prev.find((s) => s.id === seatId);
      let updated;
      
      if (isSelected) {
        updated = prev.filter((s) => s.id !== seatId);
      } else {
        updated = [...prev, { id: seatId, sectionName: section.name, row, seatNum, price }];
      }
      
      onSelectionChange(updated);
      return updated;
    });
  };

  if (!event.seatingConfig?.hasSeatedMap || sections.length === 0) {
    return (
      <div className="glass-panel-premium rounded-2xl p-6 text-center">
        <p className="text-sm text-slate-400 font-medium">
          Konser Festival / Standing Event. Tidak memerlukan pemilihan nomor kursi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 glass-panel-premium rounded-3xl p-6 md:p-8 relative shadow-2xl">
      {/* Stage Layout */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-3/4 h-8 bg-white/5 border border-white/15 rounded-xl text-center flex items-center justify-center relative overflow-hidden shadow-md backdrop-blur-md">
          <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
            AREA PANGGUNG UTAMA
          </span>
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#e5c158]" />
        </div>
        {/* Subtle Spotlight Beam */}
        <div className="w-1/2 h-10 bg-gradient-to-b from-[#e5c158]/10 to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* Map Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.name} — <span className="text-[#e5c158]">{formatPrice(section.price)}</span>
              </h4>
              <span className="text-xs text-slate-400 font-medium">
                {section.rows.length} baris, {section.seatsPerRow} kursi/baris
              </span>
            </div>

            {/* Grid of Seats */}
            <div className="flex flex-col gap-2 items-center overflow-x-auto pb-4 custom-scrollbar">
              {section.rows.map((row) => (
                <div key={row} className="flex gap-2 items-center justify-start min-w-[320px]">
                  {/* Row Label */}
                  <span className="w-6 text-xs font-bold text-slate-400 text-right mr-2">
                    {row}
                  </span>

                  {/* Seats Row */}
                  <div className="flex gap-2">
                    {Array.from({ length: section.seatsPerRow }).map((_, idx) => {
                      const seatNum = idx + 1;
                      const seatId = `${section.id}-${row}-${seatNum}`;
                      const isOccupied = isOccupiedSeed(row, seatNum);
                      const isSelected = selectedSeats.some((s) => s.id === seatId);

                      return (
                        <button
                          key={seatNum}
                          disabled={isOccupied}
                          onClick={() => handleSeatClick(section, row, seatNum, section.price)}
                          title={`${section.name} - Baris ${row} Kursi ${seatNum}`}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center border transition-all cursor-pointer ${
                            isOccupied
                              ? "bg-white/5 border-white/5 text-slate-600 cursor-not-allowed"
                              : isSelected
                              ? "bg-[#e5c158] border-[#e5c158] text-slate-950 font-bold shadow-md shadow-[#e5c158]/30"
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-[#e5c158] hover:text-white"
                          }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row Label Right */}
                  <span className="w-6 text-xs font-bold text-slate-400 text-left ml-2">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 border-t border-white/10 pt-6 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md border border-white/10 bg-white/5" />
          <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-white/5 border border-white/5 opacity-50" />
          <span>Terisi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#e5c158] border border-[#e5c158]" />
          <span>Dipilih</span>
        </div>
      </div>

      {/* Summary of Selection */}
      {selectedSeats.length > 0 && (
        <div className="border border-white/10 bg-white/5 rounded-2xl p-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block">
              Kursi Yang Dipilih
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="bg-white/10 border border-white/15 px-3 py-1 rounded-full text-xs font-semibold text-white font-mono"
                >
                  {seat.row}-{seat.seatNum} ({seat.id.split("-")[0]})
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider block">
              Subtotal
            </span>
            <span className="text-xl font-bold text-white">
              {formatPrice(selectedSeats.reduce((acc, curr) => acc + curr.price, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


