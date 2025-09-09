import { cn } from "../utils/cn";
import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
  className?: string;
};
export const Main = ({ children, className }: MainProps) => {
  return <main className={cn(className)}>{children}</main>;
};
