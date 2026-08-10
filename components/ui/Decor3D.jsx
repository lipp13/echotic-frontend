"use client";

import React, { useState, useEffect, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Mic, Volume2, Shield } from "lucide-react";

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
    console.warn("Decor3D Canvas Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function MicModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime || 0;
      groupRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mic Grill */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#cccccc"
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>
      
      {/* Mic Handle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.9, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Mic Ring */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.11, 0.02, 8, 24]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function SpeakerModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime || 0;
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Speaker Box */}
      <mesh>
        <boxGeometry args={[0.6, 0.9, 0.5]} />
        <meshStandardMaterial color="#151515" roughness={0.5} metalness={0.3} />
      </mesh>
      
      {/* Subwoofer Ring (Big) */}
      <mesh position={[0, -0.2, 0.26]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Tweeter Ring (Small) */}
      <mesh position={[0, 0.2, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

function ShieldModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime || 0;
      meshRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Ring */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#9d4edd" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Core */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
        <meshStandardMaterial color="#121212" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Center Star shape */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

function DecorFallback({ type = "mic", className = "" }) {
  return (
    <div className={`flex items-center justify-center border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#9d4edd]/20 border border-[#9d4edd]/50 flex items-center justify-center text-[#9d4edd] shadow-lg animate-pulse">
        {type === "mic" && <Mic className="w-8 h-8" />}
        {type === "speaker" && <Volume2 className="w-8 h-8" />}
        {type === "shield" && <Shield className="w-8 h-8" />}
      </div>
    </div>
  );
}

export default function Decor3D({ type = "mic", className = "" }) {
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

  const fallback = <DecorFallback type={type} className={className} />;

  if (!mounted || hasWebGLError) {
    return fallback;
  }

  return (
    <div className={`relative ${className}`}>
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[2, 2, 2]} intensity={1.8} />
          <pointLight position={[-2, -2, -2]} intensity={0.5} color="#9d4edd" />
          
          <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
            {type === "mic" && <MicModel />}
            {type === "speaker" && <SpeakerModel />}
            {type === "shield" && <ShieldModel />}
          </Float>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
