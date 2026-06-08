"use client";

import { motion } from "framer-motion";
import { MessageSquare, LayoutTemplate, Users, Code, CheckSquare, Rocket, GitCommit } from "lucide-react";

const steps = [
  { id: 1, name: "Neural Prompt", desc: "Intent capture", icon: MessageSquare, color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", shadow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]" },
  { id: 2, name: "Auto-Planning", desc: "Architecture generation", icon: LayoutTemplate, color: "text-indigo-400", border: "border-indigo-400/30", bg: "bg-indigo-400/10", shadow: "shadow-[0_0_20px_rgba(129,140,248,0.15)]" },
  { id: 3, name: "Swarm Init", desc: "Agent assignment", icon: Users, color: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/10", shadow: "shadow-[0_0_20px_rgba(192,132,252,0.15)]" },
  { id: 4, name: "Live Synthesis", desc: "Parallel coding", icon: Code, color: "text-fuchsia-400", border: "border-fuchsia-400/30", bg: "bg-fuchsia-400/10", shadow: "shadow-[0_0_20px_rgba(232,121,249,0.15)]" },
  { id: 5, name: "Verification", desc: "Automated testing", icon: CheckSquare, color: "text-pink-400", border: "border-pink-400/30", bg: "bg-pink-400/10", shadow: "shadow-[0_0_20px_rgba(244,114,182,0.15)]" },
  { id: 6, name: "Zero-Downtime", desc: "Edge deployment", icon: Rocket, color: "text-rose-400", border: "border-rose-400/30", bg: "bg-rose-400/10", shadow: "shadow-[0_0_20px_rgba(251,113,133,0.15)]" },
];

export default function LiveExecution() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#05020D]" id="execution">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6"
          >
            <GitCommit className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Execution Flow</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Autonomous <span className="text-gradient-shine">Pipeline</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            From idea to production in a continuous, automated flow. No manual intervention required.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto relative py-16">
          {/* Animated Connecting Line (Desktop) */}
          <div 
            className="hidden lg:block absolute top-1/2 h-[2px] bg-white/[0.05] -translate-y-1/2 rounded-full overflow-hidden"
            style={{ left: '64px', right: '64px' }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-accent shadow-[0_0_20px_#8B5CF6]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-0 relative z-10 px-4 lg:px-0">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative group">
                
                {/* Vertical Line for Mobile/Tablet */}
                <div className="lg:hidden w-px h-12 bg-gradient-to-b from-brand-purple to-transparent opacity-50 my-2" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.4 + 0.2, duration: 0.5, type: "spring" }}
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl lg:rounded-[2rem] bg-[#060f09]/80 backdrop-blur-xl flex items-center justify-center border border-white/10 ${step.shadow} relative z-10 mb-6 group-hover:-translate-y-2 transition-transform duration-300`}
                >
                  <div className={`absolute inset-0 rounded-2xl lg:rounded-[2rem] ${step.bg} opacity-50`} />
                  <step.icon className={`w-8 h-8 lg:w-10 lg:h-10 ${step.color} relative z-10`} />
                  
                  {/* Active Pulse Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl md:rounded-[2rem] border ${step.border}`}
                    initial={{ opacity: 0, scale: 1 }}
                    whileInView={{ opacity: [0, 1, 0], scale: [1, 1.3, 1.5] }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.4 + 1, duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.4 + 0.4, duration: 0.4 }}
                  className="text-center w-32"
                >
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phase 0{step.id}</div>
                  <div className="text-base font-bold text-white mb-1">{step.name}</div>
                  <div className="text-xs text-slate-400">{step.desc}</div>
                </motion.div>

              </div>
            ))}
          </div>
          
          {/* Active Data Packets Traveling on Line (Desktop) */}
          <div 
            className="hidden lg:block absolute top-1/2 h-[2px] -translate-y-1/2 overflow-hidden pointer-events-none"
            style={{ left: '64px', right: '64px' }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-12 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(to right, transparent, white, transparent)",
                  boxShadow: "0 0 10px 2px rgba(255,255,255,0.5)"
                }}
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
