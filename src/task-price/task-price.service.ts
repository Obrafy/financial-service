import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Is needed to load the gRPC client with the specific ServiceCLient loaded from a proto file
   */
  public onModuleInit(): void {
    this.projectProjectServiceClient = this.grpcClient.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
  }

  /**
   * Create a new ProjectPrice in DB
   * @param param0 Expects an object with projecId from a valid project and its price
   * @returns The ProjectPrice object
   */
  async create({ taskId, price }: CreateRequest): Promise<WithObjectResponse> {
    const statusOfProjectInProjecService = await firstValueFrom(
      this.projectProjectServiceClient.findOne({
        projectId: taskId,
      }),
    );

    if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
      throw new BadRequestException('This projectId does not exists.');
    }

    const createdTaskModel = await this.taskPriceModel.create({ taskId, price });

    return makeResponseTaskPrice(createdTaskModel);
  }

  /**
   * Return all records created from a valid ProjectId with their prices
   * @returns Array of ProjectPrice
   */
  async findAll(): Promise<FindResponse> {
    const allTaskPrices = await this.taskPriceModel.find();

    return makeResponseTaskPrice(allTaskPrices);
  }

  /**
   * Looks for a specific ProjectPrice model with one passed ID
   * @param id a valid ProjectPrice
   * @returns Specific ProjectPrice model
   */
  async findOne(id: string): Promise<WithObjectResponse> {
    const requestedModel = await this.taskPriceModel.findOne({ _id: id });

    return makeResponseTaskPrice(requestedModel);
  }

  /**
   * Update a specific ProjectPrice model
   * @param param0 expects an valid ID for a ProjectPrice, and its data to be updated
   * @returns The new Updated Model
   */
  async update({ id, data }: UpdateRequest) {
    const taskPriceWithUpdateTime = {
      price: data.price,
      taskId: data.taskId,
      updatedAt: Date.now(),
    };

    if (data.taskId) {
      const statusOfProjectInProjecService = await firstValueFrom(
        this.projectProjectServiceClient.findOne({
          projectId: data.taskId,
        }),
      );

      if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
        if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
          throw new BadRequestException('This projectId does not exists.');
        }
      }
    }

    const foundModel = await this.taskPriceModel.findOneAndUpdate({ _id: id }, taskPriceWithUpdateTime);
    if (!foundModel) {
      throw new NotFoundException(`The ${id} is invalid`);
    }

    const updated = await this.taskPriceModel.findOne({ _id: id });

    return makeResponseTaskPrice(updated);
  }

  /**
   * Delete a specific ProjectPrice
   * @param id An valid ProjectPrice ID
   * @returns Nothing
   */
  async remove(id: string): Promise<WithObjectResponse> {
    const { deletedCount } = await this.taskPriceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException('It is not a valid record ID.');
    }

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
      data: null,
    };
  }
}
