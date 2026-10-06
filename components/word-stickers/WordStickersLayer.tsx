"use client";

import { useEffect, useRef } from "react";
import { WordStickers } from "./engine";

export function WordStickersLayer({
  className = "",
  overflowVisible = false,
}: {
  className?: string;
  overflowVisible?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cancelled = false;
    let engine: WordStickers | null = null;

    const boot = async () => {
      try {
        await document.fonts?.ready;
      } catch {
        /* ignore */
      }
      if (cancelled || !ref.current) return;
      host.replaceChildren();
      engine = new WordStickers(ref.current);
      engine.start();
    };
    boot();

    return () => {
      cancelled = true;
      engine?.destroy();
      host.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: overflowVisible ? "visible" : "hidden",
      }}
    />
  );
}
