import { cn } from "../utils/cn";

type SpinnerProps = {
  className?: string;
};
export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <span
      aria-label="spinner"
      className={cn(
        "inline-block h-4 aspect-square animate-spin rounded-[50%] border-4 border-b-transparent",
        className
      )}
    />
  );
};
