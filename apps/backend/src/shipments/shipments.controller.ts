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
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { PRISMA_ERROR } from 'src/prisma/consts';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ShipmentsGateway } from './shipments.gateway';

@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly shipmentsService: ShipmentsService,
    private readonly shipmentsGateway: ShipmentsGateway,
  ) {}

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    const shipment = await this.shipmentsService.create(createShipmentDto);

    if ('error' in shipment) {
      if (shipment.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    const shipments = await this.shipmentsService.findAll();
    this.shipmentsGateway.notifyQueryChanges({ shipments });

    return shipment;
  }

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
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
    const shipment = await this.shipmentsService.update(+id, updateShipmentDto);

    if (!shipment) throw new NotFoundException();

    if ('error' in shipment) {
      if (shipment.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    const shipments = await this.shipmentsService.findAll();
    this.shipmentsGateway.notifyQueryChanges({ shipments });
    this.shipmentsGateway.notifyRecordChanges({ shipment });

    return shipment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const shipment = await this.shipmentsService.remove(+id);

    if (shipment === null) throw new NotFoundException();

    return;
  }
}
