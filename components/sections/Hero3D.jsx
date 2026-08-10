"use client";

import React, { useState, useEffect, useRef, Component } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// React Error Boundary specifically for catching WebGL / Canvas rendering crashes
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Generates a crisp canvas texture for the 3D ticket pass
function useTicketTexture() {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Pure sleek dark ticket background
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle dark border
      ctx.strokeStyle = "#262626";
      ctx.lineWidth = 4;
      ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

      // Tear-off stub divider line
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = "#2d2d2d";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(740, 16);
      ctx.lineTo(740, canvas.height - 16);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Electric Purple Accent line on left
      ctx.fillStyle = "#9d4edd";
      ctx.fillRect(20, 20, 8, canvas.height - 40);

      // Brand Wordmark - ECHOTIC PASS
      ctx.font = "bold 42px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText("ECHOTIC", 50, 85);

      ctx.font = "600 18px system-ui, sans-serif";
      ctx.fillStyle = "#9d4edd";
      ctx.fillText("OFFICIAL ACCESS PASS", 230, 85);

      // Main Artist Title
      ctx.font = "bold 56px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("WORLD TOUR 2026", 50, 175);

      // Category Badge (Safe roundRect fallback)
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(50, 210, 240, 44, 8);
      } else {
        ctx.rect(50, 210, 240, 44);
      }
      ctx.fill();
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.font = "bold 18px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("VIP ALL-ACCESS PASS", 70, 238);

      // Venue & Date Info
      ctx.font = "500 20px system-ui, sans-serif";
      ctx.fillStyle = "#a1a1a1";
      ctx.fillText("JAKARTA INTERNATIONAL STADIUM", 50, 305);
      ctx.fillText("OCTOBER 24, 2026 • 20:00 WIB", 50, 335);

      // Barcode / QR Graphic Simulation
      ctx.fillStyle = "#ffffff";
      for (let x = 50; x < 680; x += Math.random() * 10 + 6) {
        const w = Math.random() * 5 + 2;
        ctx.fillRect(x, 380, w, 70);
      }

      // Right Stub Content (Rotated)
      ctx.save();
      ctx.translate(880, 256);
      ctx.rotate(-Math.PI / 2);

      ctx.font = "bold 28px system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("ECHOTIC", 0, -50);

      ctx.font = "bold 20px system-ui, sans-serif";
      ctx.fillStyle = "#9d4edd";
      ctx.fillText("PASS #9402", 0, -15);

      ctx.font = "500 16px system-ui, sans-serif";
      ctx.fillStyle = "#777777";
      ctx.fillText("GATE A • SEAT V-12", 0, 20);

      // Simulated QR Square in stub
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-30, 40, 60, 60);
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(-22, 48, 44, 44);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-14, 56, 28, 28);

      ctx.restore();

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    } catch (err) {
      console.warn("Canvas texture generation warning:", err);
    }
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
    meshRef.current.rotation.y = time * 0.25;
    const targetX = pointer.x * 0.25;
    const targetY = pointer.y * 0.25;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.08);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -targetX * 0.3, 0.08);
  });

  const outerW = 3.6;
  const outerH = 1.7;

  return (
    <group ref={meshRef}>
      {/* Base metallic ticket slab */}
      <mesh>
        <boxGeometry args={[outerW, outerH, 0.06]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Front texture plane */}
      {ticketTexture && (
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[outerW - 0.08, outerH - 0.08]} />
          <meshStandardMaterial
            map={ticketTexture}
            transparent={true}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      )}
    </group>
  );
}

// Fallback component
function TicketFallback() {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center bg-[#121212]/60 border border-zinc-800 rounded-3xl overflow-hidden group shadow-2xl">
      <div className="w-[340px] h-[190px] bg-[#0c0c0c] border border-zinc-700/80 rounded-2xl p-5 flex justify-between shadow-2xl relative backdrop-blur-md transform group-hover:scale-105 transition-all duration-500">
        <div className="flex flex-col justify-between flex-1 pr-4 border-r border-dashed border-zinc-800">
          <div>
            <span className="text-xs font-bold text-[#9d4edd] uppercase tracking-wider block">
              ECHOTIC PASS
            </span>
            <h3 className="text-white text-base font-bold tracking-tight mt-1">
              WORLD TOUR 2026
            </h3>
          </div>

          <div>
            <span className="inline-block bg-zinc-900 border border-zinc-800 text-[10px] font-semibold text-zinc-300 px-2.5 py-1 rounded-md mb-1">
              VIP ALL-ACCESS PASS
            </span>
            <p className="text-[10px] text-zinc-400 font-medium truncate">
              JAKARTA INT'L STADIUM • OCT 24
            </p>
          </div>
        </div>

        <div className="w-16 flex flex-col items-center justify-between pl-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="w-4 h-4 bg-black" />
          </div>
          <span className="text-[9px] text-[#9d4edd] font-bold">#9402</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGLError(true);
    } catch {
      setHasWebGLError(true);
    }
  }, []);

  if (!mounted || hasWebGLError) return <TicketFallback />;

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-3xl">
      <CanvasErrorBoundary fallback={<TicketFallback />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => {
            gl.setClearColor("#000000", 0);
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={50} />

          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
          <spotLight position={[0, 5, 3]} angle={0.5} penumbra={0.8} intensity={6} color="#9d4edd" />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
            <TicketMesh />
          </Float>

          <Sparkles count={25} scale={4.5} size={1.2} speed={0.4} color="#9d4edd" opacity={0.4} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}