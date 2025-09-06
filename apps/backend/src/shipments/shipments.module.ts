import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsGateway } from './shipments.gateway';
import { ShipmentsController } from './shipments.controller';

@Module({
  providers: [ShipmentsGateway, ShipmentsService],
  controllers: [ShipmentsController],
})
export class ShipmentsModule {}
