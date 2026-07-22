import fs from "node:fs";
import path from "node:path";

const CERTIFICATES_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "images",
  "certificates",
);

const SUPPORTED_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png"]);

export type CertificateImage = {
  src: string;
  filename: string;
  order: number;
};

function parseNumericOrder(filename: string): number {
  const basename = path.parse(filename).name;
  const numeric = Number.parseInt(basename, 10);

  return Number.isNaN(numeric) ? Number.MAX_SAFE_INTEGER : numeric;
}

function getCertificateImages(): CertificateImage[] {
  if (!fs.existsSync(CERTIFICATES_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(CERTIFICATES_DIRECTORY)
    .filter((filename) =>
      SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase()),
    )
    .map((filename) => ({
      filename,
      src: `/images/certificates/${filename}`,
      order: parseNumericOrder(filename),
    }))
    .sort(
      (left, right) =>
        left.order - right.order || left.filename.localeCompare(right.filename),
    );
}

/** Resolved at build time — new files in public/images/certificates appear automatically. */
export const certificateImages = getCertificateImages();

export { getCertificateImages };
