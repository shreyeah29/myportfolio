"use client";

import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-muted md:flex-row">
        <p>
          {SITE.name} · {SITE.lab}
        </p>
        <a
          href="#"
          className="transition-colors hover:text-white"
          data-cursor="pointer"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
