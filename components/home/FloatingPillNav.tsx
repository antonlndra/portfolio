"use client";

import { AtSign, Home, List } from "lucide-react";

const SECTION_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#elsewhere", label: "Elsewhere" },
  { href: "#education", label: "Education" },
] as const;

export function FloatingPillNav() {
  return (
    <nav
      aria-label="Navegación"
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#171717]/[0.92] px-2 py-1.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-md"
    >
      <a
        href="#hero"
        aria-label="Inicio"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10"
      >
        <Home size={16} strokeWidth={1.75} aria-hidden />
      </a>

      <details className="relative">
        <summary
          aria-label="Secciones"
          className="grid size-9 cursor-pointer list-none place-items-center rounded-full transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden"
        >
          <List size={16} strokeWidth={1.75} aria-hidden />
        </summary>
        <div className="absolute bottom-[calc(100%+10px)] left-1/2 min-w-[9.5rem] -translate-x-1/2 rounded-2xl bg-[#171717] p-2 shadow-xl">
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-2 text-[13px] text-white/90 transition-colors hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </details>

      <a
        href="https://x.com/antongzx"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X, @antongzx"
        className="grid size-9 place-items-center rounded-full transition-colors hover:bg-white/10"
      >
        <AtSign size={16} strokeWidth={1.75} aria-hidden />
      </a>
    </nav>
  );
}
