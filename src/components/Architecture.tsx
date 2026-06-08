"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Database, Globe, Code2, Paintbrush, FileText, Rocket, Cpu, Layers,
  ChevronDown, Activity, Zap, Server, GitBranch, Shield, BarChart3, Clock
} from "lucide-react";

// Agent definitions with expanded details
const agents = [
  {
    name: "Planner Agent",
    icon: Brain,
    color: "#F59E0B",
    status: "Active",
    tasks: 12,
    description: "Analyzes requirements, breaks down complex goals into tasks, and orchestrates the workflow across the swarm.",
    metrics: { latency: "45ms", throughput: "120 req/s", uptime: "100%" },
  },
  {
    name: "Code Agent",
    icon: Code2,
    color: "#A78BFA",
    status: "Running",
    tasks: 14,
    description: "Generates, refactors, and optimizes code across multiple languages and frameworks simultaneously.",
    metrics: { latency: "85ms", throughput: "1.2k lines/s", uptime: "99.99%" },
  },
  {
    name: "Design Agent",
    icon: Paintbrush,
    color: "#F472B6",
    status: "Active",
    tasks: 5,
    description: "Creates UI components, design systems, responsive layouts, and handles asset generation.",
    metrics: { latency: "200ms", throughput: "48 comp/min", uptime: "99.95%" },
  },
  {
    name: "Data Agent",
    icon: Database,
    color: "#34D399",
    status: "Idle",
    tasks: 3,
    description: "Manages databases, data pipelines, schema migrations, and real-time data synchronization.",
    metrics: { latency: "45ms", throughput: "10k ops/s", uptime: "99.99%" },
  },
  {
    name: "Deployment Agent",
    icon: Rocket,
    color: "#22D3EE",
    status: "Standby",
    tasks: 2,
    description: "Manages CI/CD pipelines, container orchestration, and zero-downtime deployments to edge networks.",
    metrics: { latency: "1.2s", throughput: "12 dep/hr", uptime: "99.98%" },
  },
  {
    name: "QA Agent",
    icon: Shield,
    color: "#10B981",
    status: "Active",
    tasks: 18,
    description: "Autonomously writes and executes unit, integration, and E2E tests before deployment.",
    metrics: { latency: "12ms", throughput: "500 tests/min", uptime: "100%" },
  },
];

// Infrastructure layers
const infraLayers = [
  { name: "User Interface", icon: Layers, color: "#60A5FA", desc: "Natural language & visual interface" },
  { name: "Memory Layer", icon: Database, color: "#34D399", desc: "Shared context & knowledge base" },
  { name: "Execution Engine", icon: Cpu, color: "#A78BFA", desc: "Task scheduling & resource allocation" },
  { name: "Security Layer", icon: Shield, color: "#F472B6", desc: "Auth, encryption & sandboxing" },
];

// Animated connection line between nodes
function FlowingConnection({ delay = 0, vertical = true, length = "100%" }: { delay?: number; vertical?: boolean; length?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${vertical ? "w-[2px]" : "h-[2px]"}`}
      style={vertical ? { height: length } : { width: length }}
    >
      {/* Base line */}
      <div className={`absolute inset-0 ${vertical ? "bg-gradient-to-b" : "bg-gradient-to-r"} from-purple-500/20 via-blue-500/20 to-purple-500/20`} />
      {/* Flowing particle */}
      <motion.div
        className={`absolute ${vertical ? "w-full h-8" : "h-full w-8"} rounded-full`}
        style={{
          background: vertical
            ? "linear-gradient(to bottom, transparent, rgba(139,92,246,0.8), transparent)"
            : "linear-gradient(to right, transparent, rgba(139,92,246,0.8), transparent)",
        }}
        animate={vertical ? { top: ["-20%", "120%"] } : { left: ["-20%", "120%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
      />
    </div>
  );
}

// Glowing node with pulse effect
function GlowNode({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <motion.div
        className="absolute rounded-full"
        style={{ width: size * 2.5, height: size * 2.5, background: color, opacity: 0.15 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.05, 0.15] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="rounded-full" style={{ width: size, height: size, background: color, boxShadow: `0 0 ${size}px ${color}` }} />
    </div>
  );
}

// Agent card with expandable details
function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors: Record<string, string> = {
    Active: "text-green-400",
    Running: "text-blue-400",
    Idle: "text-yellow-400",
    Standby: "text-cyan-400",
  };

  const statusDotColors: Record<string, string> = {
    Active: "bg-green-400",
    Running: "bg-blue-400",
    Idle: "bg-yellow-400",
    Standby: "bg-cyan-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer group"
    >
      <div
        className="relative rounded-2xl border transition-all duration-300 overflow-hidden"
        style={{
          borderColor: isExpanded ? `${agent.color}40` : "rgba(255,255,255,0.06)",
          background: isExpanded ? `${agent.color}08` : "rgba(255,255,255,0.02)",
        }}
      >
        {/* Top glow bar */}
        <div
          className="h-[2px] w-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(to right, transparent, ${agent.color}, transparent)`,
            opacity: isExpanded ? 1 : 0,
          }}
        />

        {/* Main content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}25` }}
              >
                <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">{agent.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${statusDotColors[agent.status]}`}
                    animate={agent.status === "Running" || agent.status === "Active" ? { opacity: [1, 0.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className={`text-[10px] font-medium ${statusColors[agent.status]}`}>{agent.status}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono">{agent.tasks} tasks</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>
          </div>

          {/* Live activity bar */}
          <div className="flex gap-0.5 h-4 items-end mb-1">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: `${agent.color}40` }}
                initial={{ height: "20%" }}
                animate={{ height: `${Math.random() * 80 + 20}%` }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 border-t border-white/[0.04] pt-4">
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{agent.description}</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(agent.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white/[0.03] rounded-lg p-2 text-center">
                      <div className="text-xs font-bold text-white">{value}</div>
                      <div className="text-[9px] text-slate-500 capitalize mt-0.5">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Architecture() {
  return (
    <section className="py-24 relative overflow-hidden" id="architecture">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
            <Activity className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-xs font-medium text-slate-400">Live Orchestration</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-5">
            Orchestration <span className="text-gradient-shine">Engine</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A real-time coordination layer that routes complex tasks to specialized agents, sharing context through a centralized memory architecture.
          </p>
        </motion.div>

        {/* ===== MAIN VISUALIZATION ===== */}
        <div className="max-w-6xl mx-auto relative">

          {/* ── Master Agent (Central Hub) ── */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 mb-16"
          >
            <div className="holographic-border mx-auto max-w-xl rounded-2xl">
              <div className="bg-[#060f09]/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,transparent_70%)]" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Glowing brain icon */}
                  <div className="relative mb-5">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-brand-purple/20 blur-xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.15, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 border border-brand-purple/30 flex items-center justify-center">
                      <Brain className="w-8 h-8 text-brand-purple" />
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Coordination Layer</h3>
                  <span className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-4">Master Agent</span>

                  {/* Live metrics row */}
                  <div className="flex items-center gap-4 md:gap-6 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span>Online</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>42 tasks/min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>24ms latency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Flowing Connection Lines (Master → Agents) ── */}
          {/* Desktop (3 columns) */}
          <div className="hidden lg:flex justify-center gap-0 mb-8 -mt-8 relative z-10">
            <div className="absolute left-1/2 -translate-x-1/2 top-0"><FlowingConnection delay={0} vertical length="40px" /></div>
            <div className="absolute top-[40px] left-[10%] right-[10%]"><FlowingConnection delay={0.3} vertical={false} length="100%" /></div>
            <div className="absolute top-[40px] left-[16.6%] -translate-x-1/2"><FlowingConnection delay={0.6} vertical length="30px" /></div>
            <div className="absolute top-[40px] left-[50%] -translate-x-1/2"><FlowingConnection delay={0.8} vertical length="30px" /></div>
            <div className="absolute top-[40px] right-[16.6%] translate-x-1/2"><FlowingConnection delay={1.0} vertical length="30px" /></div>
          </div>

          {/* Tablet (2 columns) */}
          <div className="hidden sm:flex lg:hidden justify-center gap-0 mb-8 -mt-8 relative z-10">
            <div className="absolute left-1/2 -translate-x-1/2 top-0"><FlowingConnection delay={0} vertical length="40px" /></div>
            <div className="absolute top-[40px] left-[25%] right-[25%]"><FlowingConnection delay={0.3} vertical={false} length="100%" /></div>
            <div className="absolute top-[40px] left-[25%] -translate-x-1/2"><FlowingConnection delay={0.6} vertical length="30px" /></div>
            <div className="absolute top-[40px] right-[25%] translate-x-1/2"><FlowingConnection delay={0.8} vertical length="30px" /></div>
          </div>

          {/* Mobile connection indicator */}
          <div className="sm:hidden flex justify-center mb-6 -mt-6">
            <FlowingConnection delay={0} vertical length="40px" />
          </div>

          {/* ── Agent Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 relative z-10"
          >
            {agents.map((agent, i) => (
              <AgentCard key={agent.name} agent={agent} index={i} />
            ))}
          </motion.div>

          {/* ── Flowing Connection (Agents → Infrastructure) ── */}
          <div className="flex justify-center mb-8">
            <FlowingConnection delay={0.5} vertical length="50px" />
          </div>

          {/* ── Infrastructure Layer ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <Server className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Infrastructure</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {infraLayers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/[0.12] transition-colors cursor-pointer relative overflow-hidden"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${layer.color}10, transparent 70%)` }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <GlowNode color={layer.color} size={8} />
                      <layer.icon className="w-4 h-4" style={{ color: layer.color }} />
                    </div>
                    <div className="font-semibold text-sm text-white mb-1">{layer.name}</div>
                    <div className="text-[10px] text-slate-500 leading-relaxed">{layer.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Background Flowing Particles ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#3B82F6" : "#34D399",
                  left: `${8 + (i * 8)}%`,
                  top: "5%",
                  boxShadow: `0 0 6px ${i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#3B82F6" : "#34D399"}`,
                }}
                animate={{
                  y: [0, 800],
                  opacity: [0, 0.8, 0.8, 0],
                  x: [0, Math.sin(i) * 40],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* ── System Status Bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[11px] text-slate-500"
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
              <span>6 Agents Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-slate-600" />
              <span>v1.0.0-stable</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              <span>E2E Encrypted</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
