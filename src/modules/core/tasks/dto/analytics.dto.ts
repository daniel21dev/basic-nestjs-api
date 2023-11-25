import { STATUS } from '@prisma/client';

export class QueryAnalytics {
  startDate?: Date;
  endDate?: Date;
}

export class AnalyticsDto {
  taskByStatus: Record<STATUS, number>;
  overdueTasks: number;
  overTime: number;
  totalCost: number;
  totalTimeEstimate: number;
  totalTimeSpend: number;
}
