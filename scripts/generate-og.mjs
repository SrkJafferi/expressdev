/**
 * Generates the social-sharing OG image (1200×630 JPEG):
 *   public/images/og/express-advertising-og.jpg
 *
 * Premium navy gradient + subtle wave linework + official logo on a white
 * chip + short brand text. Run: node scripts/generate-og.mjs
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "images", "og", "express-advertising-og.jpg");
const logo = path.join(root, "public", "brand", "express-advertising-logo.webp");

const W = 1200;
const H = 630;

const withText = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#01030f"/>
      <stop offset="0.55" stop-color="#0a1f3c"/>
      <stop offset="1" stop-color="#10305a"/>
    </linearGradient>
    <linearGradient id="wave" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0099da" stop-opacity="0.35"/>
      <stop offset="0.5" stop-color="#ec2790" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#0099da" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M-60 470C300 340 700 560 1100 420S1500 380 1460 270" stroke="url(#wave)" stroke-width="2" fill="none"/>
  <path d="M-60 540C340 420 760 620 1180 480S1520 440 1500 340" stroke="url(#wave)" stroke-width="1.5" fill="none" opacity="0.7"/>
  <path d="M-60 120C320 220 640 80 1040 180S1500 200 1460 110" stroke="url(#wave)" stroke-width="1.5" fill="none" opacity="0.6"/>
  <rect x="240" y="96" width="720" height="286" rx="28" fill="#ffffff"/>
  <text x="600" y="512" text-anchor="middle" font-family="Arial, 'Segoe UI', sans-serif" font-size="54" font-weight="bold" fill="#ffffff" letter-spacing="2">EXPRESS ADVERTISING UAE</text>
  <text x="600" y="568" text-anchor="middle" font-family="Arial, 'Segoe UI', sans-serif" font-size="27" font-weight="bold" fill="#37b6ff" letter-spacing="6">PRINT · SIGNAGE · BRAND PRODUCTION</text>
</svg>`;

const withoutText = withText.replace(
  /<text x="600"[\s\S]*?<\/text>/g,
  "",
);

// Probe: confirm the rasteriser actually drew the text (font availability).
const [a, b] = await Promise.all([
  sharp(Buffer.from(withText)).png().toBuffer(),
  sharp(Buffer.from(withoutText)).png().toBuffer(),
]);
if (Buffer.compare(a, b) === 0) {
  console.error("Text did not rasterise (fontconfig) — aborting to avoid an OG image without text.");
  process.exit(1);
}

// Logo — official asset, unaltered, seated on the white chip.
const logoBuf = await sharp(logo).resize(600).png().toBuffer();
const logoMeta = await sharp(logoBuf).metadata();

const chipX = 240;
const chipY = 96;
const logoX = chipX + Math.round((720 - logoMeta.width) / 2);
const logoY = chipY + Math.round((286 - logoMeta.height) / 2);

await sharp(Buffer.from(withText))
  .composite([{ input: logoBuf, left: logoX, top: logoY }])
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(out);

const meta = await sharp(out).metadata();
const size = (await import("node:fs")).statSync(out).size;
console.log(`OG image written: ${out}`);
console.log(`${meta.width}x${meta.height} · ${(size / 1024).toFixed(1)} KB · ${meta.format}`);
