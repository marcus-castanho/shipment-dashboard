import { Main } from "../../components/Main";
import { ShipmentWSProvider } from "./context/ShipmentWSContext";

export const ShipmentsDashboardPage = () => {
  return (
    <ShipmentWSProvider>
      <Main className="p-10 flex flex-col gap-4">
        <></>
      </Main>
    </ShipmentWSProvider>
  );
};
