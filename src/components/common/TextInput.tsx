export default function TextInput({
  value,
  onChange,
  placeholder,
  type,
  name,
  disabled,
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      className="rounded-md border border-base-200 p-2 focus:outline-none dark:border-base-400 dark:bg-base-600 dark:text-base-200"
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
