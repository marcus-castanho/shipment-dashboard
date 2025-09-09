import { cn } from "../../../utils/cn";
import { inputClassNames } from "./styles";

type TextProps = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};
export const Text = ({ className, inputProps }: TextProps) => {
  return <input {...inputProps} className={cn(className, inputClassNames)} />;
};
