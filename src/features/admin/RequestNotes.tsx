"use client";

import { useActionState } from "react";
import { Textarea } from "@/components/ui/Field";
import { SaveButton, StatusMessage } from "./FormControls";
import { idleState } from "./actions/state";
import { saveRequestNote } from "./actions/content";

export function RequestNotes({ id, defaultValue }: { id: string; defaultValue: string | null }) {
  const [state, formAction] = useActionState(saveRequestNote, idleState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`notes-${id}`} className="block text-sm text-ink-600">
        Yönetici notu
      </label>
      <Textarea
        id={`notes-${id}`}
        name="admin_notes"
        rows={3}
        defaultValue={defaultValue ?? ""}
        className="text-sm"
      />
      <StatusMessage state={state} />
      <SaveButton label="Notu kaydet" />
    </form>
  );
}
