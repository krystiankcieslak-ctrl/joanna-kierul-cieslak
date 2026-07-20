"use client";

import {
  Clock,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { FormEvent } from "react";

import { MotionReveal } from "@/components/sections/about-values";
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
import { cn } from "@/lib/utils";

const contactIcons: Record<(typeof contactDetails)[number]["id"], LucideIcon> =
  {
    phone: Phone,
    email: Mail,
    location: MapPin,
    response: Clock,
  };

const fieldClassName = cn(
  "flex w-full rounded-xl border border-border/40 bg-background px-4 text-base text-foreground outline-none transition-colors duration-200",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
);

const inputClassName = cn(fieldClassName, "h-11");

function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Backend integration point — form data available via new FormData(event.currentTarget)
  }

  const { fields, submitLabel, title } = contactForm;

  return (
    <Card className="gap-5" whileHover={{ y: 0 }}>
      <CardHeader className="gap-1 p-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        aria-label="Formularz kontaktowy"
      >
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
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
              {fields.email.label}
            </label>
            <input
              id="contact-email"
              name={fields.email.name}
              type={fields.email.type}
              autoComplete={fields.email.autoComplete}
              required={fields.email.required}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className="text-sm font-medium text-foreground">
            {fields.phone.label}
            <span className="font-normal text-muted-foreground"> (opcjonalnie)</span>
          </label>
          <input
            id="contact-phone"
            name={fields.phone.name}
            type={fields.phone.type}
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
            id="contact-subject"
            name={fields.subject.name}
            type="text"
            autoComplete={fields.subject.autoComplete}
            required={fields.subject.required}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
            {fields.message.label}
          </label>
          <textarea
            id="contact-message"
            name={fields.message.name}
            required={fields.message.required}
            rows={4}
            className={cn(fieldClassName, "min-h-[120px] resize-y py-3 leading-relaxed")}
          />
        </div>

        <div className="pt-1">
          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
            {submitLabel}
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
      className="scroll-mt-24 bg-secondary/20"
    >
      <Container>
        <div className={twoColumnGrid}>
          <MotionReveal className="flex flex-col gap-6">
            <Heading id="contact-heading" level="h2" className="max-w-lg">
              {contactHeading}
            </Heading>

            <p className={cn("max-w-lg", bodyText)}>{contactSubtitle}</p>

            <p className="max-w-lg text-base leading-relaxed text-foreground">
              {contactIntro}
            </p>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
                      <p className="text-sm leading-snug text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                const itemClassName = cn(
                  "flex h-full items-start gap-3 rounded-2xl bg-card p-5 shadow-(--shadow-card)",
                  cardSurface,
                );

                return (
                  <li key={item.id} className="h-full">
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          itemClassName,
                          "outline-none transition-shadow duration-200 hover:shadow-(--shadow-card-hover) focus-visible:ring-3 focus-visible:ring-ring/50",
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

            <Card className="gap-4 border-accent/25 bg-accent/5">
              <p className="font-heading text-lg font-semibold tracking-tight text-primary">
                {contactHighlight.title}
              </p>
              {phoneDetail && "href" in phoneDetail ? (
                <Link
                  href={phoneDetail.href}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "w-full sm:w-fit",
                  )}
                >
                  {contactHighlight.cta}
                </Link>
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
