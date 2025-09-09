import { useUser } from "../../../../context/UserContext";
import { usePatchShipment } from "../../../../services/api/routes/routes/patchShipment";
import { cn } from "../../../../utils/cn";
import { STATUS, STATUSES } from "../../consts/status";
import { useWSShipment } from "../../hooks/useWSShipment";
import { Spinner } from "../../../../components/Spinner";
import type { ListedShipment } from "../../../../services/api/routes/routes/getShipments";

type MarkAsDeliveredButtonProps = { id: number; data: ListedShipment };
export const MarkAsDeliveredButton = ({
  id,
  data,
}: MarkAsDeliveredButtonProps) => {
  const { user } = useUser();
  const updateShipment = usePatchShipment();
  const { shipment } = useWSShipment({ id, initialData: data });
  const isDelivered =
    (STATUSES.find(({ code }) => code === "delivered")?.value ||
      STATUS.untracked.value) === shipment.status;

  const handleUpdate = async () => {
    await updateShipment.mutateAsync({
      token: user.token,
      id,
      payload: { status: STATUS.delivered.value },
    });
  };

  return (
    <button
      className={cn(
        "flex flex-row gap-2 items-center bg-gray-400/20  border-[1px] p-2  rounded-md cursor-pointer",
        isDelivered && "opacity-0"
      )}
      disabled={updateShipment.isPending || isDelivered}
      onClick={handleUpdate}
    >
      Mark as delivered
      <Spinner
        className={cn(
          "border-2 h-4 border-black/50 border-b-transparent opacity-0",
          updateShipment.isPending && "opacity-100"
        )}
      />
    </button>
  );
};
