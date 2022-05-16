import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskPriceDto } from './dto/create-task-price.dto';
import { UpdateTaskPriceDto } from './dto/update-task-price.dto';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';

@Injectable()
export class TaskPriceService {
  constructor(@InjectModel(TaskPrice.name) private taskPriceModel: Model<TaskPriceDocument>) {}

  async create(createTaskBody: CreateTaskPriceDto): Promise<TaskPrice> {
    const createdTaskModel = await this.taskPriceModel.create(createTaskBody);

    return createdTaskModel;
  }

  async findAll(): Promise<TaskPrice[]> {
    return this.taskPriceModel.find();
  }

  async findOne(id: string): Promise<TaskPrice> {
    return this.taskPriceModel.findOne({ id: id }).exec();
  }

  async update(id: string, taskPriceToUpdate: UpdateTaskPriceDto) {
    const taskPriceWithUpdateTime = {
      ...taskPriceToUpdate,
      updatedAt: Date.now(),
    };

    const updated = await this.taskPriceModel.findOneAndUpdate({ id: id }, taskPriceWithUpdateTime).exec();

    return updated;
  }

  async remove(id: string): Promise<TaskPrice> {
    return this.taskPriceModel.remove({ id: id });
  }
}
