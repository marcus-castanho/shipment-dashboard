import { Controller, Get } from '@nestjs/common';
import { ShipmentStatusesService } from './shipment-statuses.service';

@Controller('shipment-statuses')
export class ShipmentStatusesController {
  constructor(
    private readonly shipmentStatusesService: ShipmentStatusesService,
  ) {}

  @Get()
  get() {
    return this.shipmentStatusesService.getDictionary();
  }
}
