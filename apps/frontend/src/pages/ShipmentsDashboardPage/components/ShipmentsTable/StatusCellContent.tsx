import { cn } from "../../../../utils/cn";
import { STATUS, STATUSES } from "../../consts/status";

type StatusCellContentProps = { value: number };
export const StatusCellContent = ({ value }: StatusCellContentProps) => {
  const { label: content, value: status } =
    STATUSES.find((status) => status.value === value) || STATUS.untracked;

  return (
    <div
      className={cn(
        "p-2 rounded-md",
        status === 3 && "bg-red-600/70 text-white",
        status === 5 && "bg-green-600/70 text-white"
      )}
    >
      {content}
    </div>
  );
};
