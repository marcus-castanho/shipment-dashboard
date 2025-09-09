import { format } from "date-fns";
import { cn } from "../../../utils/cn";
import { useShipmentWSContext } from "../context/ShipmentWSContext";

export const LiveStatus = () => {
  const { useSocketStore } = useShipmentWSContext();
  const connected = useSocketStore((store) => store.socket?.connected);
  const lastUpdatedAt = useSocketStore((store) => store.lastUpdatedAt);

  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        <div
          className={cn(
            "size-3 rounded-full",
            connected ? "bg-green-600" : "bg-red-600"
          )}
        />
        {connected ? "Live" : "Offline"} |
        <div>Last updated at: {format(lastUpdatedAt, "HH:mm:ss")}</div>
      </div>
    </div>
  );
};
