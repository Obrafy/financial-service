import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { TaskPriceService } from './task-price.service';
import { GrpcMethod } from '@nestjs/microservices';
import * as PROTO from '../common/proto-dto/financial-service/financial-service.pb';
import { CreateProjectPriceDTO, FindByIdDTO, UpdateProjectPriceDTO } from './dtos/project-price.dto';
import { makeResponseTaskPrice } from 'src/common/utils';

@Controller()
export class TaskPriceController {
  @Inject(TaskPriceService)
  private readonly taskPriceService: TaskPriceService;

  @GrpcMethod(PROTO.TASK_PRICE_SERVICE_NAME, 'create')
  async create(createRequestBody: CreateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const createdObject = await this.taskPriceService.create(createRequestBody);

    return makeResponseTaskPrice(createdObject, HttpStatus.CREATED);
  }

  @GrpcMethod(PROTO.TASK_PRICE_SERVICE_NAME, 'find')
  async findAll(): Promise<PROTO.FindResponse> {
    const allTaskPrices = await this.taskPriceService.findAll();

    return makeResponseTaskPrice(allTaskPrices);
  }

  @GrpcMethod(PROTO.TASK_PRICE_SERVICE_NAME, 'findOne')
  async findOne({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    const requestedProjectPrice = await this.taskPriceService.findOne(id);

    return makeResponseTaskPrice(requestedProjectPrice);
  }

  @GrpcMethod(PROTO.TASK_PRICE_SERVICE_NAME, 'update')
  async update(payload: UpdateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const updatedModel = await this.taskPriceService.update(payload);

    return makeResponseTaskPrice(updatedModel);
  }

  @GrpcMethod(PROTO.TASK_PRICE_SERVICE_NAME, 'delete')
  async remove({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    await this.taskPriceService.remove(id);

    return makeResponseTaskPrice(null, HttpStatus.NO_CONTENT);
  }
}
