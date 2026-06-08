import Architecture from "@/components/Architecture";
import LiveExecution from "@/components/LiveExecution";

export const metadata = {
  title: "Architecture | AutoGenesis AI",
  description: "Explore the AI orchestration engine and infrastructure behind AutoGenesis.",
};

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen pt-24 relative bg-[#05020D] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-scan opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]"></div>
      </div>
      <div className="container mx-auto px-6 text-center max-w-3xl mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">System <span className="text-gradient-shine">Architecture</span></h1>
        <p className="text-slate-400 text-lg">Deep dive into our multi-agent orchestration layer, memory architecture, and real-time execution pipelines.</p>
      </div>
      <Architecture />
      <LiveExecution />
    </main>
  );
}
