"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Smartphone, X, Sparkles, ArrowRight, Loader2, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";

type AuthView = "main" | "phone" | "otp";

/* ─── Floating particle component ─── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 3,
        height: 3,
        background: "rgba(0,200,150,0.6)",
        boxShadow: "0 0 6px rgba(0,200,150,0.8)",
        animation: "lg-particle-float linear infinite",
        ...style,
      }}
    />
  );
}

/* ─── Google SVG icon ─── */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ─── GitHub SVG icon ─── */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/* ─── Circular social glass button ─── */
function SocialCircleBtn({
  onClick, disabled, label, color, children,
}: {
  onClick: () => void; disabled?: boolean; label: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        title={label}
        style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.28s cubic-bezier(0.23,1,0.32,1)",
          position: "relative", overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-4px) scale(1.08)";
          el.style.boxShadow = `0 8px 32px ${color}33, 0 0 0 1px ${color}55, inset 0 1px 0 rgba(255,255,255,0.25)`;
          el.style.borderColor = `${color}80`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0) scale(1)";
          el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
          el.style.borderColor = "rgba(255,255,255,0.18)";
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          borderRadius: "0 0 50% 50%",
        }} />
        {children}
      </button>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.03em" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Glass input — merges caller style so padding-right works for eye icon ─── */
function GlassInput({ style: callerStyle, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 12,
        padding: "12px 16px",
        color: "#ffffff",
        fontSize: 14,
        outline: "none",
        transition: "all 0.25s ease",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
        ...callerStyle,              // ← caller can override any property
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,200,150,0.45)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,200,150,0.12), inset 0 1px 0 rgba(255,255,255,0.08)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08)";
        props.onBlur?.(e);
      }}
    />
  );
}

/* ─── Password field with show/hide toggle ─── */
function PasswordInput({
  id, value, onChange, placeholder, autoComplete,
}: {
  id: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <GlassInput
        id={id}
        type={show ? "text" : "password"}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? "Password"}
        className="lg-input-placeholder"
        autoComplete={autoComplete ?? "current-password"}
        style={{ paddingRight: 44 }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
        style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.38)", padding: 4, display: "flex",
          alignItems: "center", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}
      >
        {show ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
      </button>
    </div>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [view, setView] = useState<AuthView>("main");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /* stable particle positions */
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      left: `${(i * 37 + 5) % 100}%`,
      top: `${(i * 53 + 10) % 100}%`,
      animationDuration: `${8 + (i % 7) * 2.5}s`,
      animationDelay: `${-(i * 1.3)}s`,
      opacity: 0.3 + (i % 5) * 0.12,
      width: i % 3 === 0 ? 4 : i % 3 === 1 ? 2.5 : 3,
    }))
  ).current;

  useEffect(() => {
    if (searchParams.get("error")) setError("Authentication failed. Please try again.");
  }, [searchParams]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push("/dashboard");
    });
  }, []);

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      // Translate Supabase's opaque error into a helpful message
      if (
        error.message.toLowerCase().includes("invalid login credentials") ||
        error.message.toLowerCase().includes("invalid credentials") ||
        error.message.toLowerCase().includes("email not confirmed")
      ) {
        setError(
          "Login failed. Either the password is wrong, or your email is not yet confirmed. " +
          "Check your inbox (and spam folder) for a confirmation email, or sign up if you don't have an account."
        );
      } else {
        setError(error.message);
      }
      return;
    }
    router.push("/dashboard");
  };

  const handlePhoneSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true); setError(null);
    const formatted = phone.startsWith("+") ? phone : `+${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formatted });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSuccess("OTP sent to your phone!"); setView("otp");
  };

  const handleOtpVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true); setError(null);
    const formatted = phone.startsWith("+") ? phone : `+${phone}`;
    const { error } = await supabase.auth.verifyOtp({ phone: formatted, token: code, type: "sms" });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/dashboard");
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`)?.focus();
  };

  /* ── shared pill-button style ── */
  const pillBtn: React.CSSProperties = {
    width: "100%", padding: "13px 20px", borderRadius: 50, border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    background: "linear-gradient(135deg, #00d4aa 0%, #0099ff 50%, #7C4DFF 100%)",
    color: "#ffffff", fontWeight: 700, fontSize: 15,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "0 8px 28px rgba(0,200,150,0.35), 0 3px 12px rgba(124,77,255,0.2)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    opacity: loading ? 0.7 : 1, position: "relative", overflow: "hidden",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        @keyframes lg-blob-a {
          0%,100%{transform:translate(0%,0%) scale(1);}
          25%{transform:translate(5%,-8%) scale(1.08);}
          50%{transform:translate(-6%,6%) scale(0.95);}
          75%{transform:translate(-4%,-4%) scale(1.05);}
        }
        @keyframes lg-blob-b {
          0%,100%{transform:translate(0%,0%) scale(1);}
          33%{transform:translate(-6%,7%) scale(1.1);}
          66%{transform:translate(8%,-5%) scale(0.93);}
        }
        @keyframes lg-blob-c {
          0%,100%{transform:translate(0%,0%) scale(1);}
          50%{transform:translate(4%,8%) scale(1.06);}
        }
        @keyframes lg-particle-float {
          0%{transform:translateY(0px) translateX(0px);opacity:0;}
          8%{opacity:1;}92%{opacity:1;}
          100%{transform:translateY(-180px) translateX(20px);opacity:0;}
        }
        @keyframes lg-reflection {
          0%,100%{opacity:0.4;}50%{opacity:0.7;}
        }
        @keyframes lg-border-sweep {
          0%{background-position:0% 0%;}100%{background-position:400% 0%;}
        }

        .lg-input-placeholder::placeholder{color:rgba(255,255,255,0.35);}
        .lg-btn-login:hover .lg-btn-arrow{transform:translateX(4px);}

        /* Hidden-scrollbar inner card */
        .lg-card-inner{scrollbar-width:none;-ms-overflow-style:none;}
        .lg-card-inner::-webkit-scrollbar{display:none;}

        /* OTP digit */
        .lg-otp-digit{
          width:44px;height:52px;text-align:center;font-size:18px;font-weight:700;
          color:#ffffff;outline:none;
          background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.14);
          border-radius:10px;transition:all 0.22s ease;
          box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .lg-otp-digit:focus{
          border-color:rgba(0,200,150,0.5);
          box-shadow:0 0 0 3px rgba(0,200,150,0.15),inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* pill-button hover helpers */
        .lg-pill-btn:hover{transform:translateY(-2px) scale(1.015)!important;box-shadow:0 14px 48px rgba(0,200,150,0.45),0 6px 24px rgba(124,77,255,0.3)!important;}
        .lg-pill-btn:disabled{pointer-events:none;}
      `}</style>

      <main style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif", background: "#020a0e",
      }}>
        {/* ── Animated gradient background blobs ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 120% 100% at 50% 0%, #001a0f 0%, #020a0e 40%, #05021a 70%, #000810 100%)",
          }} />
          <div style={{
            position: "absolute", width: 700, height: 700, top: "-20%", left: "-15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,200,130,0.22) 0%, rgba(0,200,130,0.05) 50%, transparent 70%)",
            filter: "blur(60px)", animation: "lg-blob-a 20s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 600, height: 600, bottom: "-15%", right: "-10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,180,255,0.18) 0%, rgba(0,180,255,0.04) 55%, transparent 70%)",
            filter: "blur(70px)", animation: "lg-blob-b 25s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 500, height: 500, top: "40%", right: "20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,77,255,0.16) 0%, rgba(124,77,255,0.04) 55%, transparent 70%)",
            filter: "blur(80px)", animation: "lg-blob-c 30s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 400, height: 400, bottom: "5%", left: "30%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,255,180,0.1) 0%, transparent 65%)",
            filter: "blur(60px)", animation: "lg-blob-a 16s ease-in-out infinite reverse",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.03, mixBlendMode: "overlay",
          }} />
        </div>

        {/* ── Floating particles ── */}
        {particles.map((p, i) => (
          <Particle key={i} style={{
            left: p.left, top: p.top, width: p.width, height: p.width,
            opacity: p.opacity, animationDuration: p.animationDuration, animationDelay: p.animationDelay,
          }} />
        ))}

        {/* ── Close button ── */}
        <button
          onClick={() => router.push("/")}
          aria-label="Close"
          style={{
            position: "absolute", top: 24, right: 24,
            width: 40, height: 40, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 20, transition: "all 0.22s ease",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* ── Card wrapper ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 520, padding: "0 16px", position: "relative", zIndex: 10 }}
        >
          {/* ── Glass card (square) ── */}
          <div
            className="aurora-border"
            style={{
              borderRadius: 28,
              aspectRatio: "1 / 1",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.13)",
              boxShadow: [
                "0 48px 96px rgba(0,0,0,0.55)",
                "0 0 0 1px rgba(255,255,255,0.05)",
                "0 0 80px rgba(0,200,150,0.07)",
                "inset 0 2px 0 rgba(255,255,255,0.12)",
                "inset 0 -1px 0 rgba(255,255,255,0.04)",
              ].join(", "),
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Top-edge reflection */}
            <div style={{
              position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
              animation: "lg-reflection 4s ease-in-out infinite", pointerEvents: "none", zIndex: 1,
            }} />
            <div style={{
              position: "absolute", top: -40, left: -40, width: 200, height: 200,
              background: "radial-gradient(circle, rgba(0,255,180,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <div className="lg-card-inner" style={{
              padding: "28px 32px 24px", display: "flex", flexDirection: "column",
              alignItems: "center", height: "100%", overflowY: "auto",
            }}>

              {/* Logo */}
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "linear-gradient(135deg, rgba(0,200,150,0.2), rgba(124,77,255,0.2))",
                border: "1px solid rgba(0,200,150,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 10,
                boxShadow: "0 0 20px rgba(0,200,150,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}>
                <Sparkles style={{ width: 22, height: 22, color: "#00C896" }} />
              </div>

              {/* Heading */}
              <h1 style={{
                fontSize: 22, fontWeight: 800, color: "#ffffff",
                letterSpacing: "-0.4px", marginBottom: 18, textAlign: "center",
              }}>
                Log in or sign up
              </h1>

              {/* Error / Success */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    style={{
                      width: "100%", marginBottom: 14, padding: "10px 14px",
                      borderRadius: 12, fontSize: 13, color: "#fca5a5",
                      background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)",
                    }}
                  >
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    style={{
                      width: "100%", marginBottom: 14, padding: "10px 14px",
                      borderRadius: 12, fontSize: 13, color: "#00C896",
                      background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.18)",
                    }}
                  >
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">

                {/* ══════════════ MAIN VIEW ══════════════ */}
                {view === "main" && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%" }}
                  >
                    <form onSubmit={handleEmailLogin} style={{ width: "100%" }}>
                      {/* Email */}
                      <div style={{ marginBottom: 10 }}>
                        <GlassInput
                          id="login-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email / Username"
                          className="lg-input-placeholder"
                          autoComplete="email"
                        />
                      </div>

                      {/* Password with eye toggle */}
                      <div style={{ marginBottom: 14 }}>
                        <PasswordInput
                          id="login-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </div>

                      {/* Login button */}
                      <button
                        id="login-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="lg-btn-login lg-pill-btn"
                        style={pillBtn}
                      >
                        {loading ? (
                          <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" />
                        ) : (
                          <>Login <ArrowRight className="lg-btn-arrow" style={{ width: 17, height: 17, transition: "transform 0.22s ease" }} /></>
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 12px" }}>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                      <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.32)", whiteSpace: "nowrap" }}>
                        Login with a social media account
                      </span>
                      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                    </div>

                    {/* Social icons */}
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 16 }}>
                      <SocialCircleBtn onClick={() => handleOAuth("google")} disabled={loading} label="Google" color="#4285F4">
                        <GoogleIcon />
                      </SocialCircleBtn>
                      <SocialCircleBtn onClick={() => handleOAuth("github")} disabled={loading} label="GitHub" color="#a78bfa">
                        <GitHubIcon />
                      </SocialCircleBtn>
                      <SocialCircleBtn onClick={() => { setView("phone"); setError(null); setSuccess(null); }} disabled={loading} label="Phone" color="#00C896">
                        <Smartphone style={{ width: 19, height: 19, color: "rgba(255,255,255,0.85)" }} />
                      </SocialCircleBtn>
                    </div>

                    {/* Sign up link */}
                    <div style={{ textAlign: "center" }}>
                      <Link
                        href="/signup"
                        style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"; }}
                      >
                        Don&apos;t have an account?{" "}
                        <span style={{ color: "#00C896", fontWeight: 600 }}>Sign Up</span>
                      </Link>
                    </div>
                  </motion.div>
                )}

                {/* ══════════════ PHONE VIEW ══════════════ */}
                {view === "phone" && (
                  <motion.div key="phone" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} style={{ width: "100%" }}>
                    <button
                      onClick={() => { setView("main"); setError(null); }}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 18, padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} /> Back
                    </button>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.4px" }}>Enter your phone</h2>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 22, lineHeight: 1.6 }}>
                      We&apos;ll send you a 6-digit verification code via SMS.
                    </p>
                    <form onSubmit={handlePhoneSend} style={{ width: "100%" }}>
                      <div style={{ position: "relative", marginBottom: 14 }}>
                        <div style={{ position: "absolute", top: "50%", left: 14, transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)" }}>
                          <Smartphone style={{ width: 18, height: 18 }} />
                        </div>
                        <GlassInput
                          id="phone-input"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="lg-input-placeholder"
                          style={{ paddingLeft: 44 }}
                        />
                      </div>
                      <button type="submit" disabled={loading} className="lg-pill-btn" style={pillBtn}>
                        {loading ? <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" /> : <><span>Send Code</span><ArrowRight style={{ width: 17, height: 17 }} /></>}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ══════════════ OTP VIEW ══════════════ */}
                {view === "otp" && (
                  <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3 }} style={{ width: "100%" }}>
                    <button
                      onClick={() => { setView("phone"); setError(null); setOtp(["", "", "", "", "", ""]); }}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", marginBottom: 18, padding: 0, transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                    >
                      <ArrowLeft style={{ width: 16, height: 16 }} /> Back
                    </button>
                    <div style={{ width: 46, height: 46, borderRadius: 13, margin: "0 auto 14px", background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ShieldCheck style={{ width: 22, height: 22, color: "#00C896" }} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.4px", textAlign: "center" }}>Verify OTP</h2>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 22, textAlign: "center", lineHeight: 1.6 }}>
                      Enter the 6-digit code sent to <span style={{ color: "#ffffff", fontWeight: 600 }}>{phone}</span>
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 22 }}>
                      {otp.map((digit, i) => (
                        <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                          value={digit} onChange={(e) => handleOtpInput(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="lg-otp-digit" />
                      ))}
                    </div>
                    <button id="otp-verify-btn" onClick={handleOtpVerify} disabled={loading || otp.join("").length !== 6}
                      className="lg-pill-btn" style={{ ...pillBtn, marginBottom: 12, opacity: (loading || otp.join("").length !== 6) ? 0.5 : 1 }}>
                      {loading ? <Loader2 style={{ width: 18, height: 18 }} className="animate-spin" /> : <><span>Verify &amp; Sign In</span><ArrowRight style={{ width: 17, height: 17 }} /></>}
                    </button>
                    <button onClick={handlePhoneSend} disabled={loading}
                      style={{ width: "100%", background: "none", border: "none", fontSize: 13, color: "rgba(255,255,255,0.35)", cursor: "pointer", transition: "color 0.2s", padding: "4px 0" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"; }}>
                      Didn&apos;t receive code? Resend
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Terms footer */}
          <p style={{ textAlign: "center", fontSize: 12, marginTop: 18, padding: "0 16px", color: "rgba(255,255,255,0.28)", lineHeight: 1.6 }}>
            By continuing, you agree to AutoGenesis&apos;s{" "}
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Privacy Policy</Link>.
          </p>
        </motion.div>
      </main>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#020a0e" }} />}>
      <LoginContent />
    </Suspense>
  );
}
