"use client";

import { useActionState } from "react";
import { SaveButton, StatusMessage } from "./FormControls";
import { idleState, type ActionState } from "./actions/state";

interface AdminFormProps {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  children: React.ReactNode;
  submitLabel?: string;
  encType?: string;
}

/** Sunucu action'ını useActionState ile saran ortak form kabuğu. */
export function AdminForm({ action, children, submitLabel, encType }: AdminFormProps) {
  const [state, formAction] = useActionState(action, idleState);

  return (
    <form action={formAction} encType={encType} className="space-y-5">
      {children}
      <StatusMessage state={state} />
      <div className="pt-1">
        <SaveButton label={submitLabel} />
      </div>
    </form>
  );
}
