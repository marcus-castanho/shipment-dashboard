import React, { useState } from "react";
import { Select, ScrollArea } from "radix-ui";
import { containerClassNames } from "./ComposedInput/styles";
import { ChevronIcon } from "../icons/ChevronIcon";
import { v4 as uuid } from "uuid";
import { TrashIcon } from "../icons/TrashIcon";
import { cn } from "../../utils/cn";

type SelectItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};
const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
  return (
    <Select.Item
      className={cn(
        "rounded p-2 outline-0 hover:bg-gray-300 my-1 data-[state=checked]:bg-gray-300",
        className
      )}
      {...props}
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
};

type TriggerProps = {
  className?: string;
  placeholder?: string;
  value: string | null;
  open: boolean;
  onReset: () => void;
};
const Trigger = ({
  className,
  placeholder,
  value,
  open,
  onReset,
}: TriggerProps) => {
  return (
    <div
      className={containerClassNames({
        className: cn("flex items-center gap-2", className),
      })}
    >
      <Select.Trigger className="flex gap-2 flex-1 outline-0 justify-between">
        <div
          className={cn("flex items-center truncate", {
            "text-gray-700/50": value === null,
          })}
        >
          <Select.Value placeholder={placeholder} />
        </div>
        <Select.Icon
          className={cn(
            { "rotate-90": !open },
            { "rotate-[270deg]": open },
            "flex items-center justify-center transition-all duration-100"
          )}
        >
          <ChevronIcon className="fill-gray-300" />
        </Select.Icon>
      </Select.Trigger>
      <button
        disabled={value === null}
        className={cn(value === null && "hidden")}
        onClick={onReset}
      >
        <TrashIcon className="stroke-gray-500" />
      </button>
    </div>
  );
};

type DropdownProps = { options: { value: string; name: string }[] };
const Dropdown = ({ options }: DropdownProps) => {
  return (
    <Select.Content
      className="mt-6 w-[200px] -translate-x-5 rounded bg-gray-200 p-4 z-10 relative border border-black/50"
      position="popper"
    >
      <ScrollArea.Root type="auto">
        <Select.Viewport asChild>
          <Select.Group className="flex max-h-[150px] flex-col gap-1">
            <ScrollArea.Viewport className="pr-2">
              {options.map(({ value, name }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb className="min-w-1 rounded bg-black/30" />
            </ScrollArea.Scrollbar>
          </Select.Group>
        </Select.Viewport>
      </ScrollArea.Root>
    </Select.Content>
  );
};

type SelectInputProps = {
  containerClassname?: string;
  options: { value: string; name: string }[];
  placeholder?: string;
  onSelect: (value: string | null) => void;
  onReset: () => void;
};
export const SelectInputComponent = ({
  containerClassname,
  options,
  placeholder,
  onSelect,
  onReset,
}: SelectInputProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (input: string | null) => {
    onSelect(input);
    setValue(input);
  };

  return (
    <Select.Root
      onOpenChange={(state) => setOpen(state)}
      onValueChange={handleSelect}
    >
      <Trigger
        className={containerClassname}
        placeholder={placeholder}
        value={value}
        open={open}
        onReset={onReset}
      />

      <Dropdown options={options} />
    </Select.Root>
  );
};

export const SelectInput = (props: SelectInputProps) => {
  const [key, setKey] = useState(uuid());

  return (
    <SelectInputComponent
      key={key}
      {...props}
      onReset={() => {
        setKey(uuid());
        props?.onReset();
      }}
    />
  );
};
