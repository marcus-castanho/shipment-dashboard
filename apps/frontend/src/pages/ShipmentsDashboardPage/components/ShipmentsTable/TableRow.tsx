import { type Row } from "@tanstack/react-table";
import type { ShipmentRowData } from "./Table";
import { useWSShipment } from "../../hooks/useWSShipment";
import { StatusCellContent } from "./StatusCellContent";
import { MarkAsDeliveredButton } from "./MarkAsDeliveredButton";
import { format } from "date-fns";

type TableRowProps = { row: Row<ShipmentRowData> };
export const TableRow = ({ row }: TableRowProps) => {
  const { shipment } = useWSShipment({
    id: row.original.id,
    initialData: row.original,
  });

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => {
        const value = shipment[cell.column.id as keyof typeof shipment] || "";

        return (
          <td
            key={`${cell.id}`}
            className="p-2 py-3 border-b-1 border-gray-300"
          >
            {["code", "origin", "destination"].includes(cell.column.id)
              ? value
              : ""}
            {cell.column.id === "status" && (
              <StatusCellContent value={parseInt(`${value}`)} />
            )}
            {cell.column.id === "updatedAt" && (
              <>{format(new Date(value), "HH:mm:ss - MM/dd/yy")}</>
            )}
            {cell.column.id === "mark_delivered_button" && (
              <MarkAsDeliveredButton
                id={cell.row.original.id}
                data={cell.row.original}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
};
