import { Status } from '../consts/status';

export class ShipmentStatus {
  0: Extract<Status, 'untracked'>;
  1: Extract<Status, 'created'>;
  2: Extract<Status, 'in_transit'>;
  3: Extract<Status, 'delayed'>;
  4: Extract<Status, 'on_time'>;
  5: Extract<Status, 'delivered'>;
}
