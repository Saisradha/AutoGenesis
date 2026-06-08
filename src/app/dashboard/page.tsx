"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Bell, User, Plus, Download,
  Folder, MoreVertical, Clock,
  Sparkles, Code2, Globe, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState("Next.js");

  const recentProjects = [
    { id: "1", name: "AI Marketing Site", framework: "Next.js", time: "2 hours ago", active: true },
    { id: "2", name: "Crypto Dashboard", framework: "React", time: "1 day ago", active: false },
    { id: "3", name: "Backend API", framework: "Node.js", time: "3 days ago", active: false },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ background: "#020e08" }}>
      {/* Ambient aurora */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 30% 20%, rgba(0,200,150,0.04) 0%, transparent 60%)",
      }} />

      {/* Top Navbar */}
      <nav className="h-16 sticky top-0 z-40 flex items-center justify-between px-6" style={{
        background: "rgba(2,12,6,0.9)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#00C896,#7C4DFF)" }}>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">AutoGenesis</span>
          </Link>
          <div className="hidden md:flex relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input type="text" placeholder="Search projects..."
              className="rounded-lg py-1.5 pl-9 pr-4 w-64 text-sm focus:outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.25)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 relative transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full" style={{ background: "#00C896" }} />
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
            style={{ background: "linear-gradient(135deg, rgba(0,200,150,0.3), rgba(124,77,255,0.3))" }}>
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome back.</h1>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Continue where you left off or start something new.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
              <Download className="w-4 h-4" /> Import Project
            </button>
            <button onClick={() => setIsNewProjectModalOpen(true)}
              className="btn-aurora-primary relative overflow-hidden px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2">
              <span className="relative z-10 flex items-center gap-2"><Plus className="w-4 h-4" /> New Project</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <div onClick={() => setIsNewProjectModalOpen(true)}
            className="aurora-glass-hover group cursor-pointer p-6 rounded-2xl flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.12)" }}>
              <Code2 className="w-7 h-7" style={{ color: "#00C896" }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#00C896] transition-colors">Start a new project</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Generate a full-stack app from a prompt</p>
            </div>
          </div>
          <div className="aurora-glass-hover group cursor-pointer p-6 rounded-2xl flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "rgba(0,140,80,0.08)", border: "1px solid rgba(124,77,255,0.12)" }}>
              <Globe className="w-7 h-7" style={{ color: "#7C4DFF" }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#7C4DFF] transition-colors">Clone Repository</h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Import an existing project from GitHub</p>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center gap-2 mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            <Clock className="w-4 h-4" />
            <h2 className="text-lg font-semibold tracking-tight">Recent Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentProjects.map((project) => (
              <div key={project.id} onClick={() => router.push(`/workspace/${project.id}`)}
                className="group p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between h-40 hover:-translate-y-1"
                style={{ background: "rgba(2,14,8,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,150,0.15)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Folder className="w-5 h-5 transition-colors duration-200" style={{ color: "rgba(255,255,255,0.4)" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white tracking-tight group-hover:text-[#00C896] transition-colors">{project.name}</h3>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{project.framework}</p>
                    </div>
                  </div>
                  <button className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-xs font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <span>{project.time}</span>
                  {project.active && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                      style={{ color: "#00C896", background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.15)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" /> Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      <AnimatePresence>
        {isNewProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.7)" }}
              onClick={() => setIsNewProjectModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col aurora-border"
              style={{ background: "#06180f", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}
            >
              <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <h2 className="text-xl font-bold text-white tracking-tight">Create New Project</h2>
                <button onClick={() => setIsNewProjectModalOpen(false)} className="p-1.5 rounded-lg transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Project Name</label>
                  <input type="text" placeholder="e.g. my-awesome-app"
                    className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Framework</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Next.js", "React", "Node.js", "Python"].map((fw) => (
                      <div key={fw} onClick={() => setSelectedFramework(fw)}
                        className="p-3 rounded-xl cursor-pointer text-center transition-all"
                        style={{
                          background: selectedFramework === fw ? "rgba(0,200,150,0.08)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${selectedFramework === fw ? "rgba(0,200,150,0.25)" : "rgba(255,255,255,0.06)"}`,
                          color: selectedFramework === fw ? "#00C896" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        <span className="text-sm font-medium">{fw}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Initial Prompt (Optional)</label>
                  <textarea placeholder="Describe what you want to build..."
                    className="w-full rounded-xl px-4 py-3 text-white text-sm focus:outline-none h-32 resize-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
              </div>
              <div className="p-6 flex justify-end gap-3" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-medium transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Cancel
                </button>
                <button onClick={() => router.push("/workspace/new-123")}
                  className="btn-aurora-primary relative overflow-hidden px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2">
                  <span className="relative z-10 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Create & Open Workspace</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
