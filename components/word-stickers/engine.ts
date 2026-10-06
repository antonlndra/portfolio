import { STICKERS, type StickerDef } from "./stickers";
import { renderSticker } from "./sticker-render";

const FRICTION = 0.92;
const BOUNCE = 0.55;
const MIN_VEL = 0.05;
const THROW_SCALE = 0.7;
const GRAB_SCALE = 1.12;
const SCALE_EASE = 0.12;
const DRAG_EASE = 0.1;
const APPEAR_EASE = 0.09;
const APPEAR_STAGGER_MS = 140;

interface Item {
  def: StickerDef;
  art: HTMLCanvasElement;
  hit: HTMLDivElement;
  w: number;
  h: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  rot: number;
  spin: number;
  scale: number;
  dragging: boolean;
  appear: number;
  appearAt: number;
}

export class WordStickers {
  private host: HTMLElement;
  private items: Item[] = [];
  private W = 1;
  private H = 1;
  private dpr = 1;
  private raf = 0;
  private running = false;
  private disposed = false;
  private laidOut = false;
  private entranceStarted = false;
  private now = 0;
  private drag: {
    item: Item;
    dx: number;
    dy: number;
    lastX: number;
    lastY: number;
    pointerId: number;
  } | null = null;
  private ro?: ResizeObserver;
  private cleanup: (() => void)[] = [];

  constructor(host: HTMLElement) {
    this.host = host;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.measure();

    for (const def of STICKERS) {
      const fontSizePx = this.stickerFontPx();
      const r = renderSticker({
        word: def.word,
        font: def.font,
        weight: def.weight,
        fill: def.fill,
        outline: def.outline,
        fontSizePx,
      });

      const art = r.canvas;
      Object.assign(art.style, {
        position: "absolute",
        width: `${r.width}px`,
        height: `${r.height}px`,
        left: "0",
        top: "0",
        pointerEvents: "none",
        willChange: "transform",
      });
      art.setAttribute("aria-hidden", "true");
      host.appendChild(art);

      const hit = document.createElement("div");
      Object.assign(hit.style, {
        position: "absolute",
        left: "0",
        top: "0",
        width: `${r.width}px`,
        height: `${r.height}px`,
        cursor: "grab",
        touchAction: "none",
      });
      hit.setAttribute("aria-hidden", "true");
      host.appendChild(hit);

      const item: Item = {
        def,
        art,
        hit,
        w: r.width,
        h: r.height,
        x: def.x * this.W - r.width / 2,
        y: def.y * this.H - r.height / 2,
        tx: 0,
        ty: 0,
        vx: 0,
        vy: 0,
        rot: def.rot,
        spin: 0,
        scale: 1,
        dragging: false,
        appear: 0,
        appearAt: 0,
      };
      item.tx = item.x;
      item.ty = item.y;
      this.clampInside(item);
      this.placeItem(item);
      this.items.push(item);
      this.bindDrag(item);
    }

    this.ro = new ResizeObserver(() => this.onResize());
    this.ro.observe(host);
  }

  private measure() {
    this.W = this.host.clientWidth || 1;
    this.H = this.host.clientHeight || 1;
  }

  private stickerFontPx() {
    const w = this.W > 40 ? this.W : 640;
    return Math.max(28, Math.min(52, w * 0.07));
  }

  private onResize() {
    const prevW = this.W;
    const prevH = this.H;
    this.measure();
    if (this.W < 2 || this.H < 2) return;
    const sx = this.W / (prevW || 1);
    const sy = this.H / (prevH || 1);
    for (const it of this.items) {
      it.x *= sx;
      it.y *= sy;
      it.tx = it.x;
      it.ty = it.y;
    }
    this.rerenderAll();
  }

  private placeItem(it: Item) {
    const a = it.appearAt > 0 ? it.appear : 1;
    const s = it.scale * a;
    const t = `translate(${it.x}px, ${it.y}px) rotate(${it.rot}deg)${s !== 1 ? ` scale(${s})` : ""}`;
    it.hit.style.transform = t;
    it.art.style.transform = t;
  }

  private clampInside(it: Item) {
    it.x = Math.max(0, Math.min(this.W - it.w, it.x));
    it.y = Math.max(0, Math.min(this.H - it.h, it.y));
  }

  private bindDrag(it: Item) {
    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      this.host.appendChild(it.hit);
      this.host.appendChild(it.art);
      it.dragging = true;
      it.vx = it.vy = 0;
      it.spin = 0;
      it.hit.style.cursor = "grabbing";
      it.hit.style.zIndex = "10";
      it.art.style.zIndex = "9";
      const r = this.rect();
      this.drag = {
        item: it,
        dx: e.clientX - r.left - it.x,
        dy: e.clientY - r.top - it.y,
        lastX: e.clientX,
        lastY: e.clientY,
        pointerId: e.pointerId,
      };
      it.hit.setPointerCapture?.(e.pointerId);
    };
    it.hit.addEventListener("pointerdown", onDown);
    this.cleanup.push(() => it.hit.removeEventListener("pointerdown", onDown));

    const onMove = (e: PointerEvent) => {
      if (!this.drag || this.drag.item !== it) return;
      const r = this.rect();
      it.tx = e.clientX - r.left - this.drag.dx;
      it.ty = e.clientY - r.top - this.drag.dy;
      it.vx = e.clientX - this.drag.lastX;
      it.vy = e.clientY - this.drag.lastY;
      this.drag.lastX = e.clientX;
      this.drag.lastY = e.clientY;
    };
    it.hit.addEventListener("pointermove", onMove);
    this.cleanup.push(() => it.hit.removeEventListener("pointermove", onMove));

    const onUp = (e: PointerEvent) => {
      if (!this.drag || this.drag.item !== it) return;
      it.dragging = false;
      it.hit.style.cursor = "grab";
      it.hit.style.zIndex = "";
      it.art.style.zIndex = "";
      it.vx *= THROW_SCALE;
      it.vy *= THROW_SCALE;
      it.spin = it.vx * 0.15;
      if (Math.hypot(it.vx, it.vy) < 1) {
        it.spin = (Math.random() - 0.5) * 4;
      }
      it.hit.releasePointerCapture?.(e.pointerId);
      this.drag = null;
    };
    it.hit.addEventListener("pointerup", onUp);
    it.hit.addEventListener("pointercancel", onUp);
    this.cleanup.push(() => {
      it.hit.removeEventListener("pointerup", onUp);
      it.hit.removeEventListener("pointercancel", onUp);
    });
  }

  private rect() {
    return this.host.getBoundingClientRect();
  }

  start() {
    if (this.running || this.disposed) return;
    const prevW = this.W;
    this.measure();
    if (!this.laidOut || Math.abs(this.W - prevW) > 2) {
      this.layout();
      this.laidOut = true;
    }
    if (!this.entranceStarted) {
      this.entranceStarted = true;
      const order = [...this.items].sort((a, b) => a.def.x - b.def.x);
      const t0 = performance.now() + 150;
      order.forEach((it, i) => (it.appearAt = t0 + i * APPEAR_STAGGER_MS));
    }
    this.running = true;
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private layout() {
    if (this.W < 2 || this.H < 2) return;
    this.rerenderAll();
    for (const it of this.items) {
      it.x = it.def.x * this.W - it.w / 2;
      it.y = it.def.y * this.H - it.h / 2;
      it.tx = it.x;
      it.ty = it.y;
      it.vx = it.vy = 0;
      it.rot = it.def.rot;
      it.scale = 1;
      this.clampInside(it);
      this.placeItem(it);
    }
  }

  private loop = () => {
    if (!this.running) return;
    this.now = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    for (const it of this.items) {
      if (it.appearAt > 0 && this.now >= it.appearAt && it.appear < 1) {
        it.appear += (1 - it.appear) * APPEAR_EASE;
        if (it.appear > 0.999) it.appear = 1;
      }

      const targetScale = it.dragging ? GRAB_SCALE : 1;
      if (Math.abs(targetScale - it.scale) > 0.001)
        it.scale += (targetScale - it.scale) * SCALE_EASE;

      if (it.dragging) {
        const nx = it.x + (it.tx - it.x) * DRAG_EASE;
        const ny = it.y + (it.ty - it.y) * DRAG_EASE;
        it.vx = nx - it.x;
        it.vy = ny - it.y;
        it.x = nx;
        it.y = ny;
        this.placeItem(it);
        continue;
      }

      if (reduce) {
        it.vx = it.vy = it.spin = 0;
        this.placeItem(it);
        continue;
      }

      const appearing = it.appearAt > 0 && it.appear < 1;
      const moving =
        Math.abs(it.vx) >= MIN_VEL ||
        Math.abs(it.vy) >= MIN_VEL ||
        Math.abs(it.spin) > 0.02;
      if (!moving && Math.abs(it.scale - 1) < 0.001 && !appearing) continue;

      it.x += it.vx;
      it.y += it.vy;
      it.rot += it.spin;
      if (it.x < 0) {
        it.x = 0;
        it.vx = -it.vx * BOUNCE;
        it.spin = -it.spin * BOUNCE;
      } else if (it.x > this.W - it.w) {
        it.x = this.W - it.w;
        it.vx = -it.vx * BOUNCE;
        it.spin = -it.spin * BOUNCE;
      }
      if (it.y < 0) {
        it.y = 0;
        it.vy = -it.vy * BOUNCE;
      } else if (it.y > this.H - it.h) {
        it.y = this.H - it.h;
        it.vy = -it.vy * BOUNCE;
      }
      it.vx *= FRICTION;
      it.vy *= FRICTION;
      it.spin *= FRICTION;
      this.placeItem(it);
    }

    this.raf = requestAnimationFrame(this.loop);
  };

  private rerenderAll() {
    const fontSizePx = this.stickerFontPx();
    for (const it of this.items) {
      const r = renderSticker({
        word: it.def.word,
        font: it.def.font,
        weight: it.def.weight,
        fill: it.def.fill,
        outline: it.def.outline,
        fontSizePx,
      });
      it.w = r.width;
      it.h = r.height;
      it.hit.style.width = `${r.width}px`;
      it.hit.style.height = `${r.height}px`;
      const ctx = it.art.getContext("2d")!;
      it.art.width = r.canvas.width;
      it.art.height = r.canvas.height;
      it.art.style.width = `${r.width}px`;
      it.art.style.height = `${r.height}px`;
      ctx.clearRect(0, 0, it.art.width, it.art.height);
      ctx.drawImage(r.canvas, 0, 0);
      this.clampInside(it);
      this.placeItem(it);
    }
  }

  destroy() {
    this.disposed = true;
    this.stop();
    this.cleanup.forEach((fn) => fn());
    this.ro?.disconnect();
    for (const it of this.items) {
      it.hit.parentNode?.removeChild(it.hit);
      it.art.parentNode?.removeChild(it.art);
    }
  }
}
