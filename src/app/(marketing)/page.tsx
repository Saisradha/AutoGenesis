"use client";

import Link from "next/link";
import { ArrowRight, Brain, Code2, Rocket, ArrowUpRight, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import Workspace from "@/components/Workspace";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";

const featureCards = [
  {
    icon: Brain,
    title: "Autonomous Agents",
    desc: "A swarm of specialized AI agents that collaborate to design, code, and test your application in real-time.",
    color: "#00C896",
    bg: "rgba(0,200,150,0.06)",
    border: "rgba(0,200,150,0.10)",
  },
  {
    icon: Code2,
    title: "Production-Ready Code",
    desc: "Generates high-quality, scalable code using modern frameworks like Next.js, Tailwind, and TypeScript.",
    color: "#7C4DFF",
    bg: "rgba(124,77,255,0.06)",
    border: "rgba(0,160,100,0.10)",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    desc: "Seamlessly deploys your generated application to global edge networks with zero downtime and instant previews.",
    color: "#00FF94",
    bg: "rgba(0,255,148,0.06)",
    border: "rgba(0,255,148,0.10)",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col overflow-hidden" style={{ background: "#020e08" }}>

      {/* HERO */}
      <Hero />

      {/* WORKSPACE IDE PREVIEW */}
      <Workspace />

      {/* CORE FEATURES */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              The{" "}
              <span style={{
                backgroundImage: "linear-gradient(120deg, #ffffff 0%, #6EFFC4 40%, #00FF94 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Operating System
              </span>
            </h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.4)" }}>
              Everything you need to ship products automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featureCards.map((card, i) => (
              <div
                key={i}
                className="aurora-glass-hover group cursor-pointer p-8 rounded-2xl"
              >
                <card.icon
                  className="w-8 h-8 mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: card.color }}
                />
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW LINKS SECTION */}
      <section className="py-24 relative z-10" style={{ background: "#06180f", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { label: "Architecture", sub: "Explore Engine", color: "#00C896", href: "/architecture" },
              { label: "About Us", sub: "Our Mission", color: "#7C4DFF", href: "/about" },
              { label: "Capabilities", sub: "View Features", color: "#00FF94", href: "/features" },
              { label: "Documentation", sub: "Read Docs", color: "#FF6EC7", href: "/docs" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group p-6 rounded-2xl flex flex-col justify-between h-40 transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
              >
                <h3 className="text-lg font-bold text-white">{item.label}</h3>
                <div className="flex items-center font-medium text-sm transition-transform group-hover:translate-x-2" style={{ color: item.color }}>
                  {item.sub} <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,200,150,0.05) 0%, rgba(124,77,255,0.04) 40%, transparent 70%)",
        }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Start building with autonomous AI.
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            From idea to production in minutes. No infrastructure to manage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="btn-aurora-primary relative overflow-hidden px-8 py-4 rounded-xl font-bold text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Building <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <Link
              href="/pricing"
              className="btn-aurora-secondary px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2"
            >
              View Pricing <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
