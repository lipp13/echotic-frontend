"use client";

import React, { useState, useEffect } from "react";
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
      <div className="border border-zinc-800 bg-zinc-950 p-6 text-center">
        <p className="font-mono text-sm text-zinc-500">
          This is a General Admission / Standing event. No seat selection is required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-zinc-950 border border-zinc-800 p-6 md:p-8 relative">
      {/* Glow lines */}
      <div className="absolute top-0 right-10 w-16 h-[1px] bg-[#00f0ff]" />

      {/* Stage Layout */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-2/3 h-6 bg-zinc-900 border-x border-b border-zinc-700 text-center flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <span className="font-mono text-[10px] tracking-widest text-zinc-400 font-bold uppercase">
            STAGE FRONT
          </span>
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-[#ccff00]/40 shadow-[0_0_8px_#ccff00]" />
        </div>
        {/* Spotlight Beam */}
        <div className="w-1/3 h-12 bg-gradient-to-b from-[#ccff00]/5 to-transparent clip-path-spotlight opacity-40 pointer-events-none" />
      </div>

      {/* Map Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="border-t border-zinc-900 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                {section.name} — <span className="text-[#ccff00]">{formatPrice(section.price)}</span>
              </h4>
              <span className="text-[9px] font-mono text-zinc-500">
                {section.rows.length} rows, {section.seatsPerRow} seats/row
              </span>
            </div>

            {/* Grid of Seats */}
            <div className="flex flex-col gap-2 items-center overflow-x-auto pb-4">
              {section.rows.map((row) => (
                <div key={row} className="flex gap-1.5 items-center justify-start min-w-[320px]">
                  {/* Row Label */}
                  <span className="w-6 font-mono text-[10px] font-bold text-zinc-600 text-right mr-2">
                    {row}
                  </span>

                  {/* Seats Row */}
                  <div className="flex gap-1.5">
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
                          title={`${section.name} - Row ${row} Seat ${seatNum}`}
                          className={`w-6 h-6 rounded-sm text-[8px] font-mono flex items-center justify-center border transition-all cursor-pointer ${
                            isOccupied
                              ? "bg-zinc-900 border-zinc-900 text-zinc-700 cursor-not-allowed"
                              : isSelected
                              ? "bg-[#ccff00] border-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                              : "bg-transparent border-zinc-700 text-zinc-400 hover:border-[#ccff00] hover:text-white"
                          }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row Label Right */}
                  <span className="w-6 font-mono text-[10px] font-bold text-zinc-600 text-left ml-2">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 border-t border-zinc-900 pt-6 font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 border border-zinc-700 bg-transparent" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-zinc-900 border border-zinc-900" />
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#ccff00] border border-[#ccff00]" />
          <span>Selected</span>
        </div>
      </div>

      {/* Summary of Selection */}
      {selectedSeats.length > 0 && (
        <div className="border border-zinc-800 bg-zinc-900/60 p-4 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
              Selected Seats
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="bg-black border border-zinc-800 px-2.5 py-1 text-[10px] font-mono text-white"
                >
                  {seat.row}-{seat.seatNum} ({seat.id.split("-")[0]})
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
              Total Subtotal
            </span>
            <span className="font-mono text-lg font-black text-[#ccff00]">
              {formatPrice(selectedSeats.reduce((acc, curr) => acc + curr.price, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
