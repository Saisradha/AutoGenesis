export const metadata = {
  title: "About | AutoGenesis AI",
  description: "Our mission to democratize software engineering.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative bg-[#05020D] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">Our Mission</h1>
        <p className="text-2xl text-slate-300 leading-relaxed font-light mb-12">
          We believe the future of software engineering is autonomous. 
          Our goal is to remove the friction between human imagination and working production code.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-brand-accent to-brand-purple mx-auto rounded-full mb-16" />
        
        <div className="text-left text-slate-400 space-y-6 text-lg">
          <p>
            Founded in 2026, AutoGenesis was built by a team of ex-DeepMind and Vercel engineers who realized that 
            current AI coding assistants were fundamentally limited. They were copilots, requiring constant human steering.
          </p>
          <p>
            We built an <strong>Operating System</strong>. A true multi-agent swarm that doesn't just autocomplete lines of code, 
            but architects, designs, verifies, and ships entire applications autonomously.
          </p>
        </div>
      </div>
    </main>
  );
}
