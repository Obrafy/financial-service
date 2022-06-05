import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ProjectPriceService } from './project-price.service';
import { GrpcMethod } from '@nestjs/microservices';
import * as PROTO from '../common/proto-dto/financial-service/financial-service.pb';
import { CreateProjectPriceDTO, FindByIdDTO, UpdateProjectPriceDTO } from '../project-price/dto/project-price.dto';
import { makeResponseProjectPrice } from 'src/common/utils';

@Controller()
export class ProjectPriceController {
  @Inject(ProjectPriceService)
  private readonly projectPriceService: ProjectPriceService;

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'create')
  async create(createRequestBody: CreateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const createdObject = await this.projectPriceService.create(createRequestBody);

    return makeResponseProjectPrice(createdObject, HttpStatus.CREATED);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'find')
  async findAll(): Promise<PROTO.FindResponse> {
    const allProjectPrices = await this.projectPriceService.findAll();

    return makeResponseProjectPrice(allProjectPrices);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'findOne')
  async findOne({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    const requestedProjectPrice = await this.projectPriceService.findOne(id);

    return makeResponseProjectPrice(requestedProjectPrice);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'update')
  async update(payload: UpdateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const updatedModel = await this.projectPriceService.update(payload);

    return makeResponseProjectPrice(updatedModel);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'delete')
  async remove({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    await this.projectPriceService.remove(id);

    return makeResponseProjectPrice(null, HttpStatus.NO_CONTENT);
  }
}
