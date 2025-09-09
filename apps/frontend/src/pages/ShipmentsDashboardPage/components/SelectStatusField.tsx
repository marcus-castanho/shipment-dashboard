import { SelectInput } from "../../../components/inputs/SelectInput";
import { STATUSES } from "../consts/status";

type SelectStatusFieldProps = {
  onSelect: (value: number) => void;
  onReset: () => void;
};
export const SelectStatusField = ({
  onSelect,
  onReset,
}: SelectStatusFieldProps) => {
  return (
    <SelectInput
      containerClassname="min-w-[200px]"
      placeholder="Select..."
      options={STATUSES.map(({ value, label }) => ({
        value: `${value}`,
        name: label,
      }))}
      onSelect={(value) => value && onSelect(parseInt(value))}
      onReset={onReset}
    />
  );
};
