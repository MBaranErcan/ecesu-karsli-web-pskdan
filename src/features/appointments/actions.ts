"use server";

import { headers } from "next/headers";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { appointmentSchema } from "./schema";
import type { AppointmentFormState } from "./state";

/** Ters proxy arkasındaki gerçek istemci adresini bulmaya çalışır. */
async function clientKey(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  return `appointment:${ip}`;
}

export async function submitAppointment(
  _prevState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const rawLocale = String(formData.get("locale") ?? "");
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const copy = dict.appointment;

  // Bot koruması 1: gizli alan (honeypot) doldurulmuş olmamalı.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  // Bot koruması 2: form insan hızında doldurulmuş olmalı.
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < 2500) {
    return { status: "error", message: copy.genericError };
  }

  const limited = rateLimit(await clientKey(), 5, 10 * 60 * 1000);
  if (!limited.success) {
    return { status: "error", message: copy.rateLimited };
  }

  const parsed = appointmentSchema(copy.validation).safeParse({
    fullName: formData.get("fullName"),
    age: formData.get("age"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    meetingPreference: formData.get("meetingPreference"),
    reason: formData.get("reason"),
    message: formData.get("message") ?? "",
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return { status: "error", message: copy.notConfigured };
  }

  const value = parsed.data;

  // Aynı e-posta ile kısa aralıkla tekrar gönderimi engelle.
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("appointment_requests")
    .select("id", { count: "exact", head: true })
    .eq("email", value.email)
    .gte("created_at", since);

  if ((count ?? 0) >= 2) {
    return { status: "error", message: copy.rateLimited };
  }

  const { error } = await supabase.from("appointment_requests").insert({
    full_name: value.fullName,
    age: value.age,
    phone: value.phone,
    email: value.email,
    meeting_preference: value.meetingPreference,
    reason: value.reason,
    message: value.message ? value.message : null,
    consent: true,
    locale,
    status: "yeni",
  });

  if (error) {
    return { status: "error", message: copy.genericError };
  }

  return { status: "success" };
}
