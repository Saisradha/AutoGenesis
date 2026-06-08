"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Paintbrush, Database, Rocket, Shield, Activity } from "lucide-react";

const agents = [
  { name: "Planner Agent", icon: Brain, color: "#F59E0B", status: "Active", tasks: 12, description: "Analyzes requirements, breaks down complex goals into tasks, and orchestrates the workflow across the swarm.", metrics: { latency: "45ms", throughput: "120 req/s", uptime: "100%" } },
  { name: "Code Agent", icon: Code2, color: "#A78BFA", status: "Running", tasks: 14, description: "Generates, refactors, and optimizes code across multiple languages and frameworks simultaneously.", metrics: { latency: "85ms", throughput: "1.2k lines/s", uptime: "99.99%" } },
  { name: "Design Agent", icon: Paintbrush, color: "#F472B6", status: "Active", tasks: 5, description: "Creates UI components, design systems, responsive layouts, and handles asset generation.", metrics: { latency: "200ms", throughput: "48 comp/min", uptime: "99.95%" } },
  { name: "Data Agent", icon: Database, color: "#34D399", status: "Idle", tasks: 3, description: "Manages databases, data pipelines, schema migrations, and real-time data synchronization.", metrics: { latency: "45ms", throughput: "10k ops/s", uptime: "99.99%" } },
  { name: "Deployment Agent", icon: Rocket, color: "#22D3EE", status: "Standby", tasks: 2, description: "Manages CI/CD pipelines, container orchestration, and zero-downtime deployments to edge networks.", metrics: { latency: "1.2s", throughput: "12 dep/hr", uptime: "99.98%" } },
  { name: "QA Agent", icon: Shield, color: "#10B981", status: "Active", tasks: 18, description: "Autonomously writes and executes unit, integration, and E2E tests before deployment.", metrics: { latency: "12ms", throughput: "500 tests/min", uptime: "100%" } },
];

export default function AgentsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#05020D]">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6">
            <Activity className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-xs font-medium text-slate-400">Swarm Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Specialized <span className="text-gradient-shine">AI Agents</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Meet the multi-agent intelligence system. Each agent is a highly specialized AI model fine-tuned for specific software engineering tasks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-premium rounded-2xl p-6 group hover-glow-premium"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110" style={{ background: `${agent.color}15`, borderColor: `${agent.color}30` }}>
                  <agent.icon className="w-7 h-7" style={{ color: agent.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: agent.status === "Active" || agent.status === "Running" ? "#4ADE80" : "#FBBF24" }}></span>
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: agent.status === "Active" || agent.status === "Running" ? "#4ADE80" : "#FBBF24" }}></span>
                    </span>
                    <span className="text-xs text-slate-400">{agent.status}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-6 h-16 leading-relaxed">{agent.description}</p>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {Object.entries(agent.metrics).map(([key, val]) => (
                  <div key={key} className="text-center">
                    <div className="text-sm font-bold text-white mb-1">{val}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{key}</div>
                  </div>
                ))}
              </div>

              {/* Activity Bar */}
              <div className="mt-6 flex gap-1 h-6 items-end p-2 bg-black/20 rounded-lg">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ background: `${agent.color}60` }}
                    animate={{ height: agent.status === "Active" || agent.status === "Running" ? `${Math.random() * 80 + 20}%` : "20%" }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
