"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { radiusFor, squirclePath } from "@/components/squircle/superellipse";

function Eye({
  smirk = false,
  side = "left",
  visible = false,
}: {
  smirk?: boolean;
  side?: "left" | "right";
  visible?: boolean;
}) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const springX = useSpring(pupilX, { stiffness: 300, damping: 20 });
  const springY = useSpring(pupilY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (!visible) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(
        8,
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 12,
      );
      pupilX.set(Math.cos(angle) * distance);
      pupilY.set(Math.sin(angle) * distance);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pupilX, pupilY, visible]);

  if (!visible && !smirk) return null;

  return (
    <motion.div
      ref={eyeRef}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale: 1,
        scaleY: smirk ? 0.42 : 1,
        rotate: smirk ? (side === "left" ? -4 : 4) : 0,
      }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-inner"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          y: smirk ? 2 : 0,
          scaleX: smirk ? 0.5 : 1,
          scaleY: smirk ? 1.6 : 1,
          backgroundColor: smirk ? "#7A0000" : "#000000",
        }}
        className="absolute h-2.5 w-2.5 rounded-full"
      />
    </motion.div>
  );
}

export function ContactGooglyButton({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ w: 148, h: 40 });
  const uid = useId().replace(/:/g, "");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      setSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [hovered, clicked]);

  const path = squirclePath({
    width: size.w,
    height: size.h,
    radius: radiusFor(size.h),
    smoothing: 1,
  });
  const clip = `path("${path}")`;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => setClicked((p) => !p)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex cursor-pointer items-center gap-2 border-0 px-5 py-2.5 select-none ${className}`}
      style={{
        WebkitTapHighlightColor: "transparent",
        color: "#1c1d21",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "-0.02em",
        filter:
          "drop-shadow(0 0 0.5px rgba(0,0,0,0.18)) drop-shadow(0 0.5px 0.5px rgba(255,255,255,0.9))",
      }}
      aria-label={clicked ? "Will touch you" : "Get in touch"}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          clipPath: clip,
          WebkitClipPath: clip,
          background:
            "linear-gradient(180deg, #ffffff 0%, #f4f4f5 52%, #ececed 100%)",
        }}
      />
      <svg
        aria-hidden
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="pointer-events-none absolute inset-0"
      >
        <defs>
          <linearGradient id={`sq-s-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d3d6db" />
            <stop offset="1" stopColor="#7f8288" />
          </linearGradient>
          <clipPath id={`sq-c-${uid}`}>
            <path d={path} />
          </clipPath>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={`url(#sq-s-${uid})`}
          strokeWidth={2}
          clipPath={`url(#sq-c-${uid})`}
        />
      </svg>

      <span className="relative z-[1] inline-flex min-w-[96px] items-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={clicked ? "b" : "a"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="block whitespace-nowrap text-[#1c1d21]"
          >
            {clicked ? "Will touch you" : "Get in touch"}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="relative z-[1] flex items-center gap-1.5">
        <AnimatePresence>
          {(hovered || clicked) && (
            <>
              <Eye key="l" smirk={clicked} side="left" visible />
              <Eye key="r" smirk={clicked} side="right" visible />
            </>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
