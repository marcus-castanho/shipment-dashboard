import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type ListedShipment } from "../../../../services/api/routes/routes/getShipments";
import { useMemo } from "react";
import { TableRow } from "./TableRow";

export type ShipmentRowData = ListedShipment;

const columnHelper = createColumnHelper<ShipmentRowData>();

const columns = [
  columnHelper.accessor((row) => row.code, {
    id: "code",
    header: () => "Shipment ID",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor((row) => row.origin, {
    id: "origin",
    header: () => "Origin",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor((row) => row.destination, {
    id: "destination",
    header: () => "Destination",
    cell: (cell) => cell.getValue(),
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    header: () => "Status",
  }),
  columnHelper.accessor((row) => row.updatedAt, {
    id: "updatedAt",
    header: () => "Last Updated",
  }),
  columnHelper.accessor((row) => row.id, {
    id: "mark_delivered_button",
    header: () => <></>,
  }),
];

type TableProps = { rawData: ListedShipment[] };
export const Table = ({ rawData }: TableProps) => {
  const data = useMemo(() => rawData.map((item) => item) || [], [rawData]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-start p-2 text-black border-b-1 border-gray-500"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={`${row.id} - ${row.original.id}`} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
