import { useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { ComposedInput } from "../../../components/inputs/ComposedInput";
import { MagnifyingGlassIcon } from "../../../components/icons/MagnifyingGlassIcon";

type SearchBarProps = {
  onChange: (value: string) => void;
};
export const SearchBar = ({ onChange }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (value: string) => {
    onChange(value);
  };

  useDebounce({
    value: searchValue,
    delay: 500,
    onDebouncedChange: (value) => handleChange(value),
  });

  return (
    <ComposedInput.Root className="p-2 flex gap-1 items-center">
      <MagnifyingGlassIcon className="fill-gray-500" />
      <div className="h-6 w-[1px] bg-white-normal_active" />
      <ComposedInput.Text
        inputProps={{
          placeholder: "Search by id",
          onChange: ({ target: { value } }) => setSearchValue(value),
        }}
      />
    </ComposedInput.Root>
  );
};
