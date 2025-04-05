import { PropsInput } from "../../types/PropsInput";

export default function Input({
  id,
  placeholder,
  requiredInput = true,
  type,
  value,
  className,
  ref,
  defaultValue,
  onChange,
}: PropsInput) {
  return (
    <input
      onChange={onChange}
      defaultValue={defaultValue}
      ref={ref}
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      required={requiredInput}
      className={`p-4 bg-bg-input placeholder-place-color rounded-lg text-zinc-200 outline-none my-2 w-full ${className}`}
    />
  );
}
