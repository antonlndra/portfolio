"use client";

const SPHERES = [
  { hue: "linear-gradient(145deg, #dbeafe 0%, #93c5fd 40%, #1d4ed8 100%)", size: 72 },
  { hue: "linear-gradient(160deg, #fef3c7 0%, #fbbf24 45%, #b45309 100%)", size: 64 },
  { hue: "linear-gradient(150deg, #fce7f3 0%, #f472b6 42%, #9d174d 100%)", size: 78 },
  { hue: "linear-gradient(155deg, #d1fae5 0%, #34d399 40%, #047857 100%)", size: 60 },
  { hue: "linear-gradient(140deg, #e0e7ff 0%, #818cf8 44%, #3730a3 100%)", size: 70 },
  { hue: "linear-gradient(148deg, #ffedd5 0%, #fb923c 42%, #9a3412 100%)", size: 66 },
  { hue: "linear-gradient(152deg, #f3e8ff 0%, #c084fc 40%, #6b21a8 100%)", size: 74 },
  { hue: "linear-gradient(146deg, #ecfeff 0%, #22d3ee 42%, #0e7490 100%)", size: 62 },
] as const;

export function GlassSphereRing({
  count = 8,
  radius = 210,
}: {
  count?: number;
  radius?: number;
}) {
  const items = SPHERES.slice(0, Math.min(count, SPHERES.length));

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {items.map((sphere, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 block rounded-full"
            style={{
              width: sphere.size,
              height: sphere.size,
              marginLeft: -sphere.size / 2,
              marginTop: -sphere.size / 2,
              transform: `translate(${x}px, ${y}px)`,
              background: sphere.hue,
              boxShadow:
                "inset 0 2px 8px rgba(255,255,255,0.65), inset 0 -10px 18px rgba(0,0,0,0.18), 0 14px 28px rgba(0,0,0,0.12)",
            }}
          >
            <span
              className="absolute inset-[8%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.15) 38%, transparent 60%)",
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
