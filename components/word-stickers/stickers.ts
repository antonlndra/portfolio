export interface StickerDef {
  word: string;
  font: string;
  weight: number;
  fill: string;
  outline: string;
  x: number;
  y: number;
  rot: number;
}

export const STICKERS: StickerDef[] = [
  {
    word: "with love",
    font: "Georgia, 'Times New Roman', serif",
    weight: 700,
    outline: "#ff2e6e",
    fill: "#2b0b4f",
    x: 0.18,
    y: 0.45,
    rot: -8,
  },
  {
    word: "design",
    font: "Arial Black, Impact, sans-serif",
    weight: 900,
    outline: "#1668ff",
    fill: "#eaff5a",
    x: 0.52,
    y: 0.4,
    rot: 6,
  },
  {
    word: "anto",
    font: "Courier New, monospace",
    weight: 700,
    outline: "#ffd21e",
    fill: "#c81e5b",
    x: 0.82,
    y: 0.5,
    rot: -3,
  },
];
