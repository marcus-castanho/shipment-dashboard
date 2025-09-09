import { type ReactNode, type RefObject } from "react";
import { containerClassNames } from "./styles";

type RootProps = {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  ref?: RefObject<HTMLDivElement | null>;
  children?: ReactNode;
  className?: string;
};
export const Root = ({
  containerProps,
  ref,
  children,
  className,
}: RootProps) => {
  return (
    <div
      {...containerProps}
      ref={ref}
      className={containerClassNames({ className })}
    >
      {children}
    </div>
  );
};
