"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Smartphone, X, Sparkles, ArrowRight, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";

type AuthView = "main" | "phone" | "otp" | "email-sent";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [view, setView] = useState<AuthView>("main");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error")) {
      setError("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push("/dashboard");
    });
  }, []);

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setView("email-sent");
  };

  const handlePhoneSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setError(null);
    const formatted = phone.startsWith("+") ? phone : `+${phone}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formatted });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setSuccess("OTP sent to your phone!");
    setView("otp");
  };

  const handleOtpVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;
    setLoading(true);
    setError(null);
    const formatted = phone.startsWith("+") ? phone : `+${phone}`;
    const { error } = await supabase.auth.verifyOtp({ phone: formatted, token: code, type: "sms" });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/dashboard");
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#020e08" }}>
      {/* Aurora glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,200,150,0.08) 0%, transparent 60%)",
      }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        background: "rgba(124,77,255,0.06)", filter: "blur(150px)",
      }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
        background: "rgba(0,200,150,0.05)", filter: "blur(150px)",
      }} />

      {/* Close button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 right-8 p-3 rounded-full z-20 transition-all hover:-translate-y-0.5"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <X className="w-5 h-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] px-6 relative z-10"
      >
        {/* Card */}
        <div
          className="rounded-[32px] overflow-hidden aurora-border"
          style={{
            background: "rgba(2,14,8,0.85)",
            backdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(0,200,150,0.06)",
          }}
        >
          <div className="p-10 flex flex-col items-center text-center">
            {/* Logo icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
              style={{ background: "linear-gradient(135deg, rgba(0,200,150,0.15), rgba(124,77,255,0.15))", border: "1px solid rgba(0,200,150,0.15)" }}
            >
              <Sparkles className="w-7 h-7" style={{ color: "#00C896" }} />
            </div>

            {/* Error/Success */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="w-full mb-4 p-3 rounded-xl text-red-400 text-sm"
                  style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="w-full mb-4 p-3 rounded-xl text-sm"
                  style={{ background: "rgba(0,200,150,0.06)", border: "1px solid rgba(0,200,150,0.15)", color: "#00C896" }}
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* ── MAIN VIEW ── */}
              {view === "main" && (
                <motion.div key="main" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} className="w-full">
                  <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">Log in or sign up</h1>
                  <p className="text-[15px] leading-relaxed mb-10 px-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                    You&apos;ll get smarter responses and can upload files, images, and more.
                  </p>

                  <div className="w-full space-y-3 mb-8">
                    {/* Google */}
                    <button onClick={() => handleOAuth("google")} disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white text-black font-semibold hover:bg-slate-100 transition-all shadow-sm disabled:opacity-50"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>

                    {/* GitHub */}
                    <button onClick={() => handleOAuth("github")} disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-semibold transition-all disabled:opacity-50 hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,150,0.2)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Continue with GitHub
                    </button>

                    {/* Phone */}
                    <button onClick={() => { setView("phone"); setError(null); setSuccess(null); }}
                      className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,150,0.2)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    >
                      <Smartphone className="w-5 h-5 text-white/50" />
                      Continue with Phone
                    </button>
                  </div>

                  <div className="w-full flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>or</span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  </div>

                  <form onSubmit={handleEmailLogin} className="w-full space-y-4">
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full rounded-xl py-4 px-4 text-white text-sm focus:outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.85)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,200,150,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                    <button type="submit" disabled={loading}
                      className="btn-aurora-primary relative overflow-hidden w-full group flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── PHONE VIEW ── */}
              {view === "phone" && (
                <motion.div key="phone" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="w-full">
                  <button onClick={() => { setView("main"); setError(null); }}
                    className="flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"; }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">Enter your phone</h1>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    We&apos;ll send you a 6-digit verification code via SMS.
                  </p>
                  <form onSubmit={handlePhoneSend} className="w-full space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Smartphone className="w-5 h-5" style={{ color: "rgba(255,255,255,0.25)" }} />
                      </div>
                      <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.3)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                      />
                    </div>
                    <button type="submit" disabled={loading}
                      className="btn-aurora-primary relative overflow-hidden w-full group flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Code <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                      </span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* ── OTP VIEW ── */}
              {view === "otp" && (
                <motion.div key="otp" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="w-full">
                  <button onClick={() => { setView("phone"); setError(null); setOtp(["","","","","",""]); }}
                    className="flex items-center gap-2 text-sm mb-6 transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto"
                    style={{ background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.15)" }}
                  >
                    <ShieldCheck className="w-6 h-6" style={{ color: "#00C896" }} />
                  </div>
                  <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">Verify OTP</h1>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Enter the 6-digit code sent to <span className="text-white font-medium">{phone}</span>
                  </p>
                  <div className="flex justify-center gap-3 mb-8">
                    {otp.map((digit, i) => (
                      <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1}
                        value={digit} onChange={(e) => handleOtpInput(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold text-white focus:outline-none transition-all rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,150,0.4)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,200,150,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    ))}
                  </div>
                  <button onClick={handleOtpVerify} disabled={loading || otp.join("").length !== 6}
                    className="btn-aurora-primary relative overflow-hidden w-full group flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify & Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                    </span>
                  </button>
                  <button onClick={handlePhoneSend} disabled={loading}
                    className="w-full mt-4 text-sm transition-colors disabled:opacity-50" style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Didn&apos;t receive code? Resend
                  </button>
                </motion.div>
              )}

              {/* ── EMAIL SENT VIEW ── */}
              {view === "email-sent" && (
                <motion.div key="email-sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="w-full text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                    style={{ background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.15)" }}
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#00C896" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h1 className="text-[28px] font-bold text-white mb-3 tracking-tight">Check your email</h1>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                    We sent a magic link to <span className="text-white font-medium">{email}</span>. Click the link in the email to sign in.
                  </p>
                  <button onClick={() => { setView("main"); setSuccess(null); }}
                    className="text-sm font-medium transition-colors" style={{ color: "#00C896" }}
                  >
                    ← Back to login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[13px] mt-6 px-4" style={{ color: "rgba(255,255,255,0.3)" }}>
          By continuing, you agree to AutoGenesis&apos;s{" "}
          <Link href="/terms" className="underline hover:text-white transition-colors">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
        </p>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#020e08" }} />}>
      <LoginContent />
    </Suspense>
  );
}
