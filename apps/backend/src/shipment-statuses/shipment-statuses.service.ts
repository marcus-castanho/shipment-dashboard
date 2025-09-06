import { Injectable } from '@nestjs/common';
import { Status, STATUS } from './consts/status';

@Injectable()
export class ShipmentStatusesService {
  getDictionary() {
    return STATUS;
  }

  getValues() {
    const statuses = Object.keys(STATUS)
      .filter((status) => {
        const isNaN = Number.isNaN(parseInt(status));
        return !isNaN;
      })
      .map((status) => parseInt(status)) as Status[];

    return statuses;
  }

  list() {
    const list = Object.entries(STATUS)
      .map(([value, code]) => ({ value: parseInt(value), code }))
      .sort((a, b) => a.value - b.value);

    return list;
  }
}
