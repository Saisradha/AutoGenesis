"use client";

import { motion } from "framer-motion";
import { Network, Zap, GitBranch, Cpu, ShieldCheck, HardDrive, Sparkles } from "lucide-react";

const features = [
  {
    title: "Autonomous Planning",
    description: "Input a simple prompt and the Master Agent generates a comprehensive product roadmap, architecture, and task breakdown automatically.",
    icon: Network,
    color: "#00C896",
    glow: "rgba(0,200,150,0.18)",
    delay: 0.1,
  },
  {
    title: "Multi-Agent Orchestration",
    description: "A coordinated swarm of specialized AI agents working in parallel to design, code, and review components simultaneously.",
    icon: GitBranch,
    color: "#7C4DFF",
    glow: "rgba(124,77,255,0.15)",
    delay: 0.2,
  },
  {
    title: "Real-Time Code Generation",
    description: "Watch your application come to life line by line with instantaneous, context-aware code synthesis powered by advanced LLMs.",
    icon: Zap,
    color: "#00FF94",
    glow: "rgba(0,255,148,0.15)",
    delay: 0.3,
  },
  {
    title: "Deployment Automation",
    description: "Seamlessly push from generated code to production with built-in CI/CD pipelines managed entirely by the Deploy Agent.",
    icon: Cpu,
    color: "#FF6EC7",
    glow: "rgba(255,110,199,0.12)",
    delay: 0.4,
  },
  {
    title: "Persistent AI Memory",
    description: "Continuous context sharing across sessions ensures agents never lose track of project history, dependencies, or user preferences.",
    icon: HardDrive,
    color: "#6EFFC4",
    glow: "rgba(139,233,253,0.15)",
    delay: 0.5,
  },
  {
    title: "Continuous Verification",
    description: "Automated test generation and execution ensures robust, bug-free software before any code hits the main branch.",
    icon: ShieldCheck,
    color: "#00B87A",
    glow: "rgba(0,184,122,0.15)",
    delay: 0.6,
  },
];

export default function Features() {
  return (
    <section className="py-36 relative overflow-hidden" id="features"
      style={{ background: "#020e08" }}
    >
      {/* Ambient aurora glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,200,150,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00C896]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Core Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Unmatched </span>
            <span style={{
              backgroundImage: "linear-gradient(120deg, #ffffff 0%, #6EFFC4 40%, #00FF94 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Intelligence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Everything you need to turn ideas into production-ready software in minutes.
            Powered by autonomous AI agents that never sleep.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: feature.delay }}
              className="group relative"
            >
              <div
                className="aurora-glass-hover rounded-3xl p-8 h-full flex flex-col"
              >
                {/* Icon */}
                <div className="mb-7 relative inline-flex">
                  <motion.div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ backgroundColor: feature.color }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center border border-white/[0.08] group-hover:scale-110 transition-transform duration-400"
                    style={{ background: `${feature.color}12` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {feature.description}
                </p>

                <div
                  className="mt-7 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  style={{ color: feature.color }}
                >
                  Explore
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
