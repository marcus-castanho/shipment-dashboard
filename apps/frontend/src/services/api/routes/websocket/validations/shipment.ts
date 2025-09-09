import z from "zod";

const shipmentSchema = z.object({
  id: z.number(),
  code: z.string(),
  origin: z.string(),
  destination: z.string(),
  status: z.number(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export function validateShipmentPayload(payload: unknown) {
  const validation = shipmentSchema.safeParse(payload);
  const { success } = validation;

  if (!success) return { success: false };

  return { success: true, data: validation.data };
}
