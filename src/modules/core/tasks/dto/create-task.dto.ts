import { OmitType } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { IsUUID } from 'class-validator';

export class CreateTaskDto extends OmitType(Task, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsUUID()
  assigneeId: string;
}
