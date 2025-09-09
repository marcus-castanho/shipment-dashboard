import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { customAlphabet } from 'nanoid';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createShipmentDto: CreateShipmentDto) {
    const catchError = (error) => this.prismaService.catchError(error);
    const code = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)();

    const createdShipment = await this.prismaService.shipment
      .create({
        data: { ...createShipmentDto, code },
      })
      .catch(catchError);

    return { ...createdShipment };
  }

  async findAll({
    userId,
    code,
    status,
  }: {
    userId: number;
    code?: string;
    status?: number;
  }) {
    const shipments = await this.prismaService.shipment.findMany({
      where: {
        userId,
        code: { startsWith: code, mode: 'insensitive' },
        status,
      },
      orderBy: { createdAt: 'desc' },
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
    const catchError = (error) => this.prismaService.catchError(error);

    return await this.prismaService.shipment
      .delete({
        where: { id },
      })
      .catch(catchError);
  }
}
