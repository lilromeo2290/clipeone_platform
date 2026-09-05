#!/usr/bin/env node
/** Compress website logos to WebP at 200px wide. */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "public", "clipeone", "websites");

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  console.log(`Compressing website logos in: ${DIR}\n`);
  const files = fs.readdirSync(DIR).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const filePath = path.join(DIR, file);
    const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    const srcSize = fs.statSync(filePath).size;
    try {
      await sharp(filePath).resize({ width: 200, withoutEnlargement: true }).webp({ quality: 85, effort: 4 }).toFile(outPath);
      const outSize = fs.statSync(outPath).size;
      const savings = ((1 - outSize / srcSize) * 100).toFixed(1);
      console.log(`  ${file} → ${path.basename(outPath)}: ${fmt(srcSize)} → ${fmt(outSize)} (${savings}% smaller)`);
    } catch (err) {
      console.log(`  ✗ error on ${file}: ${err.message}`);
    }
  }
}
main().catch(console.error);
