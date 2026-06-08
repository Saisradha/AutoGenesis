"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Architecture", href: "/architecture" },
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          isScrolled
            ? "border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "border-transparent"
        }`}
        style={{
          background: isScrolled
            ? "rgba(2,12,6,0.88)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(24px) saturate(160%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(160%)" : "none",
        }}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,200,150,0.4)]"
              style={{ background: "linear-gradient(135deg, #00C896, #7C4DFF)" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              AutoGenesis
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-[#00C896] bg-[#00C896]/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="btn-aurora-primary relative overflow-hidden px-5 py-2 rounded-xl text-sm font-semibold"
            >
              <span className="relative z-10">Start Building</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/50 hover:text-white p-2 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-[90] md:hidden border-b border-white/[0.06] overflow-hidden"
            style={{
              background: "rgba(2,12,6,0.96)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="px-6 py-8 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors ${
                    pathname === link.href
                      ? "text-[#00C896] bg-[#00C896]/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium px-4 py-3 text-white/50 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-aurora-primary relative overflow-hidden text-center px-4 py-3 rounded-xl font-semibold mt-2"
              >
                <span className="relative z-10">Start Building</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
