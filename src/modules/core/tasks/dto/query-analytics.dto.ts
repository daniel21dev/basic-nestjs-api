import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class QueryAnalytics {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
