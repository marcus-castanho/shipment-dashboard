import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const catchError = (error) => this.prismaService.catchError(error);
    const createdUser = await this.prismaService.user
      .create({
        data: { ...createUserDto },
      })
      .catch(catchError);
    return createdUser;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({ where: { id } });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const catchError = (error) => this.prismaService.catchError(error);

    const user = await this.findOne(id);

    if (!user) return null;

    const updatedUser = await this.prismaService.user
      .update({
        data: { ...updateUserDto },
        where: { id },
      })
      .catch(catchError);

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) return null;

    await this.prismaService.user.delete({ where: { id } });
  }
}
