import fs from "node:fs";
import path from "node:path";

import type { OfferId } from "@/constants/offer";

const OFFER_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "images",
  "oferta",
);

const SUPPORTED_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"] as const;

/** Numeric filenames map to offer blocks in constants/offer.ts order. */
const OFFER_ORDER: readonly OfferId[] = [
  "uczniowie",
  "nauczyciele",
  "cudzoziemcy",
  "autorzy",
  "instytucje",
];

export type OfferImage = {
  id: OfferId;
  src: string;
  objectPosition: string;
};

const OBJECT_POSITIONS: Record<number, string> = {
  1: "center 42%",
  2: "center 20%",
  3: "center 38%",
  4: "center 32%",
  5: "center 28%",
};

/** Override file number per card — default follows OFFER_ORDER index (1–5). */
const OFFER_FILE_BY_ID: Partial<Record<OfferId, number>> = {
  autorzy: 6,
};

function resolveOfferImageSrc(order: number): string | null {
  for (const extension of SUPPORTED_EXTENSIONS) {
    const filename = `${order}${extension}`;
    const filepath = path.join(OFFER_DIRECTORY, filename);

    if (fs.existsSync(filepath)) {
      return `/images/oferta/${filename}`;
    }
  }

  return null;
}

function getOfferImagesById(): Partial<Record<OfferId, OfferImage>> {
  const images: Partial<Record<OfferId, OfferImage>> = {};

  OFFER_ORDER.forEach((id, index) => {
    const fileNumber = OFFER_FILE_BY_ID[id] ?? index + 1;
    const src = resolveOfferImageSrc(fileNumber);

    if (!src) {
      return;
    }

    images[id] = {
      id,
      src,
      objectPosition: OBJECT_POSITIONS[index + 1] ?? "center center",
    };
  });

  return images;
}

export { getOfferImagesById };
