import { type ComponentProps } from "react";
import { ComposedInput } from ".";
import { cn } from "../../../utils/cn";
import type { ClassValue } from "clsx";

type ContainerClassNamesArgs = Pick<
  ComponentProps<typeof ComposedInput.Root>,
  "className"
>;
export const containerClassNames = ({ className }: ContainerClassNamesArgs) =>
  cn(className, "rounded-md border px-5 py-2 flex w-full bg-gray-100");
export const inputClassNames: ClassValue = "w-full outline-0";
