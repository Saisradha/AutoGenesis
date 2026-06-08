"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, Sparkles, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Glass input ─── */
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
        ...callerStyle,
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
  id, value, onChange, placeholder, autoComplete, label,
}: {
  id: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; autoComplete?: string; label: string;
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
        placeholder={placeholder ?? label}
        className="su-placeholder"
        autoComplete={autoComplete ?? "new-password"}
        minLength={6}
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
          color: "rgba(255,255,255,0.38)", padding: 4,
          display: "flex", alignItems: "center", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}
      >
        {show ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
      </button>
    </div>
  );
}

/* ─── Floating particle ─── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute rounded-full pointer-events-none" style={{
      width: 3, height: 3,
      background: "rgba(0,200,150,0.6)",
      boxShadow: "0 0 6px rgba(0,200,150,0.8)",
      animation: "lg-particle-float linear infinite", ...style,
    }} />
  );
}

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 43 + 7) % 100}%`,
  top: `${(i * 57 + 12) % 100}%`,
  animationDuration: `${9 + (i % 6) * 2.4}s`,
  animationDelay: `${-(i * 1.5)}s`,
  opacity: 0.28 + (i % 5) * 0.1,
}));

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");

    // Client-side password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is disabled, Supabase returns a session immediately
    // Try to sign in right away
    if (signUpData?.session) {
      // Already has a session — email confirmation is OFF in Supabase
      router.push("/dashboard");
      return;
    }

    // Email confirmation is ON — try signing in anyway (sometimes works)
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (!signInError) {
      router.push("/dashboard");
      return;
    }

    // Email confirmation required — guide the user
    setSuccess(
      "Account created! A confirmation email was sent to " + email +
      ". Please check your inbox (and spam folder). Once confirmed, you can log in."
    );
    setLoading(false);
  }

  /* pill button base style */
  const pillBtn: React.CSSProperties = {
    width: "100%", padding: "13px 20px", borderRadius: 50, border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    background: "linear-gradient(135deg, #00d4aa 0%, #0099ff 50%, #7C4DFF 100%)",
    color: "#ffffff", fontWeight: 700, fontSize: 15,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    boxShadow: "0 8px 28px rgba(0,200,150,0.35), 0 3px 12px rgba(124,77,255,0.2)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    opacity: loading ? 0.7 : 1,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes lg-blob-a{0%,100%{transform:translate(0%,0%) scale(1);}25%{transform:translate(5%,-8%) scale(1.08);}50%{transform:translate(-6%,6%) scale(0.95);}75%{transform:translate(-4%,-4%) scale(1.05);}}
        @keyframes lg-blob-b{0%,100%{transform:translate(0%,0%) scale(1);}33%{transform:translate(-6%,7%) scale(1.1);}66%{transform:translate(8%,-5%) scale(0.93);}}
        @keyframes lg-blob-c{0%,100%{transform:translate(0%,0%) scale(1);}50%{transform:translate(4%,8%) scale(1.06);}}
        @keyframes lg-particle-float{0%{transform:translateY(0px);opacity:0;}8%{opacity:1;}92%{opacity:1;}100%{transform:translateY(-160px);opacity:0;}}
        @keyframes lg-reflection{0%,100%{opacity:0.4;}50%{opacity:0.7;}}
        .su-placeholder::placeholder{color:rgba(255,255,255,0.35);}
        .su-card-inner{scrollbar-width:none;-ms-overflow-style:none;}
        .su-card-inner::-webkit-scrollbar{display:none;}
        .su-pill-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.015)!important;box-shadow:0 14px 48px rgba(0,200,150,0.45),0 6px 24px rgba(124,77,255,0.3)!important;}
      `}</style>

      <main style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif", background: "#020a0e",
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 120% 100% at 50% 0%, #001a0f 0%, #020a0e 40%, #05021a 70%, #000810 100%)" }} />
          <div style={{ position: "absolute", width: 700, height: 700, top: "-20%", left: "-15%", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,130,0.22) 0%, transparent 70%)", filter: "blur(60px)", animation: "lg-blob-a 20s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 600, height: 600, bottom: "-15%", right: "-10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,255,0.18) 0%, transparent 70%)", filter: "blur(70px)", animation: "lg-blob-b 25s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, top: "40%", right: "20%", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,77,255,0.16) 0%, transparent 70%)", filter: "blur(80px)", animation: "lg-blob-c 30s ease-in-out infinite" }} />
        </div>

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={{ left: p.left, top: p.top, opacity: p.opacity, animationDuration: p.animationDuration, animationDelay: p.animationDelay }} />
        ))}

        {/* Card wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%", maxWidth: 480, padding: "0 16px", position: "relative", zIndex: 10 }}
        >
          {/* Glass card */}
          <div
            className="aurora-border"
            style={{
              borderRadius: 28,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.13)",
              boxShadow: [
                "0 48px 96px rgba(0,0,0,0.55)",
                "0 0 80px rgba(0,200,150,0.07)",
                "inset 0 2px 0 rgba(255,255,255,0.12)",
                "inset 0 -1px 0 rgba(255,255,255,0.04)",
              ].join(", "),
              overflow: "hidden", position: "relative",
            }}
          >
            {/* Top reflection */}
            <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)", animation: "lg-reflection 4s ease-in-out infinite", pointerEvents: "none", zIndex: 1 }} />
            <div style={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(0,255,180,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

            <div className="su-card-inner" style={{ padding: "28px 32px 28px", display: "flex", flexDirection: "column", alignItems: "center" }}>

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
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.4px", marginBottom: 6, textAlign: "center" }}>
                Create an account
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 22, textAlign: "center" }}>
                Join AutoGenesis and build smarter.
              </p>

              {/* Error / Success banners */}
              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }}
                    style={{ width: "100%", marginBottom: 14, padding: "10px 14px", borderRadius: 12, fontSize: 13, color: "#fca5a5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}>
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -8, height: 0 }}
                    style={{ width: "100%", marginBottom: 14, padding: "10px 14px", borderRadius: 12, fontSize: 13, color: "#00C896", background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.18)", display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 style={{ width: 15, height: 15, flexShrink: 0 }} />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSignup} style={{ width: "100%" }}>

                {/* Full Name */}
                <div style={{ marginBottom: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: 14, transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)", zIndex: 1 }}>
                    <User style={{ width: 16, height: 16 }} />
                  </div>
                  <GlassInput
                    id="signup-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="su-placeholder"
                    autoComplete="name"
                    style={{ paddingLeft: 42 }}
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: 10, position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: 14, transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,255,255,0.3)", zIndex: 1 }}>
                    <Mail style={{ width: 16, height: 16 }} />
                  </div>
                  <GlassInput
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="su-placeholder"
                    autoComplete="email"
                    style={{ paddingLeft: 42 }}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: 10 }}>
                  <PasswordInput
                    id="signup-password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (min. 6 chars)"
                    autoComplete="new-password"
                  />
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: 18 }}>
                  <PasswordInput
                    id="signup-confirm-password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                  />
                  {/* Live match indicator */}
                  {confirmPassword.length > 0 && (
                    <div style={{ marginTop: 6, fontSize: 12, display: "flex", alignItems: "center", gap: 5,
                      color: password === confirmPassword ? "#00C896" : "#fca5a5" }}>
                      {password === confirmPassword
                        ? <><CheckCircle2 style={{ width: 13, height: 13 }} /> Passwords match</>
                        : <>✕ Passwords do not match</>
                      }
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="signup-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="su-pill-btn"
                  style={pillBtn}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4" strokeDashoffset="10" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    <>Create Account <ArrowRight style={{ width: 17, height: 17 }} /></>
                  )}
                </button>
              </form>

              {/* Sign in link */}
              <div style={{ marginTop: 18, textAlign: "center" }}>
                <Link
                  href="/login"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)"; }}
                >
                  Already have an account?{" "}
                  <span style={{ color: "#00C896", fontWeight: 600 }}>Sign in</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p style={{ textAlign: "center", fontSize: 12, marginTop: 16, padding: "0 16px", color: "rgba(255,255,255,0.28)", lineHeight: 1.6 }}>
            By signing up you agree to AutoGenesis&apos;s{" "}
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Privacy Policy</Link>.
          </p>
        </motion.div>
      </main>
    </>
  );
}