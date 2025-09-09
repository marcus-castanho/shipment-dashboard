import { QueryProvider } from "./context/QueryContext";
import { UserProvider } from "./context/UserContext";
import { ShipmentsDashboardPage } from "./pages/ShipmentsDashboardPage";

function App() {
  return (
    <UserProvider>
      <QueryProvider>
        <ShipmentsDashboardPage />
      </QueryProvider>
    </UserProvider>
  );
}

export default App;
