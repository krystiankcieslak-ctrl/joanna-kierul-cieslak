import fs from "node:fs";
import path from "node:path";

const PORTRAIT_BASENAME = "joanna-kierul-cieslak2";
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

function resolveAboutPortraitSrc(): string {
  const directory = path.join(process.cwd(), "public", "images");
  const extensionlessPath = path.join(directory, PORTRAIT_BASENAME);

  if (fs.existsSync(extensionlessPath) && fs.statSync(extensionlessPath).isFile()) {
    return `/images/${PORTRAIT_BASENAME}`;
  }

  for (const extension of EXTENSIONS) {
    const filename = `${PORTRAIT_BASENAME}${extension}`;

    if (fs.existsSync(path.join(directory, filename))) {
      return `/images/${filename}`;
    }
  }

  throw new Error(
    `Portrait not found: public/images/${PORTRAIT_BASENAME} or ${PORTRAIT_BASENAME}.{jpg,jpeg,png,webp}`,
  );
}

export const aboutPortraitSrc = resolveAboutPortraitSrc();

export { resolveAboutPortraitSrc };
