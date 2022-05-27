import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';
import {
  CreateRequest,
  DeleteResponse,
  FindResponse,
  UpdateRequest,
  WithObjectResponse,
} from './dto/proto/financial-service/task-price.pb';
import { makeResponse } from '../common/utils';

@Injectable()
export class TaskPriceService {
  constructor(@InjectModel(TaskPrice.name) private taskPriceModel: Model<TaskPriceDocument>) {}

  async create(createTaskBody: CreateRequest): Promise<WithObjectResponse> {
    const createdTaskModel = await this.taskPriceModel.create(createTaskBody);

    return makeResponse(createdTaskModel);
  }

  async findAll(): Promise<FindResponse> {
    const allTaskPrices = await this.taskPriceModel.find();

    return makeResponse(allTaskPrices);
  }

  async findOne(id: string): Promise<WithObjectResponse> {
    const requestedModel = await this.taskPriceModel.findOne({ _id: id });

    return makeResponse(requestedModel);
  }

  async update({ id, price, taskId }: UpdateRequest) {
    const taskPriceWithUpdateTime = {
      price,
      taskId,
      updatedAt: Date.now(),
    };

    await this.taskPriceModel.findOneAndUpdate({ _id: id }, taskPriceWithUpdateTime).exec();
    const updated = await this.taskPriceModel.findOne({ _id: id });

    return makeResponse(updated);
  }

  async remove(id: string): Promise<DeleteResponse> {
    const { deletedCount } = await this.taskPriceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: null,
        isDeleted: false,
      };
    }

    return {
      status: HttpStatus.OK,
      error: null,
      isDeleted: true,
    };
  }
}
