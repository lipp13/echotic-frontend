"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function MicModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mic Grill */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color="#aaaaaa"
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
        />
      </mesh>
      
      {/* Mic Handle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.9, 16]} />
        <meshStandardMaterial color="#1f1f2e" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Mic Gold Ring */}
      <mesh position={[0, 0.22, 0]}>
        <torusGeometry args={[0.11, 0.02, 8, 24]} />
        <meshStandardMaterial color="#ccff00" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

function SpeakerModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Speaker Box */}
      <mesh>
        <boxGeometry args={[0.6, 0.9, 0.5]} />
        <meshStandardMaterial color="#0f0f15" roughness={0.6} metalness={0.2} />
      </mesh>
      
      {/* Subwoofer Ring (Big) */}
      <mesh position={[0, -0.2, 0.26]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
        <meshStandardMaterial color="#ccff00" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Tweeter Ring (Small) */}
      <mesh position={[0, 0.2, 0.26]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 24]} />
        <meshStandardMaterial color="#00f0ff" roughness={0.2} metalness={0.5} />
      </mesh>
    </group>
  );
}

function ShieldModel() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Coin Ring */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#00f0ff" roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Core Core */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 32]} />
        <meshStandardMaterial color="#09090d" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Center Star shape (Double Cone) */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <octahedronGeometry args={[0.15]} />
        <meshStandardMaterial color="#ccff00" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function Decor3D({ type = "mic", className = "" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center border border-zinc-900 bg-zinc-950/20 ${className}`}>
        {/* Flat fallback spacer */}
        <div className="w-6 h-6 rounded-full border border-zinc-800 animate-pulse bg-zinc-900/60" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas>
        <ambientLight intensity={1.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.8} />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#00f0ff" />
        
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
          {type === "mic" && <MicModel />}
          {type === "speaker" && <SpeakerModel />}
          {type === "shield" && <ShieldModel />}
        </Float>
      </Canvas>
    </div>
  );
}
