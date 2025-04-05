import { ArrowRight, PencilSimple } from "phosphor-react";
import { PropsButton } from "../../types/PropsButton";

export default function Button({
  className,
  name,
  icon,
  onClick,
  type,
}: PropsButton) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`w-full font-semibold sm:w-auto flex items-center justify-center gap-2 bg-primary-color hover:bg-primary-color-hover transition-colors duration-150 ease-linear text-color-font font-inter py-3 px-12 rounded-lg cursor-pointer ${className}`}
    >
      {name}
      {icon === "register" || icon === "login" ? (
        <ArrowRight />
      ) : icon === "edit" ? (
        <PencilSimple />
      ) : (
        ""
      )}{" "}
    </button>
  );
}
