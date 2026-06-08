"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, FileCode, Terminal, MessageSquare, Layout, PlayCircle, Loader2, 
  CheckCircle2, ChevronRight, Activity, Search, Settings, Cpu, Globe, 
  Box, History, Sparkles, X, Menu, Maximize2, Share2, Rocket, Code2, 
  Database, Eye, ListFilter, Braces, TerminalSquare, AlertCircle, ChevronDown, Brain, ShieldCheck
} from "lucide-react";

type SimState = "IDLE" | "PLANNING" | "CODING" | "TESTING" | "DEPLOYING" | "SUCCESS";

export default function Workspace() {
  const [activeTab, setActiveTab] = useState("App.tsx");
  const [simState, setSimState] = useState<SimState>("IDLE");
  const [prompt, setPrompt] = useState("");
  
  // Terminal logs state
  const [terminalLogs, setTerminalLogs] = useState<any[]>([]);
  const [deployLogs, setDeployLogs] = useState<any[]>([]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const deployContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  useEffect(() => {
    if (deployContainerRef.current) {
      deployContainerRef.current.scrollTop = deployContainerRef.current.scrollHeight;
    }
  }, [deployLogs]);

  // Simulation State Machine
  useEffect(() => {
    if (simState === "IDLE") {
      setTerminalLogs([{ time: new Date().toLocaleTimeString().split(' ')[0], msg: "AutoGenesis engine ready. Waiting for prompt...", type: "info" }]);
      setDeployLogs([{ time: new Date().toLocaleTimeString().split(' ')[0], msg: "Edge network online. 0 active deployments.", type: "info" }]);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];

    if (simState === "PLANNING") {
      setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: `Received prompt: "${prompt || 'Build an interactive dashboard'}"`, type: "info" }]);
      
      timeouts.push(setTimeout(() => {
        setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Planner Agent: Decomposing intent into architecture tree...", type: "reasoning" }]);
      }, 500));
      
      timeouts.push(setTimeout(() => {
        setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Planner Agent: Identified 3 core components. Assigning tasks to swarm...", type: "success" }]);
      }, 1500));

      timeouts.push(setTimeout(() => setSimState("CODING"), 2500));
    }

    if (simState === "CODING") {
      setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Code Agent: Initializing live synthesis for App.tsx...", type: "info" }]);
      timeouts.push(setTimeout(() => setSimState("TESTING"), 3500)); // Coding takes 3.5s (streaming UI will run)
    }

    if (simState === "TESTING") {
      setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "QA Agent: Spawning isolated test environment...", type: "reasoning" }]);
      
      timeouts.push(setTimeout(() => {
        setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "QA Agent: Executing 42 unit tests & 3 E2E flows...", type: "info" }]);
      }, 800));

      timeouts.push(setTimeout(() => {
        setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "✓ All 45 tests passed. Coverage: 98.4%", type: "success" }]);
      }, 1800));

      timeouts.push(setTimeout(() => setSimState("DEPLOYING"), 2500));
    }

    if (simState === "DEPLOYING") {
      setTerminalLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Deploy Agent: Handing over verified artifact to edge network...", type: "info" }]);
      
      setDeployLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Initiating zero-downtime deployment...", type: "info" }]);
      
      timeouts.push(setTimeout(() => {
        setDeployLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Building production bundle (gzip: 42kb)...", type: "reasoning" }]);
      }, 800));

      timeouts.push(setTimeout(() => {
        setDeployLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Distributing to 14 global edge nodes...", type: "reasoning" }]);
      }, 1600));

      timeouts.push(setTimeout(() => {
        setDeployLogs(prev => [...prev, { time: new Date().toLocaleTimeString().split(' ')[0], msg: "Deployment complete. Live at https://auto-genesis.dev/app", type: "success" }]);
        setSimState("SUCCESS");
      }, 2500));
    }

    if (simState === "SUCCESS") {
      timeouts.push(setTimeout(() => {
        setSimState("IDLE");
      }, 5000));
    }

    return () => timeouts.forEach(clearTimeout);
  }, [simState]);

  const handleDeploy = () => {
    if (simState === "IDLE") {
      setSimState("PLANNING");
    }
  };

  const isGeneratingCode = simState === "CODING";

  return (
    <section className="py-24 relative overflow-hidden" id="workspace" style={{ background: "#020e08" }}>
      {/* Cinematic Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(0,200,150,0.03)", filter: "blur(120px)" }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(124,77,255,0.03)", filter: "blur(120px)" }} />

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.15)" }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: "#00C896" }} />
            <span className="text-xs font-medium" style={{ color: "#00C896" }}>Next-Gen AI IDE</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The <span style={{ backgroundImage: "linear-gradient(120deg, #ffffff, #6EFFC4, #00FF94)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Command Center</span></h2>
          <p className="max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>A full-stack autonomous workspace where your vision meets execution. From prompt to production in one interface.</p>
        </div>

        {/* FULL SCREEN IDE INTERFACE MOCKUP */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[1400px] mx-auto rounded-2xl border border-white/10 bg-[#030a06] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col aspect-[16/10] md:aspect-auto md:h-[850px]"
        >
          {/* ── TOP BAR (AI Prompt & Controls) ── */}
          <div className="h-14 border-b border-white/5 bg-[#071510] flex items-center justify-between px-4 z-30">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                <Cpu className="w-3.5 h-3.5" style={{ color: "#00C896" }} />
                <span className="font-medium">Model: AutoGenesis-4-Max</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Sparkles className="w-4 h-4 animate-pulse" style={{ color: "#00C896" }} />
              </div>
              <input 
                type="text"
                placeholder="Describe what you want to build (e.g., 'Build a real-time crypto dashboard')..."
                className="w-full rounded-xl py-2 pl-10 pr-4 text-sm text-white/80 placeholder:text-white/25 focus:outline-none transition-all disabled:opacity-50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,200,150,0.2)" }}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={simState !== "IDLE"}
                onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
              />
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleDeploy}
                disabled={simState !== "IDLE"}
                className="btn-aurora-primary relative overflow-hidden px-4 py-1.5 rounded-lg text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] justify-center"
              >
                {simState === "IDLE" ? <><Rocket className="w-3 h-3" /> Execute</> : 
                 simState === "SUCCESS" ? <><CheckCircle2 className="w-3 h-3" /> Done</> :
                 <><Loader2 className="w-3 h-3 animate-spin" /> Running</>}
              </button>
            </div>
          </div>

          {/* ── MAIN WORKSPACE AREA (LEFT | CENTER | RIGHT) ── */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* LEFT SIDEBAR (Explorer & Agents) */}
            <div className="hidden lg:flex w-72 border-r border-white/5 bg-[#060f09] flex-col overflow-hidden">
              {/* Project Explorer */}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Explorer</span>
                  <div className="flex gap-2">
                    <Folder className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
                    <FileCode className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-slate-400">
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-white/5 cursor-pointer">
                    <ChevronRight className="w-4 h-4" /> <Folder className="w-4 h-4 text-blue-400/80" /> <span>src</span>
                  </div>
                  <div className="space-y-1 ml-4">
                    <div className="flex items-center gap-2 p-1.5 rounded hover:bg-white/5 cursor-pointer">
                      <ChevronRight className="w-4 h-4" /> <Folder className="w-4 h-4 text-blue-400/80" /> <span>components</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded cursor-pointer" style={{ background: "rgba(0,200,150,0.08)", color: "#00C896", border: "1px solid rgba(0,200,150,0.15)" }}>
                      <Braces className="w-4 h-4" /> <span>App.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 rounded hover:bg-white/5 cursor-pointer">
                      <FileCode className="w-4 h-4 text-blue-300/80" /> <span>ThemeContext.ts</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 rounded hover:bg-white/5 cursor-pointer">
                    <ChevronRight className="w-4 h-4" /> <Folder className="w-4 h-4 text-slate-600" /> <span className="text-slate-500">public</span>
                  </div>
                </div>
              </div>

              {/* AI Agents Monitoring */}
              <div className="h-56 border-t border-white/5 p-4 bg-black/20">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                  <span>AI Swarm Status</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${simState !== "IDLE" ? "bg-green-400 animate-pulse" : "bg-slate-500"}`} />
                    <span className={`text-[8px] ${simState !== "IDLE" ? "text-green-400/70" : "text-slate-500"}`}>{simState !== "IDLE" ? "Active" : "Standby"}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* Planner Agent */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border ${simState === "PLANNING" ? "border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]" : "border-white/10"}`}>
                        <Brain className={`w-4 h-4 ${simState === "PLANNING" ? "text-amber-400" : "text-slate-500"}`} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">Planner</div>
                        <div className="text-[9px] text-slate-500">{simState === "PLANNING" ? "Decomposing..." : "Standby"}</div>
                      </div>
                    </div>
                    {simState === "PLANNING" && <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />}
                  </div>
                  
                  {/* Code Agent */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border ${simState === "CODING" ? "border-fuchsia-400/50 shadow-[0_0_10px_rgba(232,121,249,0.2)]" : "border-white/10"}`}>
                        <Code2 className={`w-4 h-4 ${simState === "CODING" ? "text-fuchsia-400" : "text-slate-500"}`} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">CodeAgent</div>
                        <div className="text-[9px] text-slate-500">{simState === "CODING" ? "Synthesizing..." : "Standby"}</div>
                      </div>
                    </div>
                    {simState === "CODING" && <Loader2 className="w-3 h-3 text-fuchsia-400 animate-spin" />}
                  </div>

                  {/* QA Agent */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border ${simState === "TESTING" ? "border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "border-white/10"}`}>
                        <ShieldCheck className={`w-4 h-4 ${simState === "TESTING" ? "text-emerald-400" : "text-slate-500"}`} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-300">QA Bot</div>
                        <div className="text-[9px] text-slate-500">{simState === "TESTING" ? "Verifying..." : "Standby"}</div>
                      </div>
                    </div>
                    {simState === "TESTING" && <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />}
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER PANEL (Editor & Generation) */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#060f09]">
              {/* Editor Tabs */}
              <div className="h-10 bg-[#071510] border-b border-white/5 flex items-center">
                <div className={`h-full px-4 flex items-center gap-2 text-xs font-medium border-r border-white/5 ${activeTab === 'App.tsx' ? 'bg-[#060f09] border-t-2' : 'text-slate-500 hover:text-slate-300 cursor-pointer'}`} style={activeTab === 'App.tsx' ? { color: '#00C896', borderTopColor: '#00C896' } : {}}>
                  <Braces className="w-3.5 h-3.5" /> App.tsx <X className="w-3 h-3 ml-2 opacity-30" />
                </div>
                <div className={`h-full px-4 flex items-center gap-2 text-xs font-medium border-r border-white/5 text-slate-500 hover:text-slate-300 cursor-pointer`}>
                  <FileCode className="w-3.5 h-3.5" /> global.css
                </div>
                <div className="flex-1" />
                <div className="px-4 flex gap-3 text-slate-500">
                  <Search className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Code Surface */}
              <div className="flex-1 overflow-auto font-mono text-sm p-6 relative">
                <div className="absolute top-6 left-6 bottom-6 w-10 text-slate-600 text-xs text-right pr-4 select-none leading-6">
                  {Array.from({ length: 24 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <div className="ml-10 space-y-0.5 leading-6 text-slate-300 min-w-[500px]">
                  <div><span style={{ color: "#00C896" }}>import</span> {'{ useState, useEffect }'} <span style={{ color: "#00C896" }}>from</span> <span className="text-emerald-400">"react"</span>;</div>
                  <div><span style={{ color: "#00C896" }}>import</span> {'{ motion }'} <span style={{ color: "#00C896" }}>from</span> <span className="text-emerald-400">"framer-motion"</span>;</div>
                  <div className="h-6" />
                  <div><span style={{ color: "#00C896" }}>export default function</span> <span className="text-yellow-200">App</span>() {'{'}</div>
                  <div className="pl-6"><span className="text-blue-400">const</span> [isLoaded, setIsLoaded] = <span className="text-yellow-200">useState</span>(<span className="text-orange-400">false</span>);</div>
                  <div className="h-6" />
                  <div className="pl-6 text-white/25 italic">// AI Generated Logic Layer</div>
                  <div className="pl-6" style={{ color: "#00C896" }}>useEffect(() =&gt; {'{'}</div>
                  <div className="pl-12 text-yellow-200">setTimeout(() =&gt; setIsLoaded(<span className="text-orange-400">true</span>), <span className="text-emerald-400">1000</span>);</div>
                  <div className="pl-6">{'}'}, []);</div>
                  <div className="h-6" />
                  <div className="pl-6" style={{ color: "#00C896" }}>return (</div>
                  
                  {/* GENERATION STREAMING MOCKUP */}
                  <AnimatePresence>
                    {(isGeneratingCode || simState === "TESTING" || simState === "DEPLOYING" || simState === "SUCCESS") ? (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="pl-12 bg-fuchsia-400/10 border-l-2 border-fuchsia-400"
                      >
                        <div className="flex items-center gap-2 py-0.5">
                          <span className="text-slate-400">&lt;</span>
                          <span className="text-red-400">motion.div</span>
                        </div>
                        <div className="pl-6 text-blue-400">initial<span className="text-slate-400">={'{'} {'{'} opacity: <span className="text-emerald-400">0</span> {'}'} {'}'}</span></div>
                        <div className="pl-6 text-blue-400">animate<span className="text-slate-400">={'{'} {'{'} opacity: <span className="text-emerald-400">1</span> {'}'} {'}'}</span></div>
                        <div className="flex items-center gap-2 py-0.5">
                          <span className="text-slate-400">&gt;</span>
                        </div>
                        <div className="pl-6 text-slate-200">
                          {prompt ? `Dynamic Content: ${prompt}` : "Interactive Dashboard Loaded"}
                        </div>
                        <div className="flex items-center gap-2 py-0.5">
                          <span className="text-slate-400">&lt;/</span>
                          <span className="text-red-400">motion.div</span>
                          <span className="text-slate-400">&gt;</span>
                          {isGeneratingCode && (
                            <motion.div 
                              animate={{ opacity: [1, 0, 1] }} 
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="w-1.5 h-4 bg-fuchsia-400 inline-block ml-1"
                            />
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="pl-12 text-slate-400">&lt;<span className="text-red-400">div</span> <span className="text-blue-400">className</span>=<span className="text-emerald-400">"container"</span>&gt;...&lt;/<span className="text-red-400">div</span>&gt;</div>
                    )}
                  </AnimatePresence>
                  <div className="pl-6" style={{ color: "#00C896" }}>);</div>
                  <div>{'}'}</div>
                </div>

                {/* Floating State Indicator */}
                <AnimatePresence>
                  {simState !== "IDLE" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-[#060f09]/80 border border-white/10 backdrop-blur-md flex items-center gap-3 shadow-xl"
                    >
                      {simState === "SUCCESS" ? (
                         <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#00C896" }} />
                      )}
                      <span className="text-xs font-medium text-slate-200">
                        {simState === "PLANNING" && "Planner: Architecting Solution..."}
                        {simState === "CODING" && "CodeAgent: Synthesizing React Components..."}
                        {simState === "TESTING" && "QA Bot: Verifying Test Suites..."}
                        {simState === "DEPLOYING" && "Deploy Agent: Pushing to Edge..."}
                        {simState === "SUCCESS" && "Deployment Live!"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTTOM PANEL (Terminal) */}
              <div className="h-48 border-t border-white/5 bg-[#030a06] flex flex-col">
                <div className="h-9 border-b border-white/5 flex items-center px-4 gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-200 border-b-2 h-full" style={{ borderBottomColor: "#00C896" }}>
                    <TerminalSquare className="w-3.5 h-3.5" /> TERMINAL
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-slate-300 cursor-pointer">
                    <Activity className="w-3.5 h-3.5" /> AI REASONING
                  </div>
                </div>
                <div ref={terminalContainerRef} className="flex-1 p-4 font-mono text-[11px] space-y-1 overflow-auto custom-scrollbar scroll-smooth">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-slate-600 shrink-0">[{log.time}]</span>
                      {log.type === 'reasoning' && <span className="text-amber-400/80 animate-pulse">➤ {log.msg}</span>}
                      {log.type === 'info' && <span className="text-slate-300">{log.msg}</span>}
                      {log.type === 'success' && <span className="text-emerald-400">{log.msg}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR (Preview & Logs) */}
            <div className="hidden xl:flex w-[400px] border-l border-white/5 bg-[#060f09] flex-col overflow-hidden">
              {/* Live Preview Browser */}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
                  <div className="flex gap-3">
                    <Globe className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
                    <Share2 className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
                  </div>
                </div>
                <div className="flex-1 rounded-xl border border-white/10 bg-[#071510] overflow-hidden flex flex-col shadow-inner">
                  <div className="h-8 bg-white/5 flex items-center px-3 gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                      <div className="w-2 h-2 rounded-full bg-slate-600" />
                    </div>
                    <div className="flex-1 bg-black/40 rounded-md h-5 px-2 flex items-center text-[9px] text-slate-500">
                      auto-genesis.dev/app
                    </div>
                    <History className="w-3 h-3 text-slate-500" />
                  </div>
                  
                  {/* Browser Content Mockup */}
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                    {simState === "SUCCESS" || simState === "DEPLOYING" ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full rounded-lg flex items-center justify-center text-xs p-4" style={{ border: "1px solid rgba(0,200,150,0.15)", background: "rgba(0,200,150,0.04)", color: "#00C896", boxShadow: "0 0 30px rgba(0,200,150,0.08)" }}
                      >
                        {prompt ? prompt : "Dashboard UI Loaded"}
                      </motion.div>
                    ) : (
                      <motion.div 
                        animate={isGeneratingCode ? { scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                      >
                        <Eye className="w-10 h-10 text-slate-600" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Logs & Deployment Panel */}
              <div className="h-64 border-t border-white/5 p-4 bg-black/20 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Deployment Logs</span>
                  <Rocket className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div ref={deployContainerRef} className="flex-1 space-y-3 overflow-auto pr-2 custom-scrollbar font-mono scroll-smooth">
                  {deployLogs.map((log, i) => (
                    <div key={i} className="flex gap-3 text-[10px]">
                      <span className="text-slate-600 shrink-0">{log.time}</span>
                      <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'reasoning' ? 'text-amber-400' : 'text-slate-400'}>{log.msg}</span>
                    </div>
                  ))}
                </div>
                <button 
                  className={`mt-4 w-full py-2.5 rounded-xl border text-xs font-bold transition-colors ${simState === "SUCCESS" ? "text-white" : "bg-white/5 border-white/10 text-slate-400"}`}
                  style={simState === "SUCCESS" ? { background: "linear-gradient(135deg,#00C896,#7C4DFF)", border: "1px solid rgba(0,200,150,0.3)", boxShadow: "0 0 20px rgba(0,200,150,0.2)" } : {}}
                >
                  {simState === "SUCCESS" ? "Open Live App" : "Waiting for deployment..."}
                </button>
              </div>
            </div>
          </div>

          {/* ── FOOTER STATUS BAR ── */}
          <div className="h-7 bg-[#020806] border-t border-white/5 flex items-center px-4 justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider z-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                <GitBranch className="w-3 h-3" style={{ color: "#00C896" }} /> main*
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> UTF-8
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${simState !== "IDLE" ? "bg-amber-400 animate-pulse" : "bg-slate-500"}`} />
                {simState !== "IDLE" ? "Swarm Active" : "Auto-Save On"}
              </div>
              <span className="opacity-70">v1.0.4-LTS</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

function GitBranch(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}
