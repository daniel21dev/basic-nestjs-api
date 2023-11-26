import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

    const { password, ...data } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    delete user.password;

    return user;
  }

  async findAll({ name, email, role, page = 1, limit = 10 }: QueryUserDto) {
    const filters = {};

    if (name) {
      if (!filters['OR']) filters['OR'] = [];
      filters['OR'].push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      });
    }

    if (email) {
      if (!filters['OR']) filters['OR'] = [];
      filters['OR'].push({
        email: {
          contains: email,
          mode: 'insensitive',
        },
      });
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
                cost: true,
              },
            },
          },
        },
      },
    });

    return users.map(({ UserTask, ...user }) => {
      const tasks = UserTask.map(({ task }) => task);
      const completedTasks = tasks.filter((task) => task.status === 'DONE');

      delete user.password;

      return {
        ...user,
        totalTasks: tasks.length,
        totalTimeSpend: tasks.reduce((acc, task) => acc + task.timeSpend, 0),
        totalTasksCompleted: completedTasks.length,
        totalCostTasksCompleted: completedTasks.reduce(
          (acc, task) => acc + task.cost,
          0,
        ),
      };
    });
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
