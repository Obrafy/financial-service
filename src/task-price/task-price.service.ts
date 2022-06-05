import { Model } from 'mongoose';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';
import {
  CreateRequest,
  FindResponse,
  UpdateRequest,
  WithObjectResponse,
} from '../common/proto-dto/financial-service/financial-service.pb';
import { makeResponseTaskPrice } from '../common/utils';
import { ProjectServiceClient, PROJECT_SERVICE_NAME } from '../common/proto-dto/project-service/project.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TaskPriceService {
  constructor(
    @InjectModel(TaskPrice.name) private taskPriceModel: Model<TaskPriceDocument>,
    @Inject(PROJECT_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc,
  ) {}

  private projectProjectServiceClient: ProjectServiceClient;

  public onModuleInit(): void {
    this.projectProjectServiceClient = this.grpcClient.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  async create(createTaskBody: CreateRequest): Promise<WithObjectResponse> {
    const statusOfProjectInProjecService = await firstValueFrom(
      this.projectProjectServiceClient.findOne({
        projectId: createTaskBody.taskId,
      }),
    );

    if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Project not Valid.',
        data: null,
      };
    }

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

    if (taskId) {
      const statusOfProjectInProjecService = await firstValueFrom(
        this.projectProjectServiceClient.findOne({
          projectId: taskId,
        }),
      );

      if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
        return {
          status: HttpStatus.BAD_REQUEST,
          error: 'Project not Valid.',
          data: null,
        };
      }
    }

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
