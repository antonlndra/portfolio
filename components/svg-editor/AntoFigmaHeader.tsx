"use client";

import { FigmaFrame } from "./FigmaFrame";

export function AntoFigmaHeader({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <FigmaFrame width={88} height={36}>
        <div
          style={{
            width: 88,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "var(--note-ink)",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          anto
        </div>
      </FigmaFrame>
    </div>
  );
}
