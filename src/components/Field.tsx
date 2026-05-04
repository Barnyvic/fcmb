import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

type BaseFieldProps = {
  icon: ReactNode;
  label: string;
  error?: string;
};

type InputFieldProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;

type SelectFieldProps = BaseFieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { label: string; value: string }[];
  };

export function InputField({ icon, label, error, id, ...props }: InputFieldProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(' ', '-');

  return (
    <label className="field" htmlFor={inputId}>
      <span className="field__control">
        <span className="field__icon">{icon}</span>
        <input id={inputId} aria-invalid={Boolean(error)} placeholder={label} {...props} />
      </span>
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}

export function SelectField({ icon, label, error, options, id, ...props }: SelectFieldProps) {
  const selectId = id ?? label.toLowerCase().replaceAll(' ', '-');

  return (
    <label className="field" htmlFor={selectId}>
      <span className="field__control">
        <span className="field__icon">{icon}</span>
        <select id={selectId} aria-invalid={Boolean(error)} {...props}>
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden size={18} className="field__chevron" />
      </span>
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
