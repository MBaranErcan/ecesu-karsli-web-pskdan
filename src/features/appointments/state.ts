export interface AppointmentFormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialAppointmentState: AppointmentFormState = { status: "idle" };
