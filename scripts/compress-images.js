#!/usr/bin/env node
/**
 * Compress large images to optimized WebP.
 * Skips files smaller than 200 KB.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "clipeone");

const TARGETS = [
  { dir: "", files: ["hero-image.png", "hero-monitor.png", "hero-screenshot.png", "hero-dashboard.png", "hero-cc.png"], maxWidth: 1920 },
  { dir: "apps", files: ["RMS.png", "Acount.png", "CRM.png", "school.png"], maxWidth: 800 },
  { dir: "", files: ["clipe-consult-logo.png"], maxWidth: 800 },
  { dir: "", files: ["logo.png"], maxWidth: 200 },
  { dir: "", files: ["platform-2.png"], maxWidth: 800 },
];

const SKIP_IF_UNDER_KB = 200;

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function compressOne(filePath, maxWidth) {
  const ext = path.extname(filePath).toLowerCase();
  const outPath = filePath.replace(new RegExp(`${ext}$`), ".webp");
  const srcSize = fs.statSync(filePath).size;
  if (srcSize < SKIP_IF_UNDER_KB * 1024) {
    console.log(`  ✓ skip (already small): ${path.basename(filePath)} (${fmt(srcSize)})`);
    return;
  }
  const meta = await sharp(filePath).metadata();
  const width = Math.min(meta.width, maxWidth);
  await sharp(filePath).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(outPath);
  const outSize = fs.statSync(outPath).size;
  const savings = ((1 - outSize / srcSize) * 100).toFixed(1);
  console.log(`  ${path.basename(filePath)} → ${path.basename(outPath)}: ${fmt(srcSize)} → ${fmt(outSize)} (${savings}% smaller)`);
}

async function main() {
  console.log(`Compressing images in: ${ROOT}\n`);
  for (const target of TARGETS) {
    const dir = path.join(ROOT, target.dir);
    console.log(`=== ${target.dir || "(root)"} — max width ${target.maxWidth}px ===`);
    for (const file of target.files) {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) { console.log(`  ✗ not found: ${file}`); continue; }
      try { await compressOne(filePath, target.maxWidth); } catch (err) { console.log(`  ✗ error on ${file}: ${err.message}`); }
    }
    console.log();
  }
}
main().catch(console.error);
