import Features from "@/components/Features";
import AppPreview from "@/components/AppPreview";

export const metadata = {
  title: "Features | AutoGenesis AI",
  description: "Discover the capabilities of AutoGenesis.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen pt-32 relative overflow-hidden bg-[#05020D]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center max-w-3xl mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Core <span className="text-gradient-shine">Capabilities</span></h1>
        <p className="text-slate-400 text-lg">Everything you need to go from idea to production-ready software in minutes, fully automated by AI.</p>
      </div>
      <Features />
      <AppPreview />
    </main>
  );
}
