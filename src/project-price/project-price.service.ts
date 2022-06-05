import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectPrice, ProjectPriceDocument } from './entities/project-price.entity';
import { ProjectServiceClient, PROJECT_SERVICE_NAME } from '../common/proto-dto/project-service/project.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateProjectPriceDTO, UpdateProjectPriceDTO } from '../project-price/dto/project-price.dto';

@Injectable()
export class ProjectPriceService {
  constructor(
    @InjectModel(ProjectPrice.name) private projectPriceModel: Model<ProjectPriceDocument>,
    @Inject(PROJECT_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc,
  ) {}

  private projectProjectServiceClient: ProjectServiceClient;
  private readonly logger = new Logger(ProjectPriceService.name);

  /**
   * Is needed to load the gRPC client with the specific ServiceCLient loaded from a proto file
   */
  public onModuleInit(): void {
    this.projectProjectServiceClient = this.grpcClient.getService<ProjectServiceClient>(PROJECT_SERVICE_NAME);
    this.logger.log('gRPC ProjectService Client Initialized');
  }

  /**
   * Receive a projectId to call ProjectService to see if it exists,
   * if it's not a valid ID, throw an exception
   * @param projectId
   */
  private async _validateProjectIdOrException(projectId: string): Promise<void> {
    this.logger.debug('Trying to validate projectId');
    const requestedObjectFromProjectService = await firstValueFrom(
      this.projectProjectServiceClient.findOne({
        projectId: projectId,
      }),
    );

    this.logger.debug('Response From PS client', requestedObjectFromProjectService);
    if (requestedObjectFromProjectService.status !== HttpStatus.OK) {
      throw new BadRequestException('This projectId does not exists.');
    }
  }

  /**
   * Create a new ProjectPrice in DB
   * @param param0 Expects an object with projecId from a valid project and its price
   * @returns The ProjectPrice object
   */
  async create({ projectId, price }: CreateProjectPriceDTO): Promise<ProjectPriceDocument> {
    this.logger.log('Create', projectId, price);

    await this._validateProjectIdOrException(projectId);

    const createdProjectModel = await this.projectPriceModel.create({ projectId, price });

    return createdProjectModel;
  }

  /**
   * Return all records created from a valid ProjectId with their prices
   * @returns Array of ProjectPrice
   */
  async findAll(): Promise<ProjectPriceDocument[]> {
    this.logger.log('findAll');
    const allProjectPrices = await this.projectPriceModel.find();

    return allProjectPrices;
  }

  /**
   * Looks for a specific ProjectPrice model with one passed ID
   * @param id a valid ProjectPrice
   * @returns Specific ProjectPrice model
   */
  async findOne(id: string): Promise<ProjectPriceDocument> {
    this.logger.log('findOne', id);
    const requestedModel = await this.projectPriceModel.findOne({ _id: id });

    if (!requestedModel) {
      throw new NotFoundException(`Can't find a record valid for ${id}`);
    }

    return requestedModel;
  }

  /**
   * Update a specific ProjectPrice model
   * @param param0 expects an valid ID for a ProjectPrice, and its data to be updated
   * @returns The new Updated Model
   */
  async update({ id, data }: UpdateProjectPriceDTO): Promise<ProjectPriceDocument> {
    this.logger.log('update', id, data);
    const projectPriceWithUpdateTime = {
      price: data.price,
      projectId: data.projectId,
      updatedAt: Date.now(),
    };

    if (data.projectId) {
      await this._validateProjectIdOrException(data.projectId);
    }

    const foundModel = await this.projectPriceModel.findOneAndUpdate({ _id: id }, projectPriceWithUpdateTime);
    if (!foundModel) {
      throw new NotFoundException(`The ${id} is not a valid one.`);
    }

    const updated = await this.projectPriceModel.findOne({ _id: id });

    return updated;
  }

  /**
   * Delete a specific ProjectPrice
   * @param id An valid ProjectPrice ID
   * @returns Nothing
   */
  async remove(id: string): Promise<void> {
    this.logger.log('remove', id);
    const { deletedCount } = await this.projectPriceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException(`The ${id} is not a valid one.`);
    }
  }
}
