import { Injectable, BadRequestException } from '@nestjs/common';
import { endOfWeek, startOfWeek } from 'date-fns';
import { PrismaService } from '@/modules/shared/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ assigneeId, ...data }: CreateTaskDto) {
    const assignee = await this.prisma.user.findUnique({
      where: {
        id: assigneeId,
      },
      select: {
        id: true,
      },
    });

    if (!assignee) {
      throw new BadRequestException('Assignee not found');
    }

    return this.prisma.task.create({
      data: {
        ...data,
        UserTask: {
          create: {
            user: {
              connect: {
                id: assigneeId,
              },
            },
          },
        },
      },
    });
  }

  async findAll(query: QueryTaskDto) {
    const filters = {};

    if (query.startDate || query.endDate) {
      if (query.startDate && query.endDate) {
        filters['createdAt'] = {
          gte: new Date(query.startDate),
          lte: new Date(query.endDate),
        };
      } else if (query.startDate) {
        filters['createdAt'] = {
          gte: new Date(query.startDate),
        };
      } else if (query.endDate) {
        filters['createdAt'] = {
          lte: new Date(query.endDate),
        };
      }
    }

    if (query.startDueDate || query.endDueDate) {
      if (query.startDueDate && query.endDueDate) {
        filters['dueDate'] = {
          gte: new Date(query.startDueDate),
          lte: new Date(query.endDueDate),
        };
      } else if (query.startDueDate) {
        filters['dueDate'] = {
          gte: new Date(query.startDueDate),
        };
      } else if (query.endDueDate) {
        filters['dueDate'] = {
          lte: new Date(query.endDueDate),
        };
      }
    }

    if (query.status) {
      filters['status'] = query.status;
    }

    if (query.title) {
      filters['title'] = {
        contains: query.title,
        mode: 'insensitive',
      };
    }

    if (query.assigneeId) {
      filters['UserTask'] = {
        some: {
          userId: query.assigneeId,
        },
      };
    }

    if (query.assigneeName || query.assigneeEmail) {
      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query.assigneeName,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: query.assigneeEmail,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });

      filters['UserTask'] = {
        some: {
          userId: {
            in: filters['UserTask']
              ? [filters['UserTask'].some.userId, ...users.map(({ id }) => id)]
              : users.map(({ id }) => id),
          },
        },
      };
    }

    const page = +query.page || 1;
    const limit = +query.limit || 10;

    return this.prisma.task.findMany({
      where: filters,
      include: {
        UserTask: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      skip: page ? (page - 1) * limit : 0,
      take: limit || 10,
      orderBy: {
        createdAt: String(query.orderDesc) === 'true' ? 'desc' : 'asc',
      },
    });
  }

  async analytics(startDate?: Date, endDate?: Date) {
    const filter = {
      createdAt: {
        gte: startDate || startOfWeek(new Date()),
        lte: endDate || endOfWeek(new Date()),
      },
    };

    const tasks = await this.prisma.task.findMany({
      where: filter,
      select: {
        status: true,
        cost: true,
        timeEstimate: true,
        timeSpend: true,
        dueDate: true,
      },
    });

    const taskByStatus = tasks.reduce(
      (acc, { status }) => ({
        ...acc,
        [status]: (acc[status] || 0) + 1,
      }),
      {},
    );

    const overdueTasks = tasks.filter(
      ({ dueDate }) => dueDate < new Date(),
    ).length;

    const overTime = tasks.filter(
      ({ timeEstimate, timeSpend }) => timeEstimate < timeSpend,
    ).length;

    const totalCost = tasks.reduce((acc, { cost }) => acc + cost, 0);

    const totalTimeEstimate = tasks.reduce(
      (acc, { timeEstimate }) => acc + timeEstimate,
      0,
    );

    const totalTimeSpend = tasks.reduce(
      (acc, { timeSpend }) => acc + timeSpend,
      0,
    );

    return {
      taskByStatus,
      overdueTasks,
      overTime,
      totalCost,
      totalTimeEstimate,
      totalTimeSpend,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskExists = await this.prisma.task.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!taskExists) {
      throw new BadRequestException('Task not found');
    }

    const update = {};

    if (updateTaskDto.addAssigneeId) {
      const assignee = await this.prisma.user.findUnique({
        where: {
          id: updateTaskDto.addAssigneeId,
        },
        select: {
          id: true,
        },
      });

      if (!assignee) {
        throw new BadRequestException('Assignee not found');
      }

      update['UserTask'] = {
        create: {
          userId: updateTaskDto.addAssigneeId,
        },
      };
    }

    if (updateTaskDto.removeAssigneeId) {
      const UserTask = await this.prisma.userTask.findFirst({
        where: {
          taskId: id,
          userId: updateTaskDto.removeAssigneeId,
        },
        select: {
          id: true,
        },
      });

      if (!UserTask) {
        throw new BadRequestException('Assignee not found');
      }

      update['UserTask'] = {
        delete: {
          id: UserTask.id,
        },
      };
    }

    delete updateTaskDto.addAssigneeId;
    delete updateTaskDto.removeAssigneeId;

    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...update,
        ...updateTaskDto,
      },
    });
  }

  async remove(id: string) {
    const taskExists = await this.prisma.task.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!taskExists) {
      throw new BadRequestException('Task not found');
    }

    await this.prisma.$transaction([
      this.prisma.userTask.deleteMany({
        where: {
          taskId: id,
        },
      }),
      this.prisma.task.delete({
        where: {
          id,
        },
      }),
    ]);
  }
}
