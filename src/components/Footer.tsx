import { Globe, Mail, MessageSquare, Disc, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-24 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#020e08" }}
    >
      {/* Aurora glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-t-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom, rgba(0,200,150,0.04) 0%, rgba(124,77,255,0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Aurora gradient top divider */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(0,200,150,0.2), rgba(124,77,255,0.2), transparent)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #00C896, #7C4DFF)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">AutoGenesis</span>
            </div>
            <p className="mb-8 max-w-sm leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              The world&apos;s first AI Operating System for autonomous product creation.
              Build faster, scale smarter, ship continuously.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail, MessageSquare, Disc].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,150,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#00C896";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,200,150,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4
              className="font-bold mb-6 uppercase tracking-[0.18em] text-[11px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Platform
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              {["Architecture", "Workspace IDE", "Capabilities", "Execution Pipeline"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00C896"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4
              className="font-bold mb-6 uppercase tracking-[0.18em] text-[11px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              {[
                { label: "About AutoGenesis", badge: null },
                { label: "Careers", badge: "HIRING" },
                { label: "Engineering Blog", badge: null },
                { label: "Contact Sales", badge: null },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <a
                    href="#"
                    className="transition-all duration-200 hover:translate-x-1 inline-block"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6EFFC4"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    {item.label}
                  </a>
                  {item.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                      style={{
                        background: "rgba(0,200,150,0.1)",
                        color: "#00C896",
                        border: "1px solid rgba(0,200,150,0.2)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}
        >
          <div className="flex items-center gap-6">
            <p>© 2026 AutoGenesis OS. All rights reserved.</p>
            <div
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>All Systems Operational</span>
            </div>
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Security"].map((label) => (
              <a
                key={label}
                href="#"
                className="hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
