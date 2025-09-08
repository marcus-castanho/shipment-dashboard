import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PRISMA_ERROR } from 'src/prisma/consts';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    if ('error' in user) {
      if (user.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    if (!user) throw new NotFoundException();

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    if (!user) throw new NotFoundException();

    if ('error' in user) {
      if (user.error.code === PRISMA_ERROR.P2002.code)
        throw new ConflictException();
      throw new InternalServerErrorException();
    }

    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(+id);

    if (user === null) throw new NotFoundException();

    return;
  }
}
