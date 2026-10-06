import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

globalThis.FileReader = class FileReader {
  constructor() {
    this.result = null;
    this.onloadend = null;
    this.onload = null;
    this.onerror = null;
  }
  readAsArrayBuffer(blob) {
    Promise.resolve(blob.arrayBuffer())
      .then((buf) => {
        this.result = buf;
        this.onload?.({ target: this });
        this.onloadend?.({ target: this });
      })
      .catch((e) => this.onerror?.(e));
  }
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "../public/models/scar.glb");
mkdirSync(dirname(out), { recursive: true });

const group = new THREE.Group();
group.name = "SCAR";

const matTan = new THREE.MeshStandardMaterial({
  color: 0xc4a574,
  metalness: 0.15,
  roughness: 0.7,
});
const matDark = new THREE.MeshStandardMaterial({
  color: 0x1a1a1a,
  metalness: 0.7,
  roughness: 0.35,
});
const matMag = new THREE.MeshStandardMaterial({
  color: 0x3d3d3d,
  metalness: 0.4,
  roughness: 0.5,
});

function box(w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  group.add(m);
}

function cyl(rTop, rBot, h, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 12), mat);
  m.position.set(x, y, z);
  m.rotation.z = Math.PI / 2;
  group.add(m);
}

box(1.1, 0.28, 0.22, matTan, 0, 0.05, 0);
box(0.7, 0.2, 0.2, matDark, 0.85, 0.04, 0);
cyl(0.035, 0.035, 0.85, matDark, 1.55, 0.08, 0);
cyl(0.05, 0.04, 0.12, matDark, 2.0, 0.08, 0);
box(0.55, 0.22, 0.18, matTan, -0.85, 0.02, 0);
box(0.12, 0.35, 0.16, matTan, -1.15, -0.02, 0);
box(0.14, 0.32, 0.12, matDark, -0.25, -0.22, 0);
box(0.18, 0.42, 0.14, matMag, 0.15, -0.28, 0);
box(0.55, 0.06, 0.12, matDark, 0.1, 0.22, 0);
box(0.28, 0.12, 0.14, matDark, 0.05, 0.32, 0);
box(0.06, 0.14, 0.04, matDark, 1.15, 0.2, 0);
box(0.18, 0.08, 0.1, matDark, -0.15, -0.08, 0);

const exporter = new GLTFExporter();
const result = await new Promise((resolve, reject) => {
  exporter.parse(group, resolve, reject, { binary: true });
});
const buf = Buffer.from(result);
writeFileSync(out, buf);
console.log("Wrote", out, buf.length, "bytes");
