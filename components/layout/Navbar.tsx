"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-sm"
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          <Link href="#" className="group" data-cursor="pointer">
            <p className="text-sm font-bold uppercase tracking-wide text-white md:text-base">
              {SITE.name}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
              {SITE.lab}
            </p>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                  data-cursor="pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-2 border border-white/20 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Available
            </span>
          </div>

          <button
            className="text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl uppercase tracking-[0.2em] text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
