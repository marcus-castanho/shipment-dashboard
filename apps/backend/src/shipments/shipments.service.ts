import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    const catchError = (error) => this.prismaService.catchError(error);
    const code = uuid();

    const createdShipment = await this.prismaService.shipment
      .create({
        data: { ...createShipmentDto, code },
      })
      .catch(catchError);

    return { ...createdShipment };
  }

  async findAll({ userId }: { userId: number }) {
    const shipments = await this.prismaService.shipment.findMany({
      where: { userId },
    });

    return shipments;
  }

  async findOne(id: number) {
    const shipment = await this.prismaService.shipment.findFirst({
      where: { id },
    });

    return shipment;
  }

  async update(id: number, updateShipmentDto: UpdateShipmentDto) {
    const catchError = (error) => this.prismaService.catchError(error);
    const shipment = await this.findOne(id);

    if (!shipment) return null;

    const updatedShipment = await this.prismaService.shipment
      .update({
        data: { ...updateShipmentDto },
        where: { id },
      })
      .catch(catchError);

    return updatedShipment;
  }

  async remove(id: number) {
    const shipment = await this.findOne(id);

    if (!shipment) return null;

    await this.prismaService.shipment.delete({ where: { id } });
  }
}
