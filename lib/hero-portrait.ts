import fs from "node:fs";
import path from "node:path";

const PORTRAIT_BASENAME = "joanna-kierul-cieslak1";
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

function resolveHeroPortraitSrc(): string {
  const directory = path.join(process.cwd(), "public", "images");

  for (const extension of EXTENSIONS) {
    const filename = `${PORTRAIT_BASENAME}${extension}`;

    if (fs.existsSync(path.join(directory, filename))) {
      return `/images/${filename}`;
    }
  }

  throw new Error(
    `Portrait not found: public/images/${PORTRAIT_BASENAME}.{jpg,jpeg,png,webp}`,
  );
}

export const heroPortraitSrc = resolveHeroPortraitSrc();
