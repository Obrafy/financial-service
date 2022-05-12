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
    const createdTaskModel = new this.taskPriceModel(createTaskBody);

    await createdTaskModel.save();

    return createdTaskModel;
  }

  async findAll(): Promise<TaskPrice[]> {
    return this.taskPriceModel.find();
  }

  async findOne(id: number): Promise<TaskPrice> {
    return this.taskPriceModel.findOne({ id: id });
  }

  async update(id: number, taskPriceToUpdate: UpdateTaskPriceDto) {
    const taskPriceWithUpdateTime = {
      ...taskPriceToUpdate,
      updated_at: Date.now(),
    };

    return await this.taskPriceModel.updateOne({ id: id }, taskPriceWithUpdateTime);
  }

  async remove(id: number): Promise<TaskPrice> {
    return this.taskPriceModel.remove({ id: id });
  }
}
