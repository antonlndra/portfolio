export interface SquircleOptions {
  width: number;
  height: number;
  radius: number;
  smoothing: number;
  exponent?: number;
}

const DEFAULT_EXPONENT = 5;
const n = (v: number) => v.toFixed(4);

const CORNER: readonly [number, number][][] = [
  [
    [0.3, 0],
    [0.473, 0],
    [0.619, 0.039],
  ],
  [
    [0.804, 0.088],
    [0.912, 0.196],
    [0.961, 0.381],
  ],
  [
    [1, 0.527],
    [1, 0.7],
    [1, 1],
  ],
];

function rot90([x, y]: [number, number], k: number): [number, number] {
  switch (((k % 4) + 4) % 4) {
    case 1:
      return [y, -x];
    case 2:
      return [-x, -y];
    case 3:
      return [-y, x];
    default:
      return [x, y];
  }
}

function cornerCubics(
  sx: number,
  sy: number,
  radius: number,
  k: number,
): string {
  const put = (p: [number, number]) => {
    const [rx, ry] = rot90(p, k);
    return `${n(sx + rx * radius)} ${n(sy + ry * radius)}`;
  };
  return CORNER.map(
    ([c1, c2, end]) => `C ${put(c1)} ${put(c2)} ${put(end)}`,
  ).join(" ");
}

export function squirclePath({
  width,
  height,
  radius,
  smoothing,
  exponent = DEFAULT_EXPONENT,
}: SquircleOptions): string {
  const budget = Math.min(width, height) / 2;
  const s = Math.max(0, Math.min(1, smoothing));
  const r = Math.max(0, Math.min(radius, budget)) * (0.4 + 0.6 * s);
  void exponent;

  if (r <= 0) {
    return `M 0 0 L ${n(width)} 0 L ${n(width)} ${n(height)} L 0 ${n(height)} Z`;
  }

  const corner = (sx: number, sy: number, k: number) =>
    cornerCubics(sx, sy, r, k);

  return [
    `M ${n(r)} 0`,
    `L ${n(width - r)} 0`,
    corner(width - r, 0, 0),
    `L ${n(width)} ${n(height - r)}`,
    corner(width, height - r, 3),
    `L ${n(r)} ${n(height)}`,
    corner(r, height, 2),
    `L 0 ${n(r)}`,
    corner(0, r, 1),
    "Z",
  ].join(" ");
}

export function radiusFor(height: number): number {
  return Math.round(height * 0.42);
}
