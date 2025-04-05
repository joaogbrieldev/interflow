import { PropsSelect } from "../../types/PropsSelect";

export default function Select({
  options,
  label,
  id,
  name,
  value,
  className,
  ref,
  changeSelect
}: PropsSelect) {
  return (
    <select
      onChange={changeSelect}
      ref={ref}
      name={name}
      id={id}
      value={value}
      className={`p-4 border-r-transparent border-r-16 bg-bg-input placeholder-place-color rounded-lg text-zinc-200 outline-none my-2 w-full hover:cursor-pointer ${className}`}
    >
      <option value="" className="text-place-color">
        {label}
      </option>
      {options.map((option) => (
        <option id={option} value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
