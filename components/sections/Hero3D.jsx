"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Sparkles,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// Generates a fake barcode pattern of thin vertical bars
function Barcode({ position, width = 0.55, height = 0.35, color = "#ffffff" }) {
  const bars = [];
  let x = -width / 2;
  let i = 0;
  while (x < width / 2) {
    const barW = 0.008 + Math.random() * 0.02;
    bars.push(
      <mesh key={i} position={[x + barW / 2, 0, 0]}>
        <boxGeometry args={[barW, height, 0.002]} />
        <meshBasicMaterial color={color} />
      </mesh>
    );
    x += barW + 0.006 + Math.random() * 0.012;
    i++;
  }
  return <group position={position}>{bars}</group>;
}

// Column of small dots that fakes the die-cut perforation line of a real ticket
function PerforationLine({ x, baseColor = "#0d0e15" }) {
  const dots = [];
  for (let y = -0.5; y <= 0.5; y += 0.09) {
    dots.push(
      <mesh key={y} position={[x, y, 0.062]}>
        <circleGeometry args={[0.017, 16]} />
        <meshBasicMaterial color={baseColor} />
      </mesh>
    );
  }
  return <>{dots}</>;
}

function TicketMesh() {
  const meshRef = useRef();
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    const targetX = pointer.x * 0.4;
    const targetY = pointer.y * 0.4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX * 0.5, 0.1);
  });

  // Layout constants — ticket = main stub (left, wide) + tear-off stub (right, narrow)
  const outerW = 3.6;
  const outerH = 1.4;
  const dividerX = 1.05; // where the perforation / tear line sits
  const rightEdge = 1.75;

  return (
    <group ref={meshRef}>
      {/* Outer ticket card */}
      <mesh>
        <boxGeometry args={[outerW, outerH, 0.08]} />
        <meshPhysicalMaterial
          color="#0d0e15"
          emissive="#1a1c29"
          roughness={0.15}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Neon frame border */}
      <mesh position={[0, 0, 0.041]}>
        <boxGeometry args={[outerW - 0.12, outerH - 0.12, 0.01]} />
        <meshPhysicalMaterial
          color="#ccff00"
          emissive="#ccff00"
          emissiveIntensity={1.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Main info panel (event-agnostic — this is just the brand's ticket shell) */}
      <mesh position={[-0.33, 0, 0.05]}>
        <planeGeometry args={[2.62, outerH - 0.2]} />
        <meshStandardMaterial color="#07070a" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* Stub panel — subtly tinted so it reads as the tear-off half */}
      <mesh position={[1.4, 0, 0.05]}>
        <planeGeometry args={[0.65, outerH - 0.2]} />
        <meshStandardMaterial color="#0c130a" roughness={0.45} metalness={0.4} />
      </mesh>

      {/* Perforation line separating ticket body from stub */}
      <PerforationLine x={dividerX} />
      {/* Notches top/bottom to sell the "tear here" look */}
      <mesh position={[dividerX, outerH / 2 - 0.06, 0.061]}>
        <circleGeometry args={[0.055, 24]} />
        <meshBasicMaterial color="#0d0e15" />
      </mesh>
      <mesh position={[dividerX, -outerH / 2 + 0.06, 0.061]}>
        <circleGeometry args={[0.055, 24]} />
        <meshBasicMaterial color="#0d0e15" />
      </mesh>

      {/* Accent stripe (kept from original, now a design flourish rather than a fixed spot) */}
      <mesh position={[-1.55, 0, 0.06]}>
        <planeGeometry args={[0.045, outerH - 0.24]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Brand wordmark — this is the template's identity, not one event's name */}
      <Text
        position={[-0.33, 0.32, 0.062]}
        fontSize={0.19}
        color="#ccff00"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        letterSpacing={0.02}
      >
        ECHOTIC
      </Text>

      <Text
        position={[-0.33, 0.1, 0.062]}
        fontSize={0.065}
        color="#e5e5e5"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        ALL-ACCESS CONCERT PASS
      </Text>

      {/* Generic admission tag — no seat/date tied to a single show */}
      <Text
        position={[-0.33, -0.12, 0.062]}
        fontSize={0.055}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        GENERAL ADMISSION • VALID ANY EVENT
      </Text>

      {/* Small print / handle */}
      <Text
        position={[-0.33, -0.34, 0.062]}
        fontSize={0.05}
        color="#6b6b6b"
        anchorX="center"
        anchorY="middle"
      >
        @echoticsite
      </Text>

      {/* Small "verified" mark, decorative, replaces the old plain badge */}
      <mesh position={[1.0, 0.42, 0.062]}>
        <circleGeometry args={[0.06, 32]} />
        <meshStandardMaterial color="#ff0055" roughness={0.1} metalness={1} />
      </mesh>

      {/* Stub — vertical ticket code label */}
      <Text
        position={[1.28, 0.2, 0.062]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.05}
        color="#ccff00"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        KODE TIKET
      </Text>

      {/* Stub — placeholder code, not a real value */}
      <Text
        position={[1.52, 0.2, 0.062]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.045}
        color="#e5e5e5"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
      >
        0000-0000
      </Text>

      {/* Stub — barcode */}
      <Barcode position={[1.4, -0.28, 0.062]} width={0.5} height={0.28} />
    </group>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback visual if canvas is not mounted yet or WebGL is missing
  const fallback = (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center bg-zinc-950/20 border border-zinc-900 overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="w-[300px] h-[170px] bg-gradient-to-br from-zinc-900 to-black border border-zinc-700/80 rounded-lg p-4 flex flex-col justify-between shadow-2xl relative backdrop-blur-md transform group-hover:rotate-3 group-hover:scale-105 transition-all duration-500">
        <div className="absolute inset-0 border-2 border-[#ccff00]/40 rounded-lg pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start">
          <div className="font-mono text-[9px] text-[#ccff00] font-black uppercase tracking-widest">
            ECHOTIC
          </div>
          <div className="w-6 h-6 rounded-full bg-[#ff0055]/80 animate-pulse" />
        </div>
        <div className="font-mono">
          <div className="text-white text-sm font-black uppercase">ALL-ACCESS PASS</div>
          <div className="text-zinc-500 text-[9px] mt-0.5">GENERAL ADMISSION • VALID ANY EVENT</div>
        </div>
        <div className="flex justify-between items-end border-t border-zinc-800 pt-3">
          <span className="font-mono text-[8px] text-zinc-500">@echoticsite</span>
          <span className="font-mono text-xs font-bold text-[#00f0ff]">SCAN TO VERIFY</span>
        </div>
      </div>
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#ccff00]/10 blur-2xl" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-[#ff0055]/10 blur-2xl" />
    </div>
  );

  if (!mounted) return fallback;

  return (
    <div
      className="relative w-full h-[350px] md:h-[450px] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas eventSource={typeof document !== "undefined" ? document.getElementById("root") : undefined}>
        <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={50} />

        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />

        <spotLight position={[0, 5, 2]} angle={0.6} penumbra={0.8} intensity={8} color="#ccff00" castShadow />
        <spotLight position={[2, -4, 2]} angle={0.6} penumbra={0.8} intensity={6} color="#ff0055" />
        <spotLight position={[-2, 0, 3]} angle={0.6} penumbra={0.8} intensity={4} color="#00f0ff" />

        <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <TicketMesh />
        </Float>

        <Sparkles count={50} scale={5} size={1.8} speed={0.8} color="#ccff00" opacity={0.6} />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}