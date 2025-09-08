import { Module } from '@nestjs/common';
import { ShipmentStatusesService } from './shipment-statuses.service';
import { ShipmentStatusesController } from './shipment-statuses.controller';

@Module({
  controllers: [ShipmentStatusesController],
  providers: [ShipmentStatusesService],
})
export class ShipmentStatusesModule {}
