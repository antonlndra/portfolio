"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BIO =
  "Llevo diseñando desde los 12 años, siempre tuve cierta pasión por el diseño en general. Empecé con el diseño visual, toqué todo lo que se podía tocar. Ahora, estoy en proceso de conseguir traspasarme a un diseño más infraestructural, diseño de estrategias, identidad de marca, funnels, marketing etc etc.";

export function PaperLetter({ className = "" }: { className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const holding = useRef(false);
  const drag = useRef<{
    dx: number;
    dy: number;
    ox: number;
    oy: number;
    moved: number;
  } | null>(null);

  const crumple = useMotionValue(0);
  const crumpleSpring = useSpring(crumple, { stiffness: 180, damping: 18 });
  const scale = useTransform(crumpleSpring, [0, 1], [1, 0.72]);
  const rotateZ = useTransform(crumpleSpring, [0, 1], [-2.5, 8]);
  const skewX = useTransform(crumpleSpring, [0, 1], [0, -6]);
  const skewY = useTransform(crumpleSpring, [0, 1], [0, 4]);
  const wrinkle = useTransform(crumpleSpring, [0, 1], [0, 1]);

  return (
    <motion.div
      className={className}
      role="note"
      aria-label="Carta. Mantén pulsado para arrugar."
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        holding.current = true;
        crumple.set(1);
        drag.current = {
          dx: e.clientX,
          dy: e.clientY,
          ox: pos.x,
          oy: pos.y,
          moved: 0,
        };
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const dx = e.clientX - drag.current.dx;
        const dy = e.clientY - drag.current.dy;
        drag.current.moved += Math.hypot(
          e.movementX || 0,
          e.movementY || 0,
        );
        setPos({
          x: drag.current.ox + dx,
          y: drag.current.oy + dy,
        });
        if (holding.current) {
          const extra = Math.min(0.25, drag.current.moved / 400);
          crumple.set(Math.min(1, 0.85 + extra));
        }
      }}
      onPointerUp={() => {
        holding.current = false;
        crumple.set(0);
        drag.current = null;
      }}
      onPointerCancel={() => {
        holding.current = false;
        crumple.set(0);
        drag.current = null;
      }}
      style={{
        x: pos.x,
        y: pos.y,
        scale,
        rotate: rotateZ,
        skewX,
        skewY,
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
        width: "min(300px, 88vw)",
        filter: "drop-shadow(0 14px 28px rgba(50, 35, 15, 0.16))",
        transformOrigin: "50% 50%",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "8px -6px -6px 8px",
          background: "#ebe4d6",
          transform: "rotate(2deg)",
          zIndex: 0,
        }}
      />
      <article
        style={{
          position: "relative",
          zIndex: 1,
          padding: "18px 18px 22px 34px",
          backgroundColor: "#fffef9",
          color: "#2a2620",
          border: "1px solid rgba(0,0,0,0.07)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 12.5,
          lineHeight: "24px",
          backgroundImage:
            "repeating-linear-gradient(to bottom, #fffef9 0px, #fffef9 23px, #a8c4e0 23px, #a8c4e0 24px)",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 26,
            width: 1,
            background: "rgba(210, 70, 70, 0.55)",
          }}
        />
        {/* wrinkle overlays while crumpling */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: wrinkle,
            backgroundImage: `
              linear-gradient(115deg, transparent 40%, rgba(0,0,0,0.06) 46%, transparent 52%),
              linear-gradient(70deg, transparent 30%, rgba(0,0,0,0.05) 48%, transparent 60%),
              linear-gradient(160deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 70%)
            `,
            mixBlendMode: "multiply",
          }}
        />
        <p style={{ margin: 0, position: "relative" }}>{BIO}</p>
      </article>
    </motion.div>
  );
}
