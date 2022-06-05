import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
  async create({ projectId, price }: CreateProjectPriceDTO): Promise<ProjectPriceDocument> {
    const statusOfProjectInProjecService = await firstValueFrom(
      this.projectProjectServiceClient.findOne({
        projectId: projectId,
      }),
    );

    if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
      throw new BadRequestException('This projectId does not exists.');
    }

    const createdProjectModel = await this.projectPriceModel.create({ projectId, price });

    return createdProjectModel;
  }

  /**
   * Return all records created from a valid ProjectId with their prices
   * @returns Array of ProjectPrice
   */
  async findAll(): Promise<ProjectPriceDocument[]> {
    const allProjectPrices = await this.projectPriceModel.find();

    return allProjectPrices;
  }

  /**
   * Looks for a specific ProjectPrice model with one passed ID
   * @param id a valid ProjectPrice
   * @returns Specific ProjectPrice model
   */
  async findOne(id: string): Promise<ProjectPriceDocument> {
    const requestedModel = await this.projectPriceModel.findOne({ _id: id });

    return requestedModel;
  }

  /**
   * Update a specific ProjectPrice model
   * @param param0 expects an valid ID for a ProjectPrice, and its data to be updated
   * @returns The new Updated Model
   */
  async update({ id, data }: UpdateProjectPriceDTO): Promise<ProjectPriceDocument> {
    const projectPriceWithUpdateTime = {
      price: data.price,
      projectId: data.projectId,
      updatedAt: Date.now(),
    };

    if (data.projectId) {
      const statusOfProjectInProjecService = await firstValueFrom(
        this.projectProjectServiceClient.findOne({
          projectId: data.projectId,
        }),
      );

      if (statusOfProjectInProjecService.status !== HttpStatus.OK) {
        throw new BadRequestException('This projectId does not exists.');
      }
    }

    const foundModel = await this.projectPriceModel.findOneAndUpdate({ _id: id }, projectPriceWithUpdateTime);
    if (!foundModel) {
      throw new NotFoundException(`The ${id} is invalid`);
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
    const { deletedCount } = await this.projectPriceModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException('It is not a valid record ID.');
    }
  }
}
