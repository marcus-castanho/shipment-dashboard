import { createContext, useContext, type ReactNode } from "react";
import { useShipmentsWebsocket } from "../../../services/api/routes/websocket/useShipmentsWebsocket";

type ShipmentWSContextType = ReturnType<typeof useShipmentsWebsocket>;
const ShipmentWSContext = createContext<ShipmentWSContextType | null>(null);

type ShipmentWSProviderProps = {
  children?: ReactNode;
};
export function ShipmentWSProvider({ children }: ShipmentWSProviderProps) {
  const socket = useShipmentsWebsocket();

  return (
    <ShipmentWSContext.Provider value={{ ...socket }}>
      {children}
    </ShipmentWSContext.Provider>
  );
}

export function useShipmentWSContext(): ShipmentWSContextType {
  const context = useContext(ShipmentWSContext);

  if (!context) throw new Error("ShipmentWSContex was not provided");

  return context;
}
