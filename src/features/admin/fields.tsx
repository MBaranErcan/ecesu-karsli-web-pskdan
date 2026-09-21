import { FieldHint, Input, Label, Select, Textarea } from "@/components/ui/Field";

interface BaseProps {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
}

export function TextField({
  name,
  label,
  hint,
  required,
  defaultValue,
  type = "text",
  placeholder,
}: BaseProps & { defaultValue?: string | number | null; type?: string; placeholder?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="mt-2"
      />
      {hint ? <FieldHint id={`${name}-hint`}>{hint}</FieldHint> : null}
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  required,
  defaultValue,
  rows = 6,
}: BaseProps & { defaultValue?: string | null; rows?: number }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-describedby={hint ? `${name}-hint` : undefined}
        className="mt-2 font-mono text-[0.9rem]"
      />
      {hint ? <FieldHint id={`${name}-hint`}>{hint}</FieldHint> : null}
    </div>
  );
}

export function SelectField({
  name,
  label,
  hint,
  required,
  defaultValue,
  options,
}: BaseProps & {
  defaultValue?: string | null;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className="mt-2"
      >
        <option value="">—</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {hint ? <FieldHint id={`${name}-hint`}>{hint}</FieldHint> : null}
    </div>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-800">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-0.5 h-4 w-4 accent-[var(--color-ice-700)]"
        />
        <span>{label}</span>
      </label>
      {hint ? <FieldHint id={`${name}-hint`}>{hint}</FieldHint> : null}
    </div>
  );
}
