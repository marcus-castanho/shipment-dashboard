import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ShipmentStatusesModule } from './shipment-statuses/shipment-statuses.module';

@Module({
  imports: [PrismaModule, UsersModule, ShipmentStatusesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
