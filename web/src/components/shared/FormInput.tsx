type FormInputType = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}: FormInputType) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
