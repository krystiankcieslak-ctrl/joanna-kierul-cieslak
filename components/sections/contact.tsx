"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { MotionReveal } from "@/components/motion-reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import {
  bodyText,
  cardSurface,
  iconSize,
  iconWrap,
  twoColumnGrid,
} from "@/constants/layout";
import {
  contactDetails,
  contactForm,
  contactHeading,
  contactHighlight,
  contactIntro,
  contactSubtitle,
} from "@/constants/contact";
import { siteConfig } from "@/constants/site";
import {
  CONTACT_PREFILL_EVENT,
  type ContactPrefillDetail,
} from "@/lib/contact-prefill";
import { cardInteractiveClass, formFieldClass } from "@/lib/motion";
import { cn } from "@/lib/utils";

const contactIcons: Record<(typeof contactDetails)[number]["id"], LucideIcon> =
  {
    phone: Phone,
    email: Mail,
    location: MapPin,
    response: Clock,
  };

const fieldClassName = cn(
  "flex w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none",
  "placeholder:text-muted-foreground/70 hover:border-primary/25",
  "aria-invalid:border-destructive/60 aria-invalid:focus-visible:shadow-[0_2px_12px_rgba(220,38,38,0.12)]",
  formFieldClass,
);

const inputClassName = cn(fieldClassName, "h-11");

type FieldName = keyof typeof contactForm.errors;
type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "submitting" | "success" | "mailto" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  const get = (key: string) => String(data.get(key) ?? "").trim();

  if (!get("name")) errors.name = contactForm.errors.name;
  if (!EMAIL_PATTERN.test(get("email"))) errors.email = contactForm.errors.email;
  if (!get("subject")) errors.subject = contactForm.errors.subject;
  if (get("message").length < 3) errors.message = contactForm.errors.message;
  if (!data.get("consent")) errors.consent = contactForm.errors.consent;

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="flex items-center gap-1.5 text-sm text-destructive">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

const emailDetail = contactDetails.find((item) => item.id === "email");

function ContactForm() {
  const subjectRef = useRef<HTMLInputElement>(null);
  const prefilledSubject = useRef<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  // „Umów konsultację” przy ofercie → wpisz nazwę oferty w temat (jeśli pole jest puste
  // albo zawiera poprzednio podstawioną nazwę).
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { subject } = (event as CustomEvent<ContactPrefillDetail>).detail;
      const input = subjectRef.current;
      if (!input) return;

      if (!input.value.trim() || input.value === prefilledSubject.current) {
        input.value = subject;
        prefilledSubject.current = subject;
        setErrors((current) => ({ ...current, subject: undefined }));
      }
    };

    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Pułapka na boty — prawdziwy użytkownik nie widzi tego pola.
    if (String(data.get("company") ?? "")) return;

    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload = {
      name: String(data.get("name")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone") ?? "").trim(),
      subject: String(data.get("subject")).trim(),
      message: String(data.get("message")).trim(),
    };

    // Brak skonfigurowanej usługi → gotowa wiadomość w programie pocztowym.
    if (!siteConfig.contactFormEndpoint) {
      if (!emailDetail) return;
      const signature = [payload.name, payload.email, payload.phone]
        .filter(Boolean)
        .join("\n");
      const body = `${payload.message}\n\n—\n${signature}`;
      window.location.href = `mailto:${emailDetail.value}?subject=${encodeURIComponent(
        payload.subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(siteConfig.contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...payload, _subject: payload.subject }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      prefilledSubject.current = null;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const { fields, submitLabel, title, consent, status: statusCopy } =
    contactForm;
  const isSubmitting = status === "submitting";

  if (status === "success" || status === "mailto") {
    const copy =
      status === "success" ? statusCopy.success : statusCopy.mailto;

    return (
      <Card className="items-center gap-4 py-12 text-center" role="status">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 aria-hidden="true" className="size-7" strokeWidth={1.75} />
        </span>
        <p className="font-heading text-xl font-semibold tracking-tight text-primary">
          {copy.title}
        </p>
        <p className={cn("max-w-sm", bodyText, "text-base md:text-base")}>
          {copy.text}
        </p>
        <Button
          type="button"
          variant="secondary"
          size="default"
          onClick={() => setStatus("idle")}
        >
          {statusCopy.success.again}
        </Button>
      </Card>
    );
  }

  const describedBy = (field: FieldName) =>
    errors[field] ? `contact-${field}-error` : undefined;

  return (
    <Card className="gap-5 lg:p-8">
      <CardHeader className="gap-1 p-0">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-label="Formularz kontaktowy"
      >
        {/* honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Firma
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
              {fields.name.label}
            </label>
            <input
              id="contact-name"
              name={fields.name.name}
              type="text"
              autoComplete={fields.name.autoComplete}
              required={fields.name.required}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy("name")}
              className={inputClassName}
            />
            <FieldError id="contact-name-error" message={errors.name} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              {fields.email.label}
            </label>
            <input
              id="contact-email"
              name={fields.email.name}
              type={fields.email.type}
              inputMode="email"
              autoComplete={fields.email.autoComplete}
              required={fields.email.required}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={inputClassName}
            />
            <FieldError id="contact-email-error" message={errors.email} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-phone" className="text-sm font-medium text-foreground">
              {fields.phone.label}
              <span className="font-normal text-muted-foreground"> (opcjonalnie)</span>
            </label>
            <input
              id="contact-phone"
              name={fields.phone.name}
              type={fields.phone.type}
              inputMode="tel"
              autoComplete={fields.phone.autoComplete}
              required={fields.phone.required}
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
              {fields.subject.label}
            </label>
            <input
              ref={subjectRef}
              id="contact-subject"
              name={fields.subject.name}
              type="text"
              autoComplete={fields.subject.autoComplete}
              required={fields.subject.required}
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={describedBy("subject")}
              className={inputClassName}
            />
            <FieldError id="contact-subject-error" message={errors.subject} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            {fields.message.label}
          </label>
          <textarea
            id="contact-message"
            name={fields.message.name}
            required={fields.message.required}
            rows={5}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message")}
            className={cn(fieldClassName, "min-h-[132px] resize-y py-3 leading-relaxed")}
          />
          <FieldError id="contact-message-error" message={errors.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <input
              type="checkbox"
              name="consent"
              value="tak"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={describedBy("consent")}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border-border accent-primary"
            />
            <span>
              {consent.label}{" "}
              <Link
                href={consent.href}
                className="font-medium text-primary underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
              >
                {consent.linkLabel}
              </Link>
              .
            </span>
          </label>
          <FieldError id="contact-consent-error" message={errors.consent} />
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {statusCopy.error}
          </p>
        ) : null}

        <div className="pt-1">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 aria-hidden="true" className="animate-spin" />
                {statusCopy.sending}
              </>
            ) : (
              <>
                {submitLabel}
                <Send aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Contact() {
  const phoneDetail = contactDetails.find((item) => item.id === "phone");

  return (
    <Section
      id="kontakt"
      aria-labelledby="contact-heading"
      spacing="default"
      className="bg-secondary/20"
    >
      <Container>
        <div className={twoColumnGrid}>
          <MotionReveal className="flex flex-col gap-4">
            <Heading id="contact-heading" level="h2" className="max-w-lg">
              {contactHeading}
            </Heading>

            <p className={cn("max-w-lg", bodyText)}>{contactSubtitle}</p>

            <p className="max-w-lg text-base leading-relaxed text-foreground">
              {contactIntro}
            </p>

            <ul className="grid grid-flow-dense grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
              {contactDetails.map((item) => {
                const Icon = contactIcons[item.id];
                const content = (
                  <>
                    <div aria-hidden="true" className={iconWrap}>
                      <Icon className={iconSize} strokeWidth={1.75} />
                    </div>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm leading-snug font-medium text-foreground [overflow-wrap:anywhere]">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                const itemClassName = cn(
                  "flex h-full items-start gap-3 rounded-2xl bg-card p-4 shadow-(--shadow-card)",
                  cardSurface,
                  cardInteractiveClass,
                );

                return (
                  <li
                    key={item.id}
                    className={cn(
                      "h-full",
                      (item.id === "email" || item.id === "response") &&
                        "sm:col-span-2",
                    )}
                  >
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          itemClassName,
                          "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                        )}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={itemClassName}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <Card className="gap-3 border-accent/25 bg-accent/5">
              <p className="font-heading text-lg font-semibold tracking-tight text-primary">
                {contactHighlight.title}
              </p>
              {phoneDetail && "href" in phoneDetail ? (
                <a
                  href={phoneDetail.href}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full sm:w-fit",
                  )}
                >
                  <Phone aria-hidden="true" />
                  {contactHighlight.cta}
                </a>
              ) : null}
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.05}>
            <ContactForm />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}

export { Contact };
