import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskPriceService } from './task-price.service';
import { CreateTaskPriceDto } from './dto/create-task-price.dto';
import { UpdateTaskPriceDto } from './dto/update-task-price.dto';

@Controller('task-price')
export class TaskPriceController {
  constructor(private readonly taskPriceService: TaskPriceService) {}

  @Post()
  create(@Body() createTaskPriceDto: CreateTaskPriceDto) {
    return this.taskPriceService.create(createTaskPriceDto);
  }

  @Get()
  findAll() {
    return this.taskPriceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskPriceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskPriceDto: UpdateTaskPriceDto) {
    return this.taskPriceService.update(+id, updateTaskPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskPriceService.remove(+id);
  }
}
