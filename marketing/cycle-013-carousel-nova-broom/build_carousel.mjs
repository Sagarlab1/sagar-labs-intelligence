import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const artPath = path.join(root, "marketing/cycle-013-carousel-nova-broom/assets/nova-broom-key-art-v1.png");
const outDir = path.join(root, "previews/cycle-013-carousel-nova-broom");
const art = await fs.readFile(artPath);
await fs.mkdir(outDir, { recursive: true });

const C = {
  bg: "#071217",
  text: "#f5f8f6",
  muted: "#a9bfbc",
  dim: "#6f9290",
  line: "#214146",
  cyan: "#9cf2e4",
  teal: "#2c9b8d",
  amber: "#f0a15b",
  blue: "#7aaeff",
  rose: "#e9a9ae",
  panel: "#0e2429"
};

const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const t = (x, y, value, size, fill = C.text, weight = 400, spacing = 0, anchor = "start") =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}">${esc(value)}</text>`;
const rect = (x, y, w, h, fill, stroke = "none", radius = 0, opacity = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" opacity="${opacity}"/>`;
const line = (x1, y1, x2, y2, stroke = C.line, width = 1) => `<path d="M${x1} ${y1}H${x2}" stroke="${stroke}" stroke-width="${width}"/>`;
const connector = (x1, y1, x2, y2, stroke) =>
  `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 7" opacity="0.82"/><circle cx="${x2}" cy="${y2}" r="5" fill="${stroke}"/>`;
const dialogue = (x, y, w, h, accent, speaker, lines, anchorX, anchorY, side = "right", size = 20) => {
  const startX = side === "left" ? x : x + w;
  const startY = y + h / 2;
  const body = lines.map((value, index) => t(x + 24, y + 62 + index * 27, value, size, C.text, 700)).join("");
  return [
    connector(startX, startY, anchorX, anchorY, accent),
    rect(x, y, w, h, C.panel, accent, 12),
    t(x + 24, y + 32, speaker, 12, accent, 700, 2),
    body
  ].join("");
};

function shell(page, section) {
  return [
    rect(0, 0, 1080, 1350, C.bg),
    line(72, 144, 1008),
    line(72, 1203, 1008),
    t(72, 86, "SAGAR / SEÑAL DE INFRAESTRUCTURA", 19, C.cyan, 700, 3),
    t(1008, 86, `${String(page).padStart(2, "0")} / 07`, 16, C.dim, 400, 2, "end"),
    t(72, 188, section, 16, C.dim, 400, 2)
  ].join("");
}

function svg(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${content}</svg>`;
}

async function artLayer(width, height, left, top, position = "attention", opacity = 1) {
  const image = await sharp(art).resize(width, height, { fit: "cover", position }).png().toBuffer();
  const overlay = opacity === 1 ? image : await sharp(image).composite([{ input: Buffer.from(svg(width, height, rect(0, 0, width, height, C.bg, "none", 0, 1 - opacity))) }]).png().toBuffer();
  return { input: overlay, left, top };
}

async function render(page, section, body, artSpecs = []) {
  const base = Buffer.from(svg(1080, 1350, shell(page, section) + body.background));
  const copy = Buffer.from(svg(1080, 1350, body.copy));
  const layers = [];
  for (const spec of artSpecs) layers.push(await artLayer(spec.width, spec.height, spec.left, spec.top, spec.position, spec.opacity ?? 1));
  layers.push({ input: copy, left: 0, top: 0 });
  await sharp(base).composite(layers).png().toFile(path.join(outDir, `slide-${String(page).padStart(2, "0")}.png`));
}

await render(1, "CYCLE_013 · HISTORIA DE UNA DECISIÓN", {
  background: [
    rect(610, 235, 390, 700, "#10272d", C.teal, 3),
    rect(610, 235, 390, 700, "#071217", "none", 3, 0.22)
  ].join(""),
  copy: [
    t(72, 330, "¿Una fecha", 62, C.text, 700, -2),
    t(72, 398, "significa que", 62, C.text, 700, -2),
    t(72, 466, "la energía", 62, C.text, 700, -2),
    t(72, 534, "ya está lista?", 62, C.text, 700, -2),
    rect(72, 575, 88, 5, C.amber),
    dialogue(72, 640, 500, 92, C.cyan, "NOVA", ["Primero, miremos", "la evidencia."], 920, 410, "right", 20),
    dialogue(72, 760, 500, 82, C.amber, "BROOM", ["¡Yo traje la lupa!"], 770, 720, "right", 20),
    t(72, 1262, "[PUBLIC SIGNAL] · CYCLE_013 · APROBACIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.5)
  ].join("")
}, [{ width: 390, height: 700, left: 610, top: 235, position: "attention" }]);

await render(2, "EL EXPEDIENTE", {
  background: [
    rect(72, 610, 575, 330, C.panel, C.teal, 2),
    rect(704, 430, 304, 500, "#10272d", C.line, 3),
    rect(72, 980, 936, 118, "#101d2b", C.blue, 2)
  ].join(""),
  copy: [
    t(72, 320, "La investigación", 62, C.text, 700, -2),
    t(72, 390, "empieza aquí.", 62, C.text, 700, -2),
    t(72, 485, "CYCLE_013 revisó fuentes públicas primarias", 22, C.muted),
    t(72, 520, "sobre Christopher M. Crane Clean Energy Center.", 22, C.muted),
    t(102, 675, "[VERIFIED]", 13, C.cyan, 700, 2),
    t(102, 730, "9 fuentes públicas indexadas", 31, C.text, 700),
    dialogue(102, 790, 250, 78, C.cyan, "NOVA", ["No sigamos el ruido."], 945, 540, "right", 18),
    dialogue(375, 790, 250, 78, C.amber, "BROOM", ["Sigamos los documentos."], 830, 735, "right", 18),
    t(72, 1040, "NRC · Constellation · FERC", 25, C.text, 700),
    t(72, 1080, "Tres rutas públicas dentro de un expediente más amplio.", 19, C.muted),
    t(72, 1262, "ÍNDICE DE FUENTES CONSULTADO 2026-09-01 · REVISIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.3)
  ].join("")
}, [{ width: 304, height: 500, left: 704, top: 430, position: "attention" }]);

await render(3, "LA PRIMERA REVELACIÓN", {
  background: [
    rect(72, 600, 430, 390, "#13252b", C.amber, 2),
    rect(578, 600, 430, 390, C.panel, C.teal, 2)
  ].join(""),
  copy: [
    t(72, 338, "La señal era real.", 60, C.text, 700, -2),
    t(72, 410, "La preparación no", 60, C.text, 700, -2),
    t(72, 475, "estaba demostrada.", 60, C.text, 700, -2),
    t(102, 655, "[PUBLIC SIGNAL]", 13, C.amber, 700, 2),
    t(102, 730, "Había anuncio", 30, C.text, 700),
    t(102, 770, "y cronología", 30, C.text, 700),
    t(102, 810, "regulatoria.", 30, C.text, 700),
    t(102, 900, "Eso es una señal.", 19, C.muted),
    t(608, 655, "[VERIFIED]", 13, C.cyan, 700, 2),
    t(608, 730, "El expediente", 30, C.text, 700),
    t(608, 770, "respaldó pedir", 30, C.text, 700),
    t(608, 810, "más evidencia.", 30, C.text, 700),
    t(608, 900, "Eso no demuestra preparación.", 19, C.muted),
    dialogue(578, 1018, 430, 102, C.cyan, "NOVA", ["Una señal abre la investigación."], 940, 285, "right", 18),
    t(72, 1262, "LÍMITE VISIBLE · EL DIÁLOGO ES RECURSO NARRATIVO · SIN ENVÍOS EXTERNOS", 14, C.dim, 400, 1.3)
  ].join("")
}, [{ width: 210, height: 270, left: 800, top: 230, position: "right", opacity: 0.34 }]);

await render(4, "EL LIBRO DE GATES", {
  background: [
    rect(72, 600, 936, 90, "#160f15", C.rose, 2),
    rect(72, 710, 936, 90, "#160f15", C.rose, 2),
    rect(72, 820, 936, 90, "#160f15", C.rose, 2),
    rect(72, 930, 936, 90, "#2a2011", "#b0803e", 2),
    rect(72, 1040, 936, 90, "#160f15", C.rose, 2)
  ].join(""),
  copy: [
    t(72, 330, "Cinco puertas.", 64, C.text, 700, -2),
    t(72, 402, "Ninguna se abre", 64, C.text, 700, -2),
    t(72, 474, "con un titular.", 64, C.text, 700, -2),
    t(102, 637, "INTERCONEXIÓN", 13, C.rose, 700, 2), t(790, 637, "SIN SOPORTE", 13, C.rose, 700, 2),
    t(102, 747, "CAPACIDAD ELÉCTRICA", 13, C.rose, 700, 2), t(790, 747, "SIN SOPORTE", 13, C.rose, 700, 2),
    t(102, 857, "IMPLEMENTACIÓN DE RED", 13, C.rose, 700, 2), t(790, 857, "SIN SOPORTE", 13, C.rose, 700, 2),
    t(102, 967, "CALENDARIO", 13, "#f2c979", 700, 2), t(790, 967, "SOPORTE LIMITADO", 13, "#f2c979", 700, 2),
    t(102, 1077, "AGUA", 13, C.rose, 700, 2), t(790, 1077, "SIN SOPORTE", 13, C.rose, 700, 2),
    dialogue(578, 462, 430, 92, C.amber, "BROOM", ["Aquí faltan bastantes llaves."], 900, 375, "right", 18),
    t(72, 1262, "[UNKNOWN] ES UN ESTADO DE DECISIÓN · REVISIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.1)
  ].join("")
}, [{ width: 188, height: 240, left: 820, top: 230, position: "left", opacity: 0.42 }]);

await render(5, "LA CONFUSIÓN", {
  background: [
    rect(72, 570, 936, 190, "#2a2011", C.amber, 2),
    rect(72, 804, 936, 190, C.panel, C.teal, 2)
  ].join(""),
  copy: [
    t(72, 338, "Una expectativa", 62, C.text, 700, -2),
    t(72, 410, "no es una entrega.", 62, C.text, 700, -2),
    t(102, 655, "[PUBLIC SIGNAL]", 13, C.amber, 700, 2),
    t(102, 730, "PPA + fecha esperada", 42, C.text, 700),
    t(102, 889, "[UNKNOWN]", 13, C.cyan, 700, 2),
    t(102, 964, "Entrega firme + energización", 42, C.text, 700),
    dialogue(540, 470, 468, 80, C.amber, "BROOM", ["¿La fecha es la llegada?"], 840, 440, "right", 18),
    t(72, 1262, "LÍMITE DE LA AFIRMACIÓN: ANUNCIO ≠ ENTREGA · REVISIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.2)
  ].join("")
}, [{ width: 230, height: 300, left: 760, top: 205, position: "attention", opacity: 0.26 }]);

await render(6, "LA DECISIÓN", {
  background: [
    rect(72, 575, 610, 230, "#101d2b", C.blue, 2),
    rect(72, 870, 292, 150, C.panel, C.teal, 2),
    rect(394, 870, 292, 150, "#13252b", C.amber, 2),
    rect(716, 870, 292, 150, "#160f15", C.rose, 2)
  ].join(""),
  copy: [
    t(72, 338, "Todavía no", 68, C.text, 700, -2),
    t(72, 418, "avances.", 68, C.text, 700, -2),
    t(72, 485, "El siguiente movimiento es evidencia.", 24, C.muted),
    t(102, 638, "[VERIFIED] SIGUIENTE DECISIÓN", 13, C.blue, 700, 2),
    t(102, 710, "Solicitar una sala de datos", 34, C.text, 700),
    t(102, 755, "técnica y regulatoria, acotada.", 34, C.text, 700),
    t(96, 914, "01 / PEDIR", 13, C.cyan, 700, 2), t(96, 967, "Nombra la prueba faltante.", 20, C.text, 700),
    t(418, 914, "02 / VERIFICAR", 13, C.amber, 700, 2), t(418, 953, "Comprueba autoridad", 20, C.text, 700), t(418, 980, "+ fecha.", 20, C.text, 700),
    t(740, 914, "03 / MANTENER", 13, C.rose, 700, 2), t(740, 967, "Mantén el gate abierto.", 20, C.text, 700),
    dialogue(708, 625, 300, 112, C.cyan, "NOVA", ["La decisión responsable", "también puede ser esperar."], 920, 320, "left", 17),
    t(72, 1262, "ELEGIBLE PARA AVANZAR: NO · 0 GATES SATISFECHOS · APROBACIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.2)
  ].join("")
}, [{ width: 300, height: 390, left: 708, top: 205, position: "right", opacity: 0.3 }]);

await render(7, "LA PREGUNTA FINAL", {
  background: [
    rect(72, 980, 936, 132, "#102127", C.teal, 2)
  ].join(""),
  copy: [
    t(72, 338, "El siguiente", 64, C.text, 700, -2),
    t(72, 410, "documento es", 64, C.text, 700, -2),
    t(72, 482, "el producto.", 64, C.text, 700, -2),
    t(72, 545, "Una señal fuerte termina con una pregunta.", 22, C.muted),
    dialogue(72, 600, 500, 112, C.cyan, "NOVA", ["¿Qué documento", "cambiaría tu decisión?"], 930, 400, "right", 20),
    dialogue(72, 742, 500, 112, C.amber, "BROOM", ["Tráenos la prueba,", "no sólo el titular."], 720, 690, "right", 20),
    t(102, 1030, "LLAMADA A LA ACCIÓN", 13, C.cyan, 700, 2),
    t(102, 1072, "¿Tienes un sitio, proyecto o decisión?", 25, C.text, 700),
    t(102, 1105, "Tráenos el límite de evidencia.", 25, C.text, 700),
    t(72, 1262, "SAGAR LABS · EVIDENCIA ANTES DE PREPARACIÓN · APROBACIÓN HUMANA OBLIGATORIA", 14, C.dim, 400, 1.2)
  ].join("")
}, [{ width: 410, height: 620, left: 598, top: 235, position: "attention" }]);

console.log(`Rendered 7 character-led slides to ${outDir}`);
