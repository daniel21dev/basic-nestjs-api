import { PartialType, IntersectionType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateAssigneeDto {
  @IsUUID()
  @IsOptional()
  addAssigneeId?: string;
  @IsUUID()
  @IsOptional()
  removeAssigneeId?: string;
}

export class UpdateTaskDto extends IntersectionType(
  PartialType(CreateTaskDto),
  UpdateAssigneeDto,
) {}
