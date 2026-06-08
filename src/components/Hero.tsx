"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Sparkles, ArrowRight, Activity, Zap, Globe, Code2, Cpu, Shield,
} from "lucide-react";
import HeroParticles from "./HeroParticles";


// ──────────────────────────────────────────────────────────
// MAGNETIC BUTTON
// ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (left + width / 2)) * 0.18,
      y: (e.clientY - (top + height / 2)) * 0.18,
    });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// ──────────────────────────────────────────────────────────
// DASHBOARD STATS PREVIEW
// ──────────────────────────────────────────────────────────
const stats = [
  { label: "Agents Active", value: "6", icon: Cpu, color: "text-[#00C896]", bg: "bg-[#00C896]/10" },
  { label: "Tasks Running", value: "24", icon: Zap, color: "text-[#7C4DFF]", bg: "bg-[#7C4DFF]/10" },
  { label: "Code Generated", value: "12.4k", icon: Code2, color: "text-[#00FF94]", bg: "bg-[#00FF94]/10" },
  { label: "Deployments", value: "3", icon: Globe, color: "text-[#FF6EC7]", bg: "bg-[#FF6EC7]/10" },
];

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: 18 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-4xl mx-auto mt-24 px-4"
      style={{ perspective: "1200px" }}
    >
      {/* Card */}
      <div
        className="rounded-3xl overflow-hidden aurora-glass-deep aurora-border"
        style={{ boxShadow: "0 0 80px rgba(0,200,150,0.1), 0 40px 80px rgba(0,0,0,0.5)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Activity className="w-3.5 h-3.5 text-[#00C896]" />
            <span>AutoGenesis OS — Live</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Shield className="w-3.5 h-3.5 text-[#00FF94]" />
            <span>Secure</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className={`${s.bg} border border-white/[0.06] rounded-2xl p-4`}
            >
              <s.icon className={`w-4 h-4 mb-3 ${s.color}`} />
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-[11px] text-white/40 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Activity bars */}
        <div className="px-5 pb-5">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
              <span className="text-xs text-white/40">Live Agent Activity</span>
            </div>
            <div className="flex gap-1 h-10 items-end">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `linear-gradient(to top, rgba(0,200,150,0.5), rgba(124,77,255,0.4))`,
                  }}
                  initial={{ height: "20%" }}
                  animate={{ height: `${Math.random() * 80 + 20}%` }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.025,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// HERO
// ──────────────────────────────────────────────────────────
export default function Hero() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const parallaxX = useTransform(smoothX, [0, 1], [-12, 12]);
  const parallaxY = useTransform(smoothY, [0, 1], [-12, 12]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      {/* ── Particle system ── */}
      <HeroParticles />

      {/* ── Parallax aurora blobs ── */}
      <motion.div
        className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,200,150,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
          x: parallaxX,
          y: parallaxY,
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,140,80,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          x: parallaxX,
          y: parallaxY,
        }}
      />

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center max-w-6xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-12 aurora-border"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00C896]" />
          <span className="text-sm text-white/60 font-medium">
            Introducing AutoGenesis v1.0
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-white/30" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[1.04] max-w-5xl"
        >
          <span className="block text-white">Build production apps</span>
          <span
            className="block mt-3 text-aurora-shimmer"
            style={{
              backgroundImage: "linear-gradient(120deg, #ffffff 0%, #6EFFC4 25%, #00FF94 50%, #6EFFC4 75%, #ffffff 100%)",
              backgroundSize: "300% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "aurora-shimmer 5s ease-in-out infinite",
            }}
          >
            with autonomous AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-xl md:text-2xl max-w-3xl mt-8 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.56)" }}
        >
          AutoGenesis plans, designs, codes, tests, and deploys your software
          from a single prompt — powered by a swarm of specialized AI agents.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-14"
        >
          <MagneticButton
            onClick={() => router.push("/login")}
            className="btn-aurora-primary relative overflow-hidden group px-8 py-4 rounded-2xl font-semibold text-[15px]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </MagneticButton>

          <MagneticButton className="btn-aurora-secondary px-8 py-4 rounded-2xl font-semibold text-[15px]">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Watch Demo
            </span>
          </MagneticButton>
        </motion.div>

        {/* Prompt input */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full max-w-3xl mt-16"
        >
          <div
            className="rounded-3xl p-4 aurora-border"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 60px rgba(0,200,150,0.08), 0 32px 64px rgba(0,0,0,0.4)",
            }}
          >
            {/* Mini top bar */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                <Sparkles className="w-3.5 h-3.5 text-[#00C896]" />
                <span>AutoGenesis AI Workspace</span>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Build me an AI CRM dashboard with authentication, real-time charts, and Stripe billing..."
              className="w-full h-32 resize-none bg-transparent border-none outline-none text-white/90 placeholder:text-white/25 text-lg px-4 py-3 leading-relaxed"
            />

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
                  <span>AI Agents Ready</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <span className="hidden sm:block">Multi-Agent Orchestration Active</span>
              </div>

              <button
                onClick={() => router.push("/login")}
                className="btn-aurora-primary relative overflow-hidden group px-6 py-3 rounded-xl font-semibold text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Generate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <DashboardPreview />
      </div>
    </section>
  );
}