import { QueryProvider } from "./context/QueryContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <QueryProvider>
        <div>Shipments Dashboard</div>
      </QueryProvider>
    </UserProvider>
  );
}

export default App;
