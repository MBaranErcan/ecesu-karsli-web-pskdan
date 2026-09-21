"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { adminCopy } from "./copy";

export function SaveButton({ label = adminCopy.save }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? adminCopy.saving : label}
    </Button>
  );
}

export function DangerButton({ label = adminCopy.delete }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(adminCopy.deleteConfirm)) event.preventDefault();
      }}
      className="rounded-full px-3.5 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
    >
      {label}
    </button>
  );
}

export function StatusMessage({ state }: { state: { status?: string; message?: string } }) {
  if (!state.status || state.status === "idle") return null;
  const isError = state.status === "error";
  return (
    <p
      role="status"
      className={
        isError
          ? "rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
          : "rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
      }
    >
      {state.message ?? (isError ? adminCopy.error : adminCopy.saved)}
    </p>
  );
}
