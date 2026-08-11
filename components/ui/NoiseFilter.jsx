import React from "react";

export default function NoiseFilter() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 select-none opacity-[0.012]">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="monochrome" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

