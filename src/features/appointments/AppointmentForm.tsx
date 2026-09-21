"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  FieldError,
  FieldHint,
  Input,
  Label,
  RadioCard,
  Select,
  Textarea,
} from "@/components/ui/Field";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { submitAppointment } from "./actions";
import { initialAppointmentState } from "./state";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { APPOINTMENT_REASONS, MEETING_PREFERENCES } from "./schema";

interface AppointmentFormProps {
  locale: Locale;
  dict: Dictionary;
  kvkkHref: string;
  homeHref: string;
}

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function AppointmentForm({ locale, dict, kvkkHref, homeHref }: AppointmentFormProps) {
  const [state, formAction] = useActionState(submitAppointment, initialAppointmentState);
  const [started, setStarted] = useState(false);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const copy = dict.appointment;

  // Formun açılma anını gizli alana yazar; sunucudaki bot kontrolü formun
  // insan hızında doldurulup doldurulmadığını buradan anlar.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      trackEvent(ANALYTICS_EVENTS.formSubmitted);
    }
  }, [state.status]);

  // Yalnızca "form doldurulmaya başlandı" bilgisi gönderilir; alan içerikleri asla.
  const handleFirstInput = () => {
    if (started) return;
    setStarted(true);
    trackEvent(ANALYTICS_EVENTS.formStart);
  };

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-3xl border border-ice-200 bg-ice-50 p-8 text-center sm:p-12"
      >
        <p aria-hidden="true" className="text-3xl">
          ✓
        </p>
        <h2 className="mt-4 font-serif text-2xl text-ink-900">{copy.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-[1rem] leading-relaxed text-ink-600">
          {copy.successBody}
        </p>
        <div className="mt-7">
          <ButtonLink href={homeHref} variant="secondary">
            {copy.successCta}
          </ButtonLink>
        </div>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} noValidate onInput={handleFirstInput} className="space-y-7">
      <input type="hidden" name="locale" value={locale} />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />

      {/* Bot koruması: gerçek kullanıcılara görünmez, ekran okuyuculardan gizli */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-800">{copy.errorTitle}</p>
          <p className="mt-1 text-sm text-red-700">{state.message}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">{copy.fullName}</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="mt-2"
          />
          <FieldError id="fullName-error">{errors.fullName}</FieldError>
        </div>

        <div>
          <Label htmlFor="age">{copy.age}</Label>
          <Input
            id="age"
            name="age"
            type="number"
            inputMode="numeric"
            min={12}
            max={110}
            required
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? "age-error" : undefined}
            className="mt-2"
          />
          <FieldError id="age-error">{errors.age}</FieldError>
        </div>

        <div>
          <Label htmlFor="phone">{copy.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="mt-2"
          />
          <FieldError id="phone-error">{errors.phone}</FieldError>
        </div>

        <div>
          <Label htmlFor="email">{copy.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-2"
          />
          <FieldError id="email-error">{errors.email}</FieldError>
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-ink-800">{copy.preference}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {MEETING_PREFERENCES.map((value) => (
            <RadioCard
              key={value}
              name="meetingPreference"
              value={value}
              label={copy.preferenceOptions[value]}
            />
          ))}
        </div>
        <FieldError id="meetingPreference-error">{errors.meetingPreference}</FieldError>
      </fieldset>

      <div>
        <Label htmlFor="reason">{copy.reason}</Label>
        <Select
          id="reason"
          name="reason"
          defaultValue=""
          required
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? "reason-error" : undefined}
          className="mt-2"
        >
          <option value="" disabled>
            —
          </option>
          {APPOINTMENT_REASONS.map((value) => (
            <option key={value} value={value}>
              {copy.reasonOptions[value]}
            </option>
          ))}
        </Select>
        <FieldError id="reason-error">{errors.reason}</FieldError>
      </div>

      <div>
        <Label htmlFor="message" hint={dict.common.optional}>
          {copy.message}
        </Label>
        <Textarea
          id="message"
          name="message"
          maxLength={1500}
          aria-describedby="message-hint"
          className="mt-2"
        />
        <FieldHint id="message-hint">{copy.messageHint}</FieldHint>
        <FieldError id="message-error">{errors.message}</FieldError>
      </div>

      <div className="rounded-2xl bg-ink-50 p-5">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink-700">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-ice-700)]"
          />
          <span>
            {copy.consent}{" "}
            <Link href={kvkkHref} className="text-ice-700 underline underline-offset-4">
              {copy.consentLinkText}
            </Link>
          </span>
        </label>
        <FieldError id="consent-error">{errors.consent}</FieldError>
        <p className="mt-4 text-xs leading-relaxed text-ink-500">{copy.privacyNote}</p>
      </div>

      <SubmitButton label={copy.submit} pendingLabel={copy.submitting} />
    </form>
  );
}
