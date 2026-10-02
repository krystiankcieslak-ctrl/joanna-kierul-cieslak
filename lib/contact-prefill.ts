/**
 * Lekka komunikacja „Oferta → Formularz”: kliknięcie „Umów konsultację”
 * przy konkretnej ofercie wpisuje jej nazwę w pole „Temat”.
 */

export const CONTACT_PREFILL_EVENT = "contact:prefill";

export type ContactPrefillDetail = {
  subject: string;
};

export function requestContactPrefill(subject: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<ContactPrefillDetail>(CONTACT_PREFILL_EVENT, {
      detail: { subject },
    }),
  );
}
