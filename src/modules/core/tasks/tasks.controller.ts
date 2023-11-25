import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryTaskDto } from './dto/query-task.dto';
import { Task } from './entities/task.entity';
import { AnalyticsDto, QueryAnalytics } from './dto/analytics.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateTaskDto,
  })
  @ApiResponse({ status: 400, description: 'Assignee not found.' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The records has been successfully retrieved.',
    type: [Task],
  })
  @Get()
  findAll(@Query() query: QueryTaskDto) {
    return this.tasksService.findAll(query);
  }

  @ApiResponse({
    status: 200,
    description: 'Task analytics has been successfully retrieved.',
    type: AnalyticsDto,
  })
  @Get('analytics')
  analitics(@Query() query: QueryAnalytics) {
    return this.tasksService.analytics(query.startDate, query.endDate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
