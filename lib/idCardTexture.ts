import * as THREE from "three";

const FRONT_UV = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

const ACCENT = "#ff2d78";
const INK = "#0a0a0a";
const MUTED = "#8a8a8a";
const WHITE = "#ffffff";
const PAPER = "#f7f7f7";

function drawBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const bars = 28;
  const gap = w / bars;
  for (let i = 0; i < bars; i++) {
    const bw = i % 3 === 0 ? gap * 0.7 : gap * 0.35;
    ctx.fillStyle = INK;
    ctx.fillRect(x + i * gap, y, bw, h);
  }
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number,
  lineW: number
) {
  ctx.strokeStyle = ACCENT;
  ctx.lineWidth = lineW;
  ctx.lineCap = "square";

  ctx.beginPath();
  ctx.moveTo(x, y + len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + w - len, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y + h - len);
  ctx.stroke();
}

function drawPhotoCover(
  ctx: CanvasRenderingContext2D,
  photo: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const scale = Math.max(w / photo.width, h / photo.height);
  const dw = photo.width * scale;
  const dh = photo.height * scale;
  ctx.drawImage(photo, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function drawFrontFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  photo: HTMLImageElement | null
) {
  const pad = w * 0.07;
  const headerH = h * 0.155;

  ctx.fillStyle = PAPER;
  ctx.fillRect(x, y, w, h);

  // Header bar
  ctx.fillStyle = INK;
  ctx.fillRect(x + pad, y + pad, w - pad * 2, headerH);

  ctx.fillStyle = WHITE;
  ctx.font = `700 ${Math.round(headerH * 0.34)}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("SHRE LAB", x + pad * 1.5, y + pad + headerH * 0.38);

  ctx.font = `400 ${Math.round(headerH * 0.2)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText(
    "ACCESS PASS / ALL AREAS",
    x + pad * 1.5,
    y + pad + headerH * 0.72
  );

  ctx.beginPath();
  ctx.arc(
    x + w - pad * 1.8,
    y + pad + headerH * 0.5,
    headerH * 0.1,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = ACCENT;
  ctx.fill();

  // Photo — full inner width, reference proportions
  const photoW = w - pad * 2;
  const photoH = h * 0.36;
  const photoX = x + pad;
  const photoY = y + pad + headerH + h * 0.045;

  ctx.fillStyle = "#dcdcdc";
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (photo && photo.width > 1) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    ctx.filter = "grayscale(100%) contrast(1.08)";
    drawPhotoCover(ctx, photo, photoX, photoY, photoW, photoH);
    ctx.filter = "none";
    ctx.restore();
  }

  drawCornerBrackets(
    ctx,
    photoX - w * 0.018,
    photoY - h * 0.01,
    photoW + w * 0.036,
    photoH + h * 0.02,
    w * 0.052,
    Math.max(2.5, w * 0.0065)
  );

  const nameY = photoY + photoH + h * 0.072;
  const nameSize = Math.round(w * 0.088);
  ctx.fillStyle = INK;
  ctx.font = `700 ${nameSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("SHREYA", x + w / 2, nameY);

  ctx.font = `500 ${Math.round(w * 0.037)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = INK;
  ctx.fillText("DEVELOPER · DESIGNER", x + w / 2, nameY + h * 0.056);

  ctx.font = `400 ${Math.round(w * 0.031)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = MUTED;
  ctx.fillText("HYDERABAD", x + w / 2, nameY + h * 0.092);

  const divY = nameY + h * 0.125;
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + pad, divY);
  ctx.lineTo(x + w - pad, divY);
  ctx.stroke();

  const footY = divY + h * 0.048;
  const labelSize = Math.round(w * 0.027);

  ctx.font = `400 ${labelSize}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "left";
  ctx.fillText("ID", x + pad, footY);

  ctx.textAlign = "right";
  ctx.fillText("STATUS", x + w - pad, footY);

  ctx.font = `600 ${Math.round(w * 0.037)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = INK;
  ctx.textAlign = "left";
  ctx.fillText("SR-2026-SL", x + pad, footY + h * 0.04);

  ctx.fillStyle = ACCENT;
  ctx.textAlign = "right";
  ctx.fillText("AVAILABLE", x + w - pad, footY + h * 0.04);

  drawBarcode(ctx, x + pad, y + h - pad - h * 0.052, w * 0.3, h * 0.036);

  ctx.font = `400 ${Math.round(w * 0.025)}px system-ui, -apple-system, sans-serif`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "right";
  ctx.fillText("PORTFOLIO 26", x + w - pad, y + h - pad - h * 0.008);
}

function drawBackFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.fillStyle = INK;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = WHITE;
  ctx.font = `700 ${Math.round(w * 0.1)}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("don't", x + w / 2, y + h * 0.43);
  ctx.fillText("look", x + w / 2, y + h * 0.54);
}

export function buildShreLabCardMap(
  baseMap: THREE.Texture,
  photo: HTMLImageElement | null
): THREE.CanvasTexture {
  const baseImg = baseMap.image as HTMLImageElement;
  const W = baseImg.width || 1024;
  const H = baseImg.height || 1024;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return baseMap as THREE.CanvasTexture;

  ctx.drawImage(baseImg, 0, 0, W, H);

  const front = {
    x: FRONT_UV.x * W,
    y: FRONT_UV.y * H,
    w: FRONT_UV.w * W,
    h: FRONT_UV.h * H,
  };
  const back = {
    x: BACK_UV.x * W,
    y: BACK_UV.y * H,
    w: BACK_UV.w * W,
    h: BACK_UV.h * H,
  };

  drawFrontFace(ctx, front.x, front.y, front.w, front.h, photo);
  drawBackFace(ctx, back.x, back.y, back.w, back.h);

  const composite = new THREE.CanvasTexture(canvas);
  composite.colorSpace = THREE.SRGBColorSpace;
  composite.flipY = baseMap.flipY;
  composite.anisotropy = 16;
  composite.needsUpdate = true;
  return composite;
}

export const buildDevLabCardMap = buildShreLabCardMap;
