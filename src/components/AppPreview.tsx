"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Monitor, Smartphone, Globe, Activity, Users, DollarSign, 
  ArrowUpRight, ArrowDownRight, Layers, BarChart3, LineChart,
  LayoutDashboard, Settings, Bell, Search, CheckCircle2,
  Sparkles
} from "lucide-react";

export default function AppPreview() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isRendering, setIsRendering] = useState(true);

  // Re-trigger animation when switching devices
  useEffect(() => {
    setIsRendering(true);
    const timer = setTimeout(() => setIsRendering(false), 2000);
    return () => clearTimeout(timer);
  }, [device]);

  // Mock data for charts
  const lineChartData = Array.from({ length: 12 }, () => Math.random() * 60 + 40);
  const barChartData = Array.from({ length: 6 }, () => Math.random() * 80 + 20);

  return (
    <section className="py-32 relative overflow-hidden bg-[#05020D]" id="preview">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-blue" />
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">Live Generation</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Production-Ready <span className="text-gradient-shine">Interfaces</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Watch the AI dynamically render complex SaaS dashboards, charts, and responsive layouts instantly.
          </motion.p>
        </div>

        {/* Device Toggle */}
        <div className="flex justify-center mb-8 relative z-20">
          <div className="flex p-1 bg-white/[0.02] border border-white/5 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setDevice("desktop")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                device === "desktop" 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Monitor className="w-4 h-4" /> Desktop
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                device === "mobile" 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Smartphone className="w-4 h-4" /> Mobile
            </button>
          </div>
        </div>

        {/* Preview Container */}
        <div className="relative flex justify-center max-w-6xl mx-auto h-[600px] md:h-[700px] perspective-[2000px]">
          
          {/* Main Mockup Container */}
          <motion.div
            layout
            initial={false}
            animate={{
              width: device === "desktop" ? "100%" : "min(375px, 100vw - 32px)",
              height: device === "desktop" ? "100%" : "812px",
              scale: device === "mobile" ? 0.8 : 1,
              rotateX: device === "desktop" ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`relative rounded-[2rem] border overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform-style-3d origin-bottom ${
              device === "mobile" ? "border-slate-700 bg-black border-[8px]" : "border-white/10 bg-[#060f09]"
            }`}
          >
            {/* Desktop Browser Chrome */}
            {device === "desktop" && (
              <div className="h-12 bg-[#020806] border-b border-white/5 flex items-center px-4 relative z-20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-md text-xs text-slate-400">
                  <Globe className="w-3 h-3" /> https://dashboard.autogenesis.ai
                </div>
              </div>
            )}

            {/* Mobile Notch */}
            {device === "mobile" && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-30" />
            )}

            {/* Generated App UI */}
            <div className={`relative h-full flex bg-[#F8FAFC] overflow-hidden ${device === "mobile" ? "pt-8" : ""}`}>
              
              {/* Sidebar (Desktop only) */}
              <AnimatePresence>
                {device === "desktop" && (
                  <motion.div 
                    initial={{ x: -200 }}
                    animate={{ x: 0 }}
                    exit={{ x: -200 }}
                    className="w-64 bg-white border-r border-slate-200 flex flex-col p-4 shrink-0"
                  >
                    <div className="flex items-center gap-2 mb-10 font-bold text-slate-800">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Layers className="w-4 h-4" />
                      </div>
                      Acme Corp
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm">
                        <BarChart3 className="w-4 h-4" /> Analytics
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm">
                        <Users className="w-4 h-4" /> Customers
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-slate-50 rounded-lg font-medium text-sm">
                        <Settings className="w-4 h-4" /> Settings
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Nav */}
                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                  <div className="font-semibold text-slate-800 text-lg">Overview</div>
                  <div className="flex items-center gap-4 text-slate-500">
                    <Search className="w-5 h-5 hidden sm:block" />
                    <Bell className="w-5 h-5" />
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                  </div>
                </div>

                {/* Dashboard Scroll Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                  
                  {/* KPI Cards */}
                  <div className={`grid gap-4 ${device === "desktop" ? "grid-cols-3" : "grid-cols-1"}`}>
                    {[
                      { title: "Total Revenue", val: "$124,563", icon: DollarSign, trend: "+14.5%", up: true },
                      { title: "Active Users", val: "8,234", icon: Users, trend: "+5.2%", up: true },
                      { title: "Bounce Rate", val: "12.4%", icon: Activity, trend: "-2.1%", up: false },
                    ].map((kpi, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRendering ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-slate-500">{kpi.title}</span>
                          <div className="p-2 bg-slate-50 rounded-lg"><kpi.icon className="w-4 h-4 text-slate-600" /></div>
                        </div>
                        <div className="text-2xl font-bold text-slate-800 mb-2">{kpi.val}</div>
                        <div className={`flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {kpi.trend} from last month
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isRendering ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-slate-800">Revenue Growth</h3>
                      <LineChart className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="h-48 flex items-end gap-2 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                        {[1,2,3,4,5].map(x => <div key={x} className="w-full h-px bg-slate-300" />)}
                      </div>
                      
                      {lineChartData.map((val, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={isRendering ? { height: 0 } : { height: `${val}%` }}
                          transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                          className="flex-1 bg-blue-100 rounded-t-sm relative group"
                        >
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={isRendering ? { height: 0 } : { height: `${val * 0.7}%` }}
                            transition={{ delay: 0.8 + i * 0.05, type: "spring" }}
                            className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Bottom Row */}
                  <div className={`grid gap-4 ${device === "desktop" ? "grid-cols-2" : "grid-cols-1"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isRendering ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                      className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                    >
                      <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                            <div className="flex-1">
                              <div className="h-2 w-full bg-slate-100 rounded" />
                              <div className="h-2 w-1/2 bg-slate-100 rounded mt-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={isRendering ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="bg-blue-600 rounded-xl p-6 text-white shadow-sm flex flex-col justify-center"
                    >
                      <h3 className="font-semibold mb-2">Upgrade to Pro</h3>
                      <p className="text-blue-100 text-sm mb-4">Get access to advanced analytics and unlimited API calls.</p>
                      <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold w-fit">
                        View Plans
                      </button>
                    </motion.div>
                  </div>

                </div>
              </div>
              
              {/* Rendering Overlay */}
              <AnimatePresence>
                {isRendering && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex items-center justify-center"
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm font-semibold text-slate-800">Synthesizing DOM Elements...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

          {/* Floating Deploy Status (Desktop only) */}
          <AnimatePresence>
            {!isRendering && device === "desktop" && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -right-8 bottom-12 bg-[#1a1f2e] border border-white/10 rounded-xl p-4 shadow-2xl flex items-center gap-4 z-40"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">Live on Edge</div>
                  <div className="text-xs text-slate-400 font-mono">Deployed in 1.4s</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
