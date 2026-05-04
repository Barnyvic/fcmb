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
    <label className="grid gap-1.5" htmlFor={inputId}>
      <span className="relative flex min-h-14 items-center rounded-[5px] border border-[#b9bbc1] bg-white">
        <span className="inline-flex shrink-0 basis-12 justify-center text-[#aaaab0]">{icon}</span>
        <input className="h-[54px] min-w-0 flex-1 border-0 bg-transparent text-[#25232a] outline-none placeholder:text-[#aaaab0]" id={inputId} aria-invalid={Boolean(error)} placeholder={label} {...props} />
      </span>
      {error && <span className="pl-1 text-[13px] text-fcmb-red">{error}</span>}
    </label>
  );
}

export function SelectField({ icon, label, error, options, id, ...props }: SelectFieldProps) {
  const selectId = id ?? label.toLowerCase().replaceAll(' ', '-');

  return (
    <label className="grid gap-1.5" htmlFor={selectId}>
      <span className="relative flex min-h-14 items-center rounded-[5px] border border-[#b9bbc1] bg-white">
        <span className="inline-flex shrink-0 basis-12 justify-center text-[#aaaab0]">{icon}</span>
        <select className="h-[54px] min-w-0 flex-1 appearance-none border-0 bg-transparent pr-10 text-[#25232a] outline-none" id={selectId} aria-invalid={Boolean(error)} {...props}>
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden size={18} className="pointer-events-none absolute right-4 text-[#aaaab0]" />
      </span>
      {error && <span className="pl-1 text-[13px] text-fcmb-red">{error}</span>}
    </label>
  );
}
