"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

interface NeuralNode {
  id: number;
  x: number;
  y: number;
}

const AURORA_COLORS = [
  "rgba(0,200,150,0.7)",
  "rgba(0,184,122,0.6)",
  "rgba(124,77,255,0.65)",
  "rgba(255,110,199,0.5)",
  "rgba(139,233,253,0.55)",
  "rgba(0,255,148,0.6)",
];

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const ps: Particle[] = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 8,
      color: AURORA_COLORS[i % AURORA_COLORS.length],
      opacity: Math.random() * 0.6 + 0.2,
    }));
    setParticles(ps);

    const ns: NeuralNode[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
    }));
    setNodes(ns);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* ── SVG Neural network lines ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00C896" stopOpacity="0" />
            <stop offset="50%" stopColor="#00C896" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {nodes.map((a, ai) =>
          nodes.slice(ai + 1, ai + 4).map((b) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
            />
          ))
        )}
      </svg>

      {/* ── Neural nodes ── */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: 4,
            height: 4,
            background: "rgba(0,200,150,0.5)",
            boxShadow: "0 0 8px rgba(0,200,150,0.4)",
          }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}

      {/* ── Floating aurora particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 5}px ${p.color}`,
          }}
          animate={{
            y: [0, -100, -30, -140, 0],
            x: [0, 20, -15, 8, 0],
            opacity: [0, p.opacity, p.opacity * 0.6, p.opacity, 0],
            scale: [0.4, 1, 0.7, 1.2, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Volumetric light rings ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full border"
          style={{
            width: `${30 + i * 18}vw`,
            height: `${30 + i * 18}vw`,
            marginLeft: `${-(15 + i * 9)}vw`,
            marginTop: `${-(15 + i * 9)}vw`,
            borderColor: i === 0
              ? "rgba(0,200,150,0.06)"
              : i === 1
              ? "rgba(124,77,255,0.05)"
              : "rgba(255,110,199,0.04)",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.03, 1] }}
          transition={{
            rotate: { duration: 40 + i * 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}
