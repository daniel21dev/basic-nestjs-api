import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/modules/shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/search-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException(
        `Email ${createUserDto.email} already exists`,
      );
    }

    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll({ name, email, role, page = 1, limit = 10 }: QueryUserDto) {
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
      skip: (+page - 1) * +limit,
      take: +limit,
      include: {
        UserTask: {
          select: {
            task: {
              select: {
                status: true,
                timeSpend: true,
              },
            },
          },
        },
      },
    });

    return users.map(({ UserTask, ...user }) => {
      const tasks = UserTask.map(({ task }) => task);
      return {
        ...user,
        totalTasks: tasks.length,
        totalTimeSpend: tasks.reduce((acc, task) => acc + task.timeSpend, 0),
        totalTasksCompleted: tasks.filter((task) => task.status === 'DONE'),
      };
    });
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
