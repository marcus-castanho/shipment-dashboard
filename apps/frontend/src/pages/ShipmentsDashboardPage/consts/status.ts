export const STATUS = {
  untracked: { value: 0, label: "Untracked" },
  created: { value: 1, label: "Created" },
  in_transit: { value: 2, label: "In Transit" },
  delayed: { value: 3, label: "Delayed" },
  on_time: { value: 4, label: "On Time" },
  delivered: { value: 5, label: "Delivered" },
} as const;
export const STATUSES = Object.entries(STATUS).map(
  ([code, { value, label }]) => ({
    code: code as keyof typeof STATUS,
    value,
    label,
  })
);
