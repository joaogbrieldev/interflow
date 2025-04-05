export interface PropsButton {
  name: string;
  onClick: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
  icon?: "register" | "login" | "edit";
}
