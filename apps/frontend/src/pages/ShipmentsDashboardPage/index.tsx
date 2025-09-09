import { Main } from "../../components/Main";
import { ShipmentsTable } from "./components/ShipmentsTable";
import { UserSwitch } from "./components/UserSwitch";
import { ShipmentWSProvider } from "./context/ShipmentWSContext";

export const ShipmentsDashboardPage = () => {
  return (
    <ShipmentWSProvider>
      <Main className="p-10 flex flex-col gap-4">
        <UserSwitch />
        <h1 className="text-4xl">Shipments Dashboard</h1>
        <ShipmentsTable />
      </Main>
    </ShipmentWSProvider>
  );
};
