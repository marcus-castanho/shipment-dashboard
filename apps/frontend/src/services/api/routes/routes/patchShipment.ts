import z from "zod";
import { type Fetch } from "../..";
import { request } from "../../httpClient";
import { useMutation } from "@tanstack/react-query";
import type { QueryKey } from "../../../../context/QueryContext";

const resBodySchema = z.object({
  id: z.number(),
  code: z.string(),
  origin: z.string(),
  destination: z.string(),
  status: z.number(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
type Shipment = z.infer<typeof resBodySchema>;

function validateResBodySchema(payload: unknown) {
  const validation = resBodySchema.safeParse(payload);
  const { success } = validation;

  if (!success) throw new Error(JSON.stringify(validation.error.issues));

  return validation.data;
}

type Payload = {
  token: string;
  id: Shipment["id"];
  payload: Partial<Omit<Shipment, "id" | "code" | "createdAt" | "updatedAt">>;
};
export const patchShipment: Fetch<Shipment, Payload> = async (payload) => {
  const { id, token, payload: payloadData } = payload;
  const response = await request({
    path: `/shipments/${id}`,
    options: {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payloadData),
    },
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

const MUTATION_KEY: QueryKey = "patch_shipment";
export function usePatchShipment() {
  return useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: patchShipment,
  });
}
