import {
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  forwardRef,
} from "react";
import { safeString } from "@/lib/safeReactText";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

/** Prevents Event/objects from reaching controlled input value (avoids "[object Event]" crashes). */
function safeInputValue(v: unknown): string | number | readonly string[] | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v === "number") return v;
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return v;
  return safeString(v);
}

function safeSelectValue(
  v: unknown,
  multiple: boolean
): string | number | readonly string[] | undefined {
  if (v === undefined || v === null) return undefined;
  if (multiple) {
    if (Array.isArray(v)) return v;
    return [];
  }
  if (typeof v === "string") return v;
  if (typeof v === "number") return v;
  return safeString(v);
}

/** Bootstrap 5–style field wrapper (`mb-3`). */
export function BsFormGroup({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mb-3", className)}>{children}</div>;
}

/** Bootstrap 5 `form-label`. */
export function BsFormLabel({
  className,
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className={cn("form-label", className)}>
      {children}
    </label>
  );
}

/** Bootstrap 5 `form-control` text input. */
export const BsFormControl = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function BsFormControl({ className, type = "text", value, onChange, ...props }, ref) {
    const safeValue = safeInputValue(value);
    return (
      <input
        ref={ref}
        type={type}
        {...props}
        {...(safeValue === undefined ? {} : { value: safeValue })}
        onChange={onChange}
        className={cn("form-control", className)}
      />
    );
  }
);

type BsFormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /** Underline style (no boxed border); uses `form-select-line` instead of `form-select`. */
  line?: boolean;
};

/** Bootstrap 5 `form-select`. */
export const BsFormSelect = forwardRef<HTMLSelectElement, BsFormSelectProps>(function BsFormSelect(
  { className, children, line, value, multiple, onChange, ...props },
  ref
) {
  const safeValue = safeSelectValue(value, Boolean(multiple));
  return (
    <select
      ref={ref}
      {...props}
      {...(safeValue === undefined ? {} : { value: safeValue })}
      multiple={multiple}
      onChange={onChange}
      className={cn(line ? "form-select-line" : "form-select", className)}
    >
      {children}
    </select>
  );
});

/** Bootstrap 5 checkbox row (`form-check`). */
export function BsFormCheck({
  id,
  checked,
  onChange,
  label,
  className,
  labelClassName,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  const safeChecked = typeof checked === "boolean" ? checked : false;
  return (
    <div className={cn("form-check", className)}>
      <input
        id={id}
        type="checkbox"
        checked={safeChecked}
        onChange={(e) => {
          const el = e.currentTarget;
          if (el instanceof HTMLInputElement && el.type === "checkbox") {
            onChange(el.checked);
          }
        }}
        className="form-check-input"
      />
      <label htmlFor={id} className={cn("form-check-label", labelClassName)}>
        {label}
      </label>
    </div>
  );
}
