import {
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  forwardRef,
} from "react";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
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
  function BsFormControl({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} {...props} className={cn("form-control", className)} />;
  }
);

type BsFormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /** Underline style (no boxed border); uses `form-select-line` instead of `form-select`. */
  line?: boolean;
};

/** Bootstrap 5 `form-select`. */
export const BsFormSelect = forwardRef<HTMLSelectElement, BsFormSelectProps>(function BsFormSelect(
  { className, children, line, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      {...props}
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
  return (
    <div className={cn("form-check", className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-check-input"
      />
      <label htmlFor={id} className={cn("form-check-label", labelClassName)}>
        {label}
      </label>
    </div>
  );
}
