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
      <div className="border border-zinc-800 bg-[#121212] rounded-2xl p-6 text-center">
        <p className="text-sm text-zinc-400 font-medium">
          General Admission / Standing Event. No individual seat selection is required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-[#121212] border border-zinc-800 rounded-3xl p-6 md:p-8 relative shadow-card-subtle">
      {/* Stage Layout */}
      <div className="w-full flex flex-col items-center mb-10">
        <div className="w-3/4 h-8 bg-zinc-900 border border-zinc-700/80 rounded-xl text-center flex items-center justify-center relative overflow-hidden shadow-md">
          <span className="text-xs font-bold tracking-widest text-zinc-300 uppercase">
            STAGE FRONT
          </span>
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#9d4edd]" />
        </div>
        {/* Subtle Spotlight Beam */}
        <div className="w-1/2 h-10 bg-gradient-to-b from-[#9d4edd]/10 to-transparent clip-path-spotlight opacity-50 pointer-events-none" />
      </div>

      {/* Map Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="border-t border-zinc-800/80 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {section.name} — <span className="text-[#9d4edd]">{formatPrice(section.price)}</span>
              </h4>
              <span className="text-xs text-zinc-500 font-medium">
                {section.rows.length} rows, {section.seatsPerRow} seats/row
              </span>
            </div>

            {/* Grid of Seats */}
            <div className="flex flex-col gap-2 items-center overflow-x-auto pb-4 custom-scrollbar">
              {section.rows.map((row) => (
                <div key={row} className="flex gap-2 items-center justify-start min-w-[320px]">
                  {/* Row Label */}
                  <span className="w-6 text-xs font-bold text-zinc-500 text-right mr-2">
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
                          title={`${section.name} - Row ${row} Seat ${seatNum}`}
                          className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center border transition-all cursor-pointer ${
                            isOccupied
                              ? "bg-zinc-900 border-zinc-900 text-zinc-700 cursor-not-allowed"
                              : isSelected
                              ? "bg-[#9d4edd] border-[#9d4edd] text-white font-bold shadow-md shadow-[#9d4edd]/30"
                              : "bg-zinc-900/60 border-zinc-700/80 text-zinc-300 hover:border-[#9d4edd] hover:text-white"
                          }`}
                        >
                          {seatNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Row Label Right */}
                  <span className="w-6 text-xs font-bold text-zinc-500 text-left ml-2">
                    {row}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 border-t border-zinc-800/80 pt-6 text-xs text-zinc-400 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md border border-zinc-700 bg-zinc-900/60" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-zinc-900 border border-zinc-900" />
          <span>Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-md bg-[#9d4edd] border border-[#9d4edd]" />
          <span>Selected</span>
        </div>
      </div>

      {/* Summary of Selection */}
      {selectedSeats.length > 0 && (
        <div className="border border-zinc-800 bg-zinc-900/80 rounded-2xl p-5 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider block">
              Selected Seats
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <span
                  key={seat.id}
                  className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-xs font-semibold text-white"
                >
                  {seat.row}-{seat.seatNum} ({seat.id.split("-")[0]})
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-xs text-zinc-400 uppercase font-semibold tracking-wider block">
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
