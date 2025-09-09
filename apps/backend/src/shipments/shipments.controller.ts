import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { PRISMA_ERROR } from 'src/prisma/consts';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsGateway } from './shipments.gateway';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { CustomRequest } from 'src/auth/types';

@UseGuards(AuthGuard)
@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly shipmentsGateway: ShipmentsGateway,
  ) {}

  @Post()
  async create(
    @Req() req: CustomRequest,
    @Body() createShipmentDto: CreateShipmentDto,
  ) {
    const shipment = await this.shipmentsService.create(createShipmentDto);

    if ('error' in shipment) {
      if (shipment.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    return shipment;
  }

  @Get()
  findAll(
    @Req() req: CustomRequest,
    @Query('code') code?: string,
    @Query('status') status?: number,
  ) {
    return this.shipmentsService.findAll({
      userId: req.userId,
      code,
      status: status ? +status : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shipment = await this.shipmentsService.findOne(+id);

    if (!shipment) throw new NotFoundException();

    return shipment;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    const updatedShipment = await this.shipmentsService.update(
      +id,
      updateShipmentDto,
    );

    if (!updatedShipment) throw new NotFoundException();

    if ('error' in updatedShipment) {
      if (updatedShipment.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    this.shipmentsGateway.notifyRecordChanges({ shipment: updatedShipment });

    return updatedShipment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedShipment = await this.shipmentsService.remove(+id);

    if ('error' in removedShipment) {
      if (removedShipment.error.code === PRISMA_ERROR.P2025.code)
        throw new NotFoundException();
      throw new InternalServerErrorException();
    }
  }
}
