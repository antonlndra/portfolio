"use client";

import { useEffect, useRef } from "react";
import { GoldScar } from "./engine";

export function GoldScarScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const engine = new GoldScar(host);
    engine.start();
    return () => engine.destroy();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
}
