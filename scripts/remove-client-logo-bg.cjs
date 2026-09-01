/**
 * One-off asset script: make the white background of each UAE client logo
 * transparent so the logos no longer sit inside visible white boxes.
 *
 * Originals are backed up to public/images/clients-white-bg-backup/ first.
 * Near-white pixels (all channels high, low saturation) are made transparent
 * with a soft feather to avoid hard halos on anti-aliased edges.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "..", "public", "images", "clients");
const BACKUP = path.join(__dirname, "..", "public", "images", "clients-white-bg-backup");

const HARD = 250; // >= this on all channels + low sat => fully transparent
const SOFT = 232; // <= this => fully opaque; between => feather
const MAX_SAT = 18; // max (maxChannel - minChannel) to count as "grey/white"

fs.mkdirSync(BACKUP, { recursive: true });

async function run() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".webp"));
  let changed = 0;
  for (const file of files) {
    const src = path.join(DIR, file);
    const bak = path.join(BACKUP, file);
    if (!fs.existsSync(bak)) fs.copyFileSync(src, bak);

    const img = sharp(bak).ensureAlpha();
    const { data, info } = await img
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max - min;
      if (sat > MAX_SAT) continue; // coloured pixel — keep
      if (min >= HARD) {
        data[i + 3] = 0;
      } else if (min > SOFT) {
        const t = (min - SOFT) / (HARD - SOFT); // 0..1
        data[i + 3] = Math.round(data[i + 3] * (1 - t));
      }
    }

    await sharp(data, { raw: { width, height, channels } })
      .webp({ quality: 90 })
      .toFile(src + ".tmp");
    fs.renameSync(src + ".tmp", src);
    changed++;
  }
  console.log(`Processed ${changed} logos. Backups in clients-white-bg-backup/`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
