import { type ComponentProps } from "react";
import { ComposedInput } from "./ComposedInput";

type TextInputProps = {
  containerClassname?: string;
  inputClassname?: string;
} & Omit<ComponentProps<typeof ComposedInput.Root>, "className" | "children"> &
  Omit<ComponentProps<typeof ComposedInput.Text>, "className">;
export const TextInput = ({
  containerClassname,
  inputClassname,
  inputProps,
}: TextInputProps) => {
  return (
    <ComposedInput.Root className={containerClassname}>
      <ComposedInput.Text
        className={inputClassname}
        inputProps={{ ...inputProps }}
      />
    </ComposedInput.Root>
  );
};
