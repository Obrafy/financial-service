import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';
import {
  CreateRequest,
  FindResponse,
  UpdateRequest,
  WithObjectResponse,
} from './dto/proto/financial-service/task-price.pb';
import { makeResponseTaskPrice } from '../common/utils';

@Injectable()
export class TaskPriceService {
  constructor(@InjectModel(TaskPrice.name) private taskPriceModel: Model<TaskPriceDocument>) {}

  async create(createTaskBody: CreateRequest): Promise<WithObjectResponse> {
    const createdTaskModel = await this.taskPriceModel.create(createTaskBody);

    return makeResponseTaskPrice(createdTaskModel);
  }

  async findAll(): Promise<FindResponse> {
    const allTaskPrices = await this.taskPriceModel.find();

    return makeResponseTaskPrice(allTaskPrices);
  }

  async findOne(id: string): Promise<WithObjectResponse> {
    const requestedModel = await this.taskPriceModel.findOne({ _id: id });

    return makeResponseTaskPrice(requestedModel);
  }

  async update({ id, price, taskId }: UpdateRequest) {
    const taskPriceWithUpdateTime = {
      price,
      taskId,
      updatedAt: Date.now(),
    };

    await this.taskPriceModel.findOneAndUpdate({ _id: id }, taskPriceWithUpdateTime);
    const updated = await this.taskPriceModel.findOne({ _id: id });

    return makeResponseTaskPrice(updated);
  }

  async remove(id: string): Promise<WithObjectResponse> {
    const { deletedCount } = await this.taskPriceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: "Can't find a record",
        data: null,
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
      data: null,
    };
  }
}
