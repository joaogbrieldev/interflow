import { ChangeEvent, Ref } from "react";

export interface PropsSelect {
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>;
  label: string;
  options: string[];
  changeSelect?: (event: ChangeEvent<HTMLSelectElement>) => void;
}
