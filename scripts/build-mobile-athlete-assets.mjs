import { mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const sourceDir = resolve(root, "assets/awakening");
const outputDir = resolve(sourceDir, "mobile");
const output = { width: 780, height: 658 };
const crops = {
  general: { top: 450, height: 1700 },
  soccer: { top: 600, height: 1550 },
  basketball: { top: 650, height: 1500 },
  pickleball: { top: 600, height: 1550 },
  tennis: { top: 600, height: 1550 },
  volleyball: { top: 600, height: 1550 },
};

await mkdir(outputDir, { recursive: true });

for (const [sport, crop] of Object.entries(crops)) {
  const source = resolve(sourceDir, `${sport}.webp`);
  const destination = resolve(outputDir, `${sport}.webp`);
  const background = await sharp(source)
    .resize(output.width, output.height, { fit: "cover", position: "centre" })
    .blur(22)
    .modulate({ brightness: 0.48, saturation: 0.82 })
    .toBuffer();
  const foreground = await sharp(source)
    .extract({ left: 0, top: crop.top, width: 1200, height: crop.height })
    .resize(output.width, output.height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(background)
    .composite([{ input: foreground, gravity: "centre" }])
    .webp({ quality: 84, smartSubsample: true })
    .toFile(destination);

  const size = (await stat(destination)).size;
  console.log(`${sport}: ${output.width}×${output.height}, ${Math.round(size / 1024)} KB`);
}
