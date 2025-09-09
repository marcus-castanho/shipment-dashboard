import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type QueryKey = "get_shipments" | "patch_shipment";

export type QueryProviderProps = {
  children?: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
