"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getSiteTheme,
  setSiteTheme,
  SITE_THEME_EVENT,
} from "@/lib/siteTheme";

const STARS = [
  { x: 18, y: 18, delay: 0 },
  { x: 34, y: 14, delay: 0.3 },
  { x: 52, y: 22, delay: 0.6 },
  { x: 70, y: 16, delay: 0.2 },
  { x: 26, y: 34, delay: 0.5 },
  { x: 60, y: 30, delay: 0.4 },
  { x: 44, y: 44, delay: 0.7 },
];

export function DayNightToggle({ className = "" }: { className?: string }) {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    setIsDay(getSiteTheme() !== "dark");
    const handleThemeChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const currentTheme = detail?.theme || getSiteTheme();
      setIsDay(currentTheme !== "dark");
    };
    window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
  }, []);

  const handleToggle = () => {
    const next = !isDay;
    setIsDay(next);
    setSiteTheme(next ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      className={`relative h-[52px] w-[148px] cursor-pointer overflow-hidden rounded-full border border-white/25 select-none ${className}`}
      style={{
        boxShadow:
          "inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -6px 16px rgba(0,0,0,0.35), 0 8px 22px -8px rgba(0,0,0,0.45)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={isDay ? "Cambiar a modo noche" : "Cambiar a modo día"}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1330] to-[#131c42]" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#6fa3d8] to-[#a9c9e8]"
        animate={{ opacity: isDay ? 1 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isDay ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute h-[2.5px] w-[2.5px] rounded-full bg-white shadow-[0_0_4px_white]"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: isDay ? 1 : 0, y: isDay ? 0 : 4 }}
        transition={{ duration: 0.5, delay: isDay ? 0.15 : 0 }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="absolute text-[9px] font-bold text-white/80"
            style={{ left: `${48 + i * 12}%`, top: `${24 + i * 8}%` }}
          >
            ⌃⌃
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex h-4 items-end justify-center gap-1.5 px-5">
        {[
          { w: 22, h: 8, xRange: [0, 5, 0], dur: 6 },
          { w: 30, h: 10, xRange: [0, -6, 0], dur: 7 },
          { w: 18, h: 7, xRange: [0, 4, 0], dur: 5 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{ width: c.w, height: c.h }}
            animate={{
              x: c.xRange,
              backgroundColor: isDay
                ? "rgba(255,255,255,0.92)"
                : "rgba(255,255,255,0.45)",
            }}
            transition={{
              x: { duration: c.dur, repeat: Infinity, ease: "easeInOut" },
              backgroundColor: { duration: 0.7 },
            }}
          />
        ))}
      </div>
      <motion.div
        className="pointer-events-none absolute top-1/2 h-[34px] w-[34px] -translate-y-1/2 rounded-full"
        animate={{
          x: isDay ? 10 : 104,
          boxShadow: isDay
            ? "0 0 16px 6px rgba(255,255,255,0.55), inset 0 2px 3px rgba(255,255,255,0.8)"
            : "0 0 18px 7px rgba(180,205,255,0.45), inset 0 2px 3px rgba(255,255,255,0.55)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
        style={{
          left: 0,
          background:
            "radial-gradient(circle at 35% 30%, #ffffff, #eef3fb 60%, #d8e4f4)",
        }}
      />
    </motion.button>
  );
}
