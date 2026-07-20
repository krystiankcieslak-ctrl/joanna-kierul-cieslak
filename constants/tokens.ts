/** Design tokens — single source of truth for JS/TS usage. CSS mirrors these in globals.css. */

export const colors = {
  primary: "#183153",
  background: "#FAFAF8",
  accent: "#C8A96A",
  text: "#111827",
  muted: "#6B7280",
} as const;

export const radius = "16px";

export const containerMaxWidth = "1280px";

export const spacing = {
  section: {
    default: "py-16 md:py-24 lg:py-32",
    compact: "py-12 md:py-16",
  },
  card: "2rem",
} as const;

export const shadow = {
  card: "0 4px 24px rgba(24, 49, 83, 0.08)",
  cardHover: "0 8px 32px rgba(24, 49, 83, 0.12)",
} as const;
