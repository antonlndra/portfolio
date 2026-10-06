import type { Vec, VectorPath } from "./types";
import { subRange } from "./types";

const n = (x: number) => {
  const r = Math.round(x * 100) / 100;
  return String(r);
};

export function serializePath(path: VectorPath): string {
  const { anchors, starts, closed } = path;
  if (!anchors.length || !starts.length) return "";
  const parts: string[] = [];

  for (let s = 0; s < starts.length; s++) {
    const [begin, end] = subRange(path, s);
    const count = end - begin;
    if (count === 0) continue;
    const isClosed = closed[s];
    parts.push(`M ${n(anchors[begin].p.x)} ${n(anchors[begin].p.y)}`);
    const segCount = isClosed ? count : count - 1;
    for (let k = 0; k < segCount; k++) {
      const a = anchors[begin + k];
      const b = anchors[begin + ((k + 1) % count)];
      if (a.out || b.in) {
        const c1 = a.out ?? a.p;
        const c2 = b.in ?? b.p;
        parts.push(
          `C ${n(c1.x)} ${n(c1.y)} ${n(c2.x)} ${n(c2.y)} ${n(b.p.x)} ${n(b.p.y)}`,
        );
      } else {
        parts.push(`L ${n(b.p.x)} ${n(b.p.y)}`);
      }
    }
    if (isClosed) parts.push("Z");
  }
  return parts.join(" ");
}

export function bounds(path: VectorPath): {
  x: number;
  y: number;
  w: number;
  h: number;
} {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  const eat = (p: Vec) => {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  };
  for (const a of path.anchors) {
    eat(a.p);
    if (a.in) eat(a.in);
    if (a.out) eat(a.out);
  }
  if (!isFinite(minX)) return { x: 0, y: 0, w: 0, h: 0 };
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

/** Compact "anto" letterforms as editable vector anchors */
export function antoPath(): VectorPath {
  return {
    starts: [0, 4, 8, 12],
    closed: [false, false, false, false],
    anchors: [
      // a
      { p: { x: 8, y: 28 }, out: { x: 8, y: 18 }, in: null },
      { p: { x: 18, y: 14 }, out: { x: 26, y: 14 }, in: { x: 12, y: 14 } },
      { p: { x: 28, y: 28 }, out: null, in: { x: 28, y: 18 } },
      { p: { x: 28, y: 22 }, out: { x: 22, y: 18 }, in: null },
      // n
      { p: { x: 36, y: 28 }, out: null, in: null },
      { p: { x: 36, y: 14 }, out: { x: 42, y: 14 }, in: null },
      { p: { x: 48, y: 20 }, out: { x: 48, y: 24 }, in: { x: 48, y: 16 } },
      { p: { x: 48, y: 28 }, out: null, in: null },
      // t
      { p: { x: 56, y: 14 }, out: null, in: null },
      { p: { x: 68, y: 14 }, out: null, in: null },
      { p: { x: 62, y: 10 }, out: null, in: null },
      { p: { x: 62, y: 28 }, out: null, in: null },
      // o
      { p: { x: 78, y: 21 }, out: { x: 78, y: 14 }, in: { x: 78, y: 28 } },
      { p: { x: 88, y: 14 }, out: { x: 96, y: 14 }, in: { x: 82, y: 14 } },
      { p: { x: 96, y: 21 }, out: { x: 96, y: 28 }, in: { x: 96, y: 14 } },
      { p: { x: 88, y: 28 }, out: { x: 82, y: 28 }, in: { x: 94, y: 28 } },
      { p: { x: 78, y: 21 }, out: null, in: { x: 78, y: 28 } },
    ],
  };
}
