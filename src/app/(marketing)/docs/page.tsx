export const metadata = {
  title: "Documentation | AutoGenesis AI",
  description: "Developer documentation and API reference.",
};

import { FileText, Code, Terminal, Cpu, Zap, Shield } from "lucide-react";

export default function DocsPage() {
  const categories = [
    { name: "Getting Started", icon: Zap, desc: "Quick start guide and fundamental concepts." },
    { name: "CLI Reference", icon: Terminal, desc: "Command line tools for local development." },
    { name: "Agent APIs", icon: Cpu, desc: "Interact directly with the AI swarm." },
    { name: "Deployment", icon: Code, desc: "CI/CD integration and edge network guides." },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 relative bg-[#05020D] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">Documentation</h1>
          <p className="text-slate-400 text-lg">Everything you need to integrate and build with AutoGenesis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {categories.map(cat => (
            <div key={cat.name} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-brand-purple/30 transition-colors cursor-pointer group">
              <cat.icon className="w-8 h-8 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-slate-400">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl glass-premium border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Install</h2>
          <div className="bg-black/50 p-4 rounded-xl flex items-center justify-between border border-white/5 font-mono text-sm">
            <span className="text-slate-300"><span className="text-brand-purple">npm</span> install -g autogenesis-cli</span>
            <button className="text-slate-500 hover:text-white">Copy</button>
          </div>
        </div>
      </div>
    </main>
  );
}
