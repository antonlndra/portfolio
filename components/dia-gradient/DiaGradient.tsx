"use client";

import { useEffect, useRef, useState } from "react";

type Stop = { offset: number; color: string };

const DIA_STOPS: Stop[] = [
  { offset: 0, color: "#340B05" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#5092C7" },
  { offset: 0.4135, color: "#E1ECFE" },
  { offset: 0.5866, color: "#FFD400" },
  { offset: 0.6827, color: "#FA3D1D" },
  { offset: 0.8029, color: "#FD02F5" },
  { offset: 1, color: "#FFC0FD00" },
];

const VBW = 1271;
const VBH = 599;

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/**
 * Dia rainbow floor glow. scaleY is driven by scroll against an unscaled
 * wrapper (so a flat glow still reports its layout box). Flat while the
 * footer is below the viewport; rises as the footer comes into view.
 * prefers-reduced-motion keeps full height.
 */
export function DiaGradient({
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
}: {
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  riseMs?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setScale(1);
      return;
    }

    const el = wrapRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 while the glow box is still fully below the viewport;
      // 1 once its top has risen well into view.
      const start = vh;
      const end = vh * 0.72;
      setScale(clamp01((start - rect.top) / (start - end)));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const heights = bellHeights(bars, peak, valley);
  const colW = VBW / bars;

  return (
    <div ref={wrapRef} aria-hidden style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "bottom",
          transform: `scaleY(${scale})`,
          willChange: "transform",
        }}
      >
        <svg
          style={{ height: "100%", width: "100%" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dia-grad" x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter id="dia-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {heights.map((h, i) => (
            <g key={i} filter="url(#dia-blur)">
              <rect
                x={i * colW}
                y={VBH - h}
                width={colW * 1.23}
                height={h}
                fill="url(#dia-grad)"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
