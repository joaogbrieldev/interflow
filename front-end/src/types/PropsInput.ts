import { Ref } from "react";

export interface PropsInput {
  id?: string;
  placeholder: string;
  requiredInput?: boolean;
  type: "text" | "e-mail" | "date" | "password" | "number" | "tel";
  value?: string;
  className?: string;
  ref?: Ref<HTMLInputElement> | undefined;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
