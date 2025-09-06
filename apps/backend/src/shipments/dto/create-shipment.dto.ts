import { IsIn, IsNumber, IsString } from 'class-validator';
import { STATUSES } from 'src/shipment-statuses/consts/status';
import type { Status } from 'src/shipment-statuses/consts/status';

export class CreateShipmentDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsIn(STATUSES)
  status: Status;

  @IsNumber()
  userId: number;
}
