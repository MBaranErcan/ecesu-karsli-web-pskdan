import { z } from "zod";

export const MEETING_PREFERENCES = ["online", "yuz-yuze-ankara", "farketmez"] as const;

export const APPOINTMENT_REASONS = [
  "kaygi",
  "sinav-sureci",
  "aile-ici-iletisim",
  "ozsaygi",
  "anlam-arayisi",
  "ebeveyn-danismanligi",
  "diger",
  "belirtmek-istemiyorum",
] as const;

export const APPOINTMENT_STATUSES = [
  "yeni",
  "iletisime-gecildi",
  "planlandi",
  "kapandi",
] as const;

export type MeetingPreference = (typeof MEETING_PREFERENCES)[number];
export type AppointmentReason = (typeof APPOINTMENT_REASONS)[number];
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface ValidationMessages {
  fullName: string;
  age: string;
  phone: string;
  email: string;
  preference: string;
  reason: string;
  message: string;
  consent: string;
}

/** En az 7 rakam içeren, uluslararası biçime de izin veren telefon kontrolü. */
const phonePattern = /^[+\d][\d\s().-]{6,24}$/;

export function appointmentSchema(messages: ValidationMessages) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(3, messages.fullName)
      .max(120, messages.fullName)
      .refine((value) => value.split(/\s+/).filter(Boolean).length >= 2, messages.fullName),
    age: z
      .string()
      .trim()
      .refine((value) => {
        const parsed = Number(value);
        return Number.isInteger(parsed) && parsed >= 12 && parsed <= 110;
      }, messages.age)
      .transform((value) => Number(value)),
    phone: z
      .string()
      .trim()
      .regex(phonePattern, messages.phone)
      .refine((value) => value.replace(/\D/g, "").length >= 7, messages.phone),
    email: z.string().trim().toLowerCase().email(messages.email).max(160, messages.email),
    meetingPreference: z.enum(MEETING_PREFERENCES, { message: messages.preference }),
    reason: z.enum(APPOINTMENT_REASONS, { message: messages.reason }),
    message: z.string().trim().max(1500, messages.message).optional().or(z.literal("")),
    consent: z.literal("on", { message: messages.consent }),
  });
}

export type AppointmentInput = z.infer<ReturnType<typeof appointmentSchema>>;
