import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/modules/shared/prisma/prisma.service';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll({ name, email, role }: SearchUserDto, page = 1, limit = 10) {
    const filters = {};

    if (name) {
      filters['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (email) {
      filters['email'] = {
        contains: email,
        mode: 'insensitive',
      };
    }

    if (role) {
      filters['role'] = role;
    }

    const users = await this.prisma.user.findMany({
      where: filters,
      skip: (page - 1) * limit,
      take: limit,
    });

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
