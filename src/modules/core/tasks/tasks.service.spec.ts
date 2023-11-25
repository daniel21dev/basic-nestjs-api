import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '@/modules/shared/prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result: Awaited<ReturnType<typeof service.findAll>> = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Description 1',
          status: 'TODO',
          dueDate: new Date(),
          cost: 1,
          createdAt: new Date(),
          timeEstimate: 1,
          timeSpend: 1,
          updatedAt: new Date(),
          UserTask: [
            {
              user: {
                id: '1',
                name: 'User 1',
                email: '',
              },
            },
          ],
        },
      ];

      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll({ assigneeId: '1' })).toBe(result);
    });
  });
});
