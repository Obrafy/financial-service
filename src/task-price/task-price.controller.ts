import { Controller, Inject } from '@nestjs/common';
import { TaskPriceService } from './task-price.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest,
  DeleteResponse,
  FindByIdRequest,
  FindResponse,
  TASK_PRICE_SERVICE_NAME,
  UpdateRequest,
  WithObjectResponse,
} from './dto/proto/financial-service/task-price.pb';

@Controller()
export class TaskPriceController {
  @Inject(TaskPriceService)
  private readonly taskPriceService: TaskPriceService;

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'create')
  async create(createRequestBody: CreateRequest): Promise<WithObjectResponse> {
    const response = await this.taskPriceService.create(createRequestBody);

    return response;
  }

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'find')
  async findAll(): Promise<FindResponse> {
    return this.taskPriceService.findAll();
  }

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'findOne')
  async findOne({ id }: FindByIdRequest): Promise<WithObjectResponse> {
    return this.taskPriceService.findOne(id);
  }

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'update')
  async update(payload: UpdateRequest): Promise<WithObjectResponse> {
    return this.taskPriceService.update(payload);
  }

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'delete')
  async remove({ id }: FindByIdRequest): Promise<DeleteResponse> {
    return this.taskPriceService.remove(id);
  }
}
