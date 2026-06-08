"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated grain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = (Math.random() * 255) | 0;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = Math.random() * 18; // very subtle
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };

    resize();
    drawGrain();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

      {/* ── Deep space base ── */}
      <div className="absolute inset-0 bg-[#020e08]" />

      {/* ── Aurora blob 1 — bright emerald (top left) ── */}
      <motion.div
        className="aurora-blob-a absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,200,150,0.14) 0%, rgba(0,184,122,0.07) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Aurora blob 2 — deep forest green (right center) ── */}
      <motion.div
        className="aurora-blob-b absolute top-[10%] -right-[20%] w-[65vw] h-[65vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,160,100,0.10) 0%, rgba(0,120,70,0.05) 45%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Aurora blob 3 — mint (bottom center) ── */}
      <motion.div
        className="aurora-blob-c absolute -bottom-[25%] left-[20%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,148,0.07) 0%, rgba(0,200,150,0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* ── Subtle top radial vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(0,200,150,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── Mesh gradient overlay ── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            conic-gradient(from 180deg at 50% 50%,
              rgba(0,200,150,0.03) 0deg,
              transparent 60deg,
              rgba(124,77,255,0.03) 120deg,
              transparent 180deg,
              rgba(255,110,199,0.02) 240deg,
              transparent 300deg,
              rgba(0,200,150,0.03) 360deg
            )
          `,
        }}
      />

      {/* ── Data ray streaks ── */}
      {[15, 30, 50, 65, 82].map((left, i) => (
        <div
          key={i}
          className="data-ray-line"
          style={{
            left: `${left}%`,
            height: `${60 + i * 20}px`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${4 + i * 0.8}s`,
          }}
        />
      ))}

      {/* ── Animated grain canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-overlay"
        style={{ opacity: 0.4 }}
      />
    </div>
  );
}
