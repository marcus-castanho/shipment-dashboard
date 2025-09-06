export const STATUS = {
  0: 'untracked',
  1: 'created',
  2: 'in_transit',
  3: 'delayed',
  4: 'on_time',
  5: 'delivered',
} as const;
export type Status = keyof typeof STATUS;
export type StatusCode = (typeof STATUS)[Status];
export const STATUSES = Object.keys(STATUS)
  .filter((status) => {
    const isNaN = Number.isNaN(parseInt(status));
    return !isNaN;
  })
  .map((status) => parseInt(status)) as Status[];
