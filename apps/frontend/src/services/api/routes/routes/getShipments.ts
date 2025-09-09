import z from "zod";
import { request } from "../../httpClient";
import { useQuery } from "@tanstack/react-query";
import type { Fetch } from "../..";
import type { QueryKey } from "../../../../context/QueryContext";

const resBodySchema = z.array(
  z.object({
    id: z.number(),
    code: z.string(),
    origin: z.string(),
    destination: z.string(),
    status: z.number(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
);
type ResBody = z.infer<typeof resBodySchema>;
export type ListedShipment = ResBody[number];

function validateResBodySchema(payload: unknown) {
  const validation = resBodySchema.safeParse(payload);
  const { success } = validation;

  if (!success) throw new Error(JSON.stringify(validation.error.issues));

  return validation.data;
}

type Payload = {
  token: string;
  filters?: { userId?: number; code?: string; status?: number };
};
export const getShipments: Fetch<ResBody, Payload> = async (payload) => {
  const { token } = payload;
  const filters = payload?.filters || {};
  const parsedFilters = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, `${value}`])
  );
  const searchParams = new URLSearchParams({
    ...parsedFilters,
  });

  const response = await request({
    path: `/shipments?${searchParams}`,
    options: { method: "GET", headers: { Authorization: `Bearer ${token}` } },
  });
  const { status } = response;

  if (status !== 200) return { success: false, status, data: null };

  const resBody = await response.json().catch(() => ({}));
  const data = validateResBodySchema(resBody);

  return {
    success: true,
    status,
    data,
  };
};

export const GET_SHIPMENTS_QUERY_KEY: QueryKey = "get_shipments";
export function useShipments(payload: Payload) {
  return useQuery({
    queryKey: [
      GET_SHIPMENTS_QUERY_KEY,
      payload.token,
      payload.filters?.code,
      payload.filters?.status,
      payload.filters?.userId,
    ],
    queryFn: () => getShipments(payload),
    placeholderData: (prev) => prev,
  });
}
