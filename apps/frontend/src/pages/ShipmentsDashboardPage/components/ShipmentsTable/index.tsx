import { useState } from "react";
import { useUser } from "../../../../context/UserContext";
import { useShipments } from "../../../../services/api/routes/routes/getShipments";
import { Table } from "./Table";
import { SearchBar } from "../SearchBar";
import { LiveStatus } from "../LiveStatus";
import { Spinner } from "../../../../components/Spinner";
import { cn } from "../../../../utils/cn";
import { SelectStatusField } from "../SelectStatusField";

type Filter = { code: string; status: number };

export const ShipmentsTable = () => {
  const { user } = useUser();
  const [filters, setFilters] = useState<Partial<Filter>>({});
  const { data: shipments, isFetching } = useShipments({
    token: user.token,
    filters: { userId: user.id, ...filters },
  });

  const handleFilters = (
    filter: keyof Filter,
    value: string | number | null
  ) => {
    setFilters((state) => {
      const newState = { ...state, [filter]: value };

      if (value === null) delete newState[filter];

      return { ...newState };
    });
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-10">
        <div className="flex flex-row items-center gap-4">
          <SearchBar
            onChange={(value) =>
              handleFilters("code", value === "" ? null : value)
            }
          />
          <SelectStatusField
            onSelect={(value) => handleFilters("status", value)}
            onReset={() => handleFilters("status", null)}
          />
          <Spinner
            className={cn(
              "border-2 h-4 border-gray-500 border-b-transparent",
              !isFetching && "opacity-0"
            )}
          />
        </div>
        <LiveStatus />
      </div>
      <Table rawData={[...(shipments?.data || [])]} />
    </div>
  );
};
