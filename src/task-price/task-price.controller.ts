import { Controller, Inject } from '@nestjs/common';
import { TaskPriceService } from './task-price.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateRequest,
  FindByIdRequest,
  FindResponse,
  TASK_PRICE_SERVICE_NAME,
  UpdateRequest,
  WithObjectResponse,
} from 'src/common/proto-dto/financial-service/financial-service.pb';

@Controller()
export class TaskPriceController {
  @Inject(TaskPriceService)
  private readonly taskPriceService: TaskPriceService;

  @GrpcMethod(TASK_PRICE_SERVICE_NAME, 'create')
  async create(createRequestBody: CreateRequest): Promise<WithObjectResponse> {
    return this.taskPriceService.create(createRequestBody);
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
  async remove({ id }: FindByIdRequest): Promise<WithObjectResponse> {
    return this.taskPriceService.remove(id);
  }
}
