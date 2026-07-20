"use client";

import { useSyncExternalStore } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(onStoreChange: () => void) {
  const media = window.matchMedia(FINE_POINTER_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

/** True on desktop-like devices; false on touch phones/tablets (SSR default). */
function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    () => false,
  );
}

export { useFinePointer };
