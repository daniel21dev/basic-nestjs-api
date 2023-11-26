import { STATUS } from '@prisma/client';

export class AnalyticsDto {
  taskByStatus: Record<STATUS, number>;
  overdueTasks: number;
  overTime: number;
  totalCost: number;
  totalTimeEstimate: number;
  totalTimeSpend: number;
}
