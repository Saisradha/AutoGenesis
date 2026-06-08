"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// ── Mouse tracker ──────────────────────────────────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return mouse;
}

// ── Aurora orb mesh ────────────────────────────────────────
function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouse = useMouse();
  const clock = useRef(0);

  useFrame((_, delta) => {
    clock.current += delta;
    if (!meshRef.current) return;

    // Gentle float
    meshRef.current.position.y = Math.sin(clock.current * 0.5) * 0.12;
    meshRef.current.position.x = Math.cos(clock.current * 0.35) * 0.06;

    // Mouse parallax
    meshRef.current.rotation.y += (mouse.current.x * 0.3 - meshRef.current.rotation.y) * 0.04;
    meshRef.current.rotation.x += (-mouse.current.y * 0.2 - meshRef.current.rotation.x) * 0.04;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#00C896"
        distort={0.35}
        speed={1.8}
        roughness={0}
        metalness={0.1}
        transparent
        opacity={0.18}
        envMapIntensity={0.8}
      />
    </Sphere>
  );
}

// ── Outer ring ─────────────────────────────────────────────
function HoloRing({ radius, color, speed, tiltX = 0, tiltZ = 0 }: {
  radius: number;
  color: string;
  speed: number;
  tiltX?: number;
  tiltZ?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const clock = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    clock.current += delta * speed;
    if (!ref.current) return;
    ref.current.rotation.z = clock.current;
  });

  const geometry = useMemo(() => {
    return new THREE.TorusGeometry(radius, 0.008, 8, 120);
  }, [radius]);

  return (
    <mesh ref={ref} geometry={geometry} rotation={[tiltX, 0, tiltZ]}>
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

// ── Particle field ─────────────────────────────────────────
function ParticleField() {
  const COUNT = 200;
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color("#00C896"),
      new THREE.Color("#7C4DFF"),
      new THREE.Color("#FF6EC7"),
      new THREE.Color("#00FF94"),
    ];
    for (let i = 0; i < COUNT; i++) {
      const r = 2.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// ── Scene ──────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 2]} color="#00C896" intensity={2} />
      <pointLight position={[-3, -2, -1]} color="#7C4DFF" intensity={1.5} />
      <pointLight position={[0, -3, 3]} color="#FF6EC7" intensity={1} />

      <OrbMesh />
      <HoloRing radius={1.55} color="#00C896" speed={0.18} tiltX={Math.PI / 6} />
      <HoloRing radius={1.85} color="#7C4DFF" speed={-0.12} tiltX={Math.PI / 3} tiltZ={Math.PI / 8} />
      <HoloRing radius={2.15} color="#FF6EC7" speed={0.09} tiltX={Math.PI / 2} tiltZ={Math.PI / 5} />
      <ParticleField />
    </>
  );
}

// ── Exported component ─────────────────────────────────────
export default function AuroraOrb({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
