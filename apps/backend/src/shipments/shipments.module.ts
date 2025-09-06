import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsGateway } from './shipments.gateway';
import { ShipmentsController } from './shipments.controller';
import { jwtModule } from 'src/auth/dependencies/jwt.module';

@Module({
  imports: [jwtModule],
  providers: [ShipmentsGateway, ShipmentsService],
  controllers: [ShipmentsController],
})
export class ShipmentsModule {}
