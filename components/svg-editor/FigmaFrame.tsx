"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface FrameStyle {
  accent: string;
  handleSize: number;
  handleFill: string;
  borderWidth: number;
  showHandles: boolean;
  showBadge: boolean;
  badgeBg: string;
  badgeText: string;
}

export const DEFAULT_FRAME: FrameStyle = {
  accent: "#0d99ff",
  handleSize: 8,
  handleFill: "#ffffff",
  borderWidth: 1.5,
  showHandles: true,
  showBadge: true,
  badgeBg: "#0d99ff",
  badgeText: "#ffffff",
};

export function FigmaFrame({
  children,
  style = DEFAULT_FRAME,
  width,
  height,
}: {
  children: ReactNode;
  style?: FrameStyle;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: width ?? 0, h: height ?? 0 });

  useEffect(() => {
    if (width != null && height != null) {
      setSize({ w: width, h: height });
      return;
    }
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const nextW = Math.round(r.width);
      const nextH = Math.round(r.height);
      if (nextW > 0 && nextH > 0) {
        setSize({ w: nextW, h: nextH });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  const w = width ?? size.w;
  const h = height ?? size.h;
  const s = style;
  const half = s.handleSize / 2;

  const handle = (pos: CSSProperties): CSSProperties => ({
    position: "absolute",
    zIndex: 10,
    width: s.handleSize,
    height: s.handleSize,
    backgroundColor: s.handleFill,
    border: `1.5px solid ${s.accent}`,
    borderRadius: 1,
    boxSizing: "border-box",
    pointerEvents: "none",
    ...pos,
  });

  return (
    <span
      ref={ref}
      className="relative inline-block"
      style={{
        width: width ?? "auto",
        height: height ?? "auto",
        verticalAlign: "baseline",
        lineHeight: 1,
        overflow: "visible",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 0,
          border: `${s.borderWidth}px solid ${s.accent}`,
          boxSizing: "border-box",
        }}
      />
      {s.showHandles && (
        <>
          <span aria-hidden style={handle({ top: -half, left: -half })} />
          <span aria-hidden style={handle({ top: -half, right: -half })} />
          <span aria-hidden style={handle({ bottom: -half, right: -half })} />
          <span aria-hidden style={handle({ bottom: -half, left: -half })} />
        </>
      )}
      {s.showBadge && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 z-10 whitespace-nowrap rounded-[4px] px-1.5 py-0.5 text-[10px] tabular-nums leading-none"
          style={{
            top: "calc(100% + 5px)",
            backgroundColor: s.badgeBg,
            color: s.badgeText,
            transform: "translateX(-50%)",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 500,
          }}
        >
          {w} × {h}
        </span>
      )}
      {children}
    </span>
  );
}
