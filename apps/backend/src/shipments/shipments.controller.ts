import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
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
import { AuthGuard } from 'src/auth/auth.guard';
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
    const { userId } = req;
    if (userId !== createShipmentDto.userId) throw new ForbiddenException();

    const shipment = await this.shipmentsService.create(createShipmentDto);

    if ('error' in shipment) {
      if (shipment.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    const shipments = await this.shipmentsService.findAll({ userId });
    this.shipmentsGateway.notifyQueryChanges({ shipments });

    return shipment;
  }

  @Get()
  findAll(
    @Req() req: CustomRequest,
    @Query('code') code?: string,
    @Query('status') status?: number,
  ) {
    return this.shipmentsService.findAll({ userId: req.userId, code, status });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const shipment = await this.shipmentsService.findOne(+id);

    if (!shipment) throw new NotFoundException();

    return shipment;
  }

  @Patch(':id')
  async update(
    @Req() req: CustomRequest,
    @Param('id') id: string,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ) {
    const { userId } = req;
    const shipment = await this.shipmentsService.findOne(+id);

    if (!shipment) throw new NotFoundException();
    if (userId !== shipment.userId) throw new ForbiddenException();

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

    const shipments = await this.shipmentsService.findAll({ userId });
    this.shipmentsGateway.notifyQueryChanges({ shipments });
    this.shipmentsGateway.notifyRecordChanges({ shipment });

    return shipment;
  }

  @Delete(':id')
  async remove(@Req() req: CustomRequest, @Param('id') id: string) {
    const { userId } = req;

    const shipment = await this.shipmentsService.findOne(+id);

    if (!shipment) throw new NotFoundException();
    if (userId !== shipment.userId) throw new ForbiddenException();

    await this.shipmentsService.remove(+id);
  }
}
