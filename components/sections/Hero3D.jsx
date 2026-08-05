"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Generates a crisp canvas texture for 3D ticket text (No SDF font errors)
function useTicketTexture() {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Dark sleek ticket texture background
    ctx.fillStyle = "#07070a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neon Accent Border
    ctx.strokeStyle = "#ccff00";
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

    // Divider Line (Tear-off stub)
    ctx.setLineDash([12, 12]);
    ctx.strokeStyle = "#27272a";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(760, 20);
    ctx.lineTo(760, canvas.height - 20);
    ctx.stroke();

    // Brand Wordmark - ECHOTIC
    ctx.font = "900 68px monospace";
    ctx.fillStyle = "#ccff00";
    ctx.textAlign = "left";
    ctx.fillText("ECHOTIC", 60, 110);

    // Subtitle - ALL-ACCESS CONCERT PASS
    ctx.font = "700 24px monospace";
    ctx.fillStyle = "#e4e4e7";
    ctx.fillText("ALL-ACCESS CONCERT PASS", 60, 160);

    // Tagline - GENERAL ADMISSION
    ctx.font = "600 20px monospace";
    ctx.fillStyle = "#00f0ff";
    ctx.fillText("GENERAL ADMISSION • VALID ANY EVENT", 60, 220);

    // Cyan accent bar
    ctx.fillStyle = "#00f0ff";
    ctx.fillRect(60, 250, 640, 4);

    // Footnote
    ctx.font = "500 18px monospace";
    ctx.fillStyle = "#71717a";
    ctx.fillText("@echoticsite — OFFICIAL PASS", 60, 310);

    // Barcode Simulation
    ctx.fillStyle = "#ffffff";
    for (let x = 60; x < 700; x += Math.random() * 12 + 4) {
      const w = Math.random() * 6 + 2;
      ctx.fillRect(x, 350, w, 90);
    }

    // Stub Side Text
    ctx.save();
    ctx.translate(880, 256);
    ctx.rotate(-Math.PI / 2);

    ctx.font = "900 32px monospace";
    ctx.fillStyle = "#ccff00";
    ctx.textAlign = "center";
    ctx.fillText("KODE TIKET", 0, -30);

    ctx.font = "700 22px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("0000-0000", 0, 10);

    ctx.font = "600 16px monospace";
    ctx.fillStyle = "#00f0ff";
    ctx.fillText("SCAN GATE ENTRY", 0, 50);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, []);

  return texture;
}

function TicketMesh() {
  const meshRef = useRef();
  const { pointer } = useThree();
  const ticketTexture = useTicketTexture();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime || 0;
    meshRef.current.rotation.y = time * 0.3;
    const targetX = pointer.x * 0.3;
    const targetY = pointer.y * 0.3;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.1);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX * 0.4, 0.1);
  });

  const outerW = 3.6;
  const outerH = 1.6;

  return (
    <group ref={meshRef}>
      {/* Outer ticket card */}
      <mesh>
        <boxGeometry args={[outerW, outerH, 0.08]} />
        <meshPhysicalMaterial
          color="#0d0e15"
          emissive="#1a1c29"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Textured Front Plane */}
      {ticketTexture && (
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[outerW - 0.1, outerH - 0.1]} />
          <meshStandardMaterial
            map={ticketTexture}
            transparent={true}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      )}

      {/* Glowing Neon Edges */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[outerW + 0.04, outerH + 0.04, 0.02]} />
        <meshBasicMaterial color="#ccff00" wireframe />
      </mesh>
    </group>
  );
}

// Minimalist Holographic Fallback for low-end / non-WebGL environments
function HolographicFallback() {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:30px_30px] opacity-15" />

      {/* Glowing card container */}
      <div className="w-[340px] h-[190px] bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex justify-between shadow-2xl relative backdrop-blur-md transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-500">
        <div className="absolute inset-0 border border-[#ccff00]/40 rounded-xl pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col justify-between flex-1 pr-4 border-r border-dashed border-zinc-800">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-black text-[#ccff00] uppercase tracking-widest">
              ECHOTIC
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
          </div>

          <div className="font-mono space-y-1 my-2">
            <h3 className="text-white text-base font-black uppercase tracking-tight">
              ALL-ACCESS PASS
            </h3>
            <p className="text-[10px] text-cyan-400 font-bold">
              GENERAL ADMISSION • VALID ANY EVENT
            </p>
          </div>

          <div className="flex justify-between items-center border-t border-zinc-900 pt-2 font-mono text-[9px] text-zinc-500">
            <span>@echoticsite</span>
            <span className="text-[#ccff00] font-bold">SCAN GATE ENTRY</span>
          </div>
        </div>

        <div className="w-16 flex flex-col items-center justify-between pl-3 font-mono">
          <span className="text-[9px] text-[#ccff00] font-bold uppercase tracking-widest rotate-90 transform origin-center whitespace-nowrap mt-4">
            KODE TIKET
          </span>
          <div className="w-full h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[8px] text-zinc-400">
            ||||||||||
          </div>
        </div>
      </div>

      <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#ccff00]/10 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-[#00f0ff]/10 blur-3xl" />
    </div>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGLError(true);
    } catch {
      setHasWebGLError(true);
    }
  }, []);

  if (!mounted || hasWebGLError) return <HolographicFallback />;

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 0);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={50} />

        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <spotLight position={[0, 5, 2]} angle={0.6} penumbra={0.8} intensity={8} color="#ccff00" />
        <spotLight position={[-2, -2, 3]} angle={0.6} penumbra={0.8} intensity={5} color="#00f0ff" />

        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
          <TicketMesh />
        </Float>

        <Sparkles count={40} scale={5} size={1.5} speed={0.6} color="#ccff00" opacity={0.6} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}