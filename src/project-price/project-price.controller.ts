import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ProjectPriceService } from './project-price.service';
import { GrpcMethod } from '@nestjs/microservices';
import * as PROTO from '../common/proto-dto/financial-service/financial-service.pb';
import { CreateProjectPriceDTO, FindByIdDTO, UpdateProjectPriceDTO } from '../project-price/dto/project-price.dto';
import { makeResponse } from 'src/common/helpers/make-response';

@Controller()
export class ProjectPriceController {
  @Inject(ProjectPriceService)
  private readonly projectPriceService: ProjectPriceService;

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'create')
  async create(createRequestBody: CreateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const createdObject = await this.projectPriceService.create(createRequestBody);

    return makeResponse(createdObject, {
      httpStatus: HttpStatus.CREATED,
    });
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'find')
  async findAll(): Promise<PROTO.FindResponse> {
    const allProjectPrices = await this.projectPriceService.findAll();

    return makeResponse(allProjectPrices);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'findOne')
  async findOne({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    const requestedProjectPrice = await this.projectPriceService.findOne(id);

    return makeResponse(requestedProjectPrice);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'update')
  async update(payload: UpdateProjectPriceDTO): Promise<PROTO.WithObjectResponse> {
    const updatedModel = await this.projectPriceService.update(payload);

    return makeResponse(updatedModel);
  }

  @GrpcMethod(PROTO.PROJECT_PRICE_SERVICE_NAME, 'delete')
  async remove({ id }: FindByIdDTO): Promise<PROTO.WithObjectResponse> {
    await this.projectPriceService.remove(id);

    return makeResponse(null, {
      httpStatus: HttpStatus.NO_CONTENT,
    });
  }
}
