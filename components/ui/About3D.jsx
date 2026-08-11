"use client";

import React, { useState, useEffect, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { Mic, Volume2, Ticket, Disc, RotateCw } from "lucide-react";

// Error Boundary for WebGL/Canvas crashes
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("About3D Canvas Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 1. Microphone Model
function MicModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime || 0;
      groupRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]}>
      {/* Mic Grill */}
      <mesh position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial
          color="#e0e0e0"
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>
      
      {/* Mic Handle */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.11, 0.08, 1.0, 20]} />
        <meshStandardMaterial color="#141414" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Mic Gold Ring */}
      <mesh position={[0, 0.24, 0]}>
        <torusGeometry args={[0.12, 0.025, 12, 30]} />
        <meshStandardMaterial color="#e5c158" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// 2. Speaker Model
function SpeakerModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime || 0;
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]}>
      {/* Speaker Box */}
      <mesh>
        <boxGeometry args={[0.7, 1.1, 0.6]} />
        <meshStandardMaterial color="#121212" roughness={0.4} metalness={0.4} />
      </mesh>
      
      {/* Outer Rim */}
      <mesh position={[0, 0, 0.31]}>
        <boxGeometry args={[0.66, 1.06, 0.02]} />
        <meshStandardMaterial color="#e5c158" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Subwoofer Ring (Big) */}
      <mesh position={[0, -0.25, 0.33]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 28]} />
        <meshStandardMaterial color="#e5c158" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Tweeter Ring (Small) */}
      <mesh position={[0, 0.25, 0.33]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 28]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// 3. VIP Hologram Pass Model
function PassModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime || 0;
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <group ref={meshRef} scale={[1.1, 1.1, 1.1]}>
      {/* Metallic Card */}
      <mesh>
        <boxGeometry args={[1.6, 1.0, 0.06]} />
        <meshStandardMaterial color="#141414" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* Hologram Accent Line */}
      <mesh position={[-0.7, 0, 0.035]}>
        <boxGeometry args={[0.08, 0.9, 0.02]} />
        <meshStandardMaterial color="#e5c158" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Embedded Emblem */}
      <mesh position={[0.4, 0, 0.035]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

// 4. Vinyl Record Model
function VinylModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime || 0;
      meshRef.current.rotation.z = t * 0.8;
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
  });

  return (
    <group ref={meshRef} scale={[1.2, 1.2, 1.2]} rotation={[Math.PI / 6, 0, 0]}>
      {/* Outer Vinyl Disc */}
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, 0.04, 36]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Center Label */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.01, 36]} />
        <meshStandardMaterial color="#e5c158" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Center Hole */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
        <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Fallback UI if WebGL is unavailable
function About3DFallback({ selectedModel }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
      <div className="w-20 h-20 rounded-full bg-[#e5c158]/20 border border-[#e5c158]/50 flex items-center justify-center text-[#e5c158] shadow-xl animate-pulse mb-3">
        {selectedModel === "mic" && <Mic className="w-10 h-10" />}
        {selectedModel === "speaker" && <Volume2 className="w-10 h-10" />}
        {selectedModel === "pass" && <Ticket className="w-10 h-10" />}
        {selectedModel === "vinyl" && <Disc className="w-10 h-10" />}
      </div>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {selectedModel.toUpperCase()} PREVIEW
      </span>
    </div>
  );
}

export default function About3D() {
  const [selectedModel, setSelectedModel] = useState("mic");
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

  const modelsList = [
    { id: "mic", name: "Mic", title: "STAGE CONDENSER MIC", icon: Mic },
    { id: "speaker", name: "Speaker", title: "SUBWOOFER STACK", icon: Volume2 },
    { id: "pass", name: "Pass", title: "3D HOLOGRAPHIC PASS", icon: Ticket },
    { id: "vinyl", name: "Vinyl", title: "GOLD CONCERT VINYL", icon: Disc },
  ];

  const activeModelObj = modelsList.find((m) => m.id === selectedModel) || modelsList[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Canvas Box */}
      <div className="w-full h-72 relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl group">
        {/* Active Model Overlay Badge */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-widest text-[#e5c158] uppercase pointer-events-none">
          {activeModelObj.title}
        </div>

        {!mounted || hasWebGLError ? (
          <About3DFallback selectedModel={selectedModel} />
        ) : (
          <CanvasErrorBoundary fallback={<About3DFallback selectedModel={selectedModel} />}>
            <Canvas
              gl={{ alpha: true, antialias: true }}
              style={{ width: "100%", height: "100%" }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 3.2]} fov={45} />

              <ambientLight intensity={1.6} />
              <directionalLight position={[3, 4, 3]} intensity={2.2} color="#ffffff" />
              <spotLight position={[-2, -2, 2]} angle={0.5} penumbra={0.8} intensity={4} color="#e5c158" />

              <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
                {selectedModel === "mic" && <MicModel />}
                {selectedModel === "speaker" && <SpeakerModel />}
                {selectedModel === "pass" && <PassModel />}
                {selectedModel === "vinyl" && <VinylModel />}
              </Float>

              <Sparkles count={30} scale={4} size={1.5} speed={0.5} color="#e5c158" opacity={0.5} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
          </CanvasErrorBoundary>
        )}
      </div>

      {/* Interactive Controls & Model Selector */}
      <div className="mt-4 flex flex-col items-center gap-3 w-full">
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          {modelsList.map((m) => {
            const Icon = m.icon;
            const isActive = selectedModel === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#e5c158] text-slate-950 font-bold shadow-lg shadow-[#e5c158]/30"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
          <RotateCw className="w-3 h-3 text-[#e5c158] animate-spin" />
          <span>DRAG TO ROTATE 360° • TAP PILLS TO SWITCH MODEL</span>
        </div>
      </div>
    </div>
  );
}

