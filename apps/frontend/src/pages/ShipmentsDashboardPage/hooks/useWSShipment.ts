import { useCallback, useEffect, useState } from "react";
import { useShipmentWSContext } from "../context/ShipmentWSContext";
import { EVENT } from "../../../services/api/routes/websocket/useShipmentsWebsocket";
import { validateShipmentPayload } from "../../../services/api/routes/websocket/validations/shipment";
import type { ListedShipment } from "../../../services/api/routes/routes/getShipments";

type UseWSShipmentArgs = { id: number; initialData: ListedShipment };
export function useWSShipment({ id, initialData }: UseWSShipmentArgs) {
  const { useSocketStore } = useShipmentWSContext();
  const socket = useSocketStore((store) => store.socket);
  const [shipment, setShipment] = useState(initialData);

  const onUpdate = useCallback(
    (message: unknown) => {
      const validation = validateShipmentPayload(message);

      if (!validation.data) return;
      if (validation.data?.id !== id) return;

      setShipment(validation.data);
    },
    [id]
  );

  useEffect(() => {
    socket?.emit(EVENT.SUBSCRIBE_TO_ID, id);
    socket?.on(EVENT.FIND, onUpdate);
  }, [socket, id, onUpdate]);

  return { shipment };
}
