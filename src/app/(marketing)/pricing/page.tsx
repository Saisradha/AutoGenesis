export const metadata = {
  title: "Pricing | AutoGenesis AI",
  description: "Simple, transparent pricing for AI autonomous product creation.",
};

import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Hobby",
    price: "Free",
    description: "Perfect for exploring the AI command center and building small prototypes.",
    features: ["1 Active Agent", "100 Tasks / month", "Community Support", "Public Repositories"],
    recommended: false,
    cta: "Get Started Free"
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For professional developers who need production-ready applications fast.",
    features: ["Full 6-Agent Swarm", "Unlimited Tasks", "Priority Execution", "Private Repositories", "Advanced QA & Testing"],
    recommended: true,
    cta: "Start Pro Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations requiring scale, security, and custom integrations.",
    features: ["Custom AI Models", "Dedicated Cloud Infrastructure", "SLA Guarantee", "24/7 Priority Support", "SOC2 Compliance"],
    recommended: false,
    cta: "Contact Sales"
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative bg-[#05020D] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 hero-grid-scan opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]"></div>
      </div>
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Simple, transparent <span className="text-gradient-shine">Pricing</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Choose the perfect plan to scale your autonomous product creation. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <div key={plan.name} className={`relative p-8 rounded-3xl ${plan.recommended ? 'glass-premium border-brand-purple/50 shadow-[0_0_40px_rgba(139,92,246,0.15)] scale-105 z-10' : 'bg-white/[0.02] border border-white/10'}`}>
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-accent to-brand-purple text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400 text-lg">{plan.period}</span>}
              </div>

              <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 mb-8 ${plan.recommended ? 'bg-white text-black hover:bg-slate-200' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${plan.recommended ? 'text-brand-purple' : 'text-slate-600'}`} />
                    <span className="text-slate-300 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
