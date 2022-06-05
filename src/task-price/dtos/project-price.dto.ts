import { IsMongoId, IsNumber } from 'class-validator';
import {
  CreateRequest,
  FindByIdRequest,
  UpdateRequest,
  UpdateTaskPriceObject,
} from '../../common/proto-dto/financial-service/financial-service.pb';

export class CreateProjectPriceDTO implements CreateRequest {
  @IsMongoId()
  taskId: string;

  @IsNumber()
  price: number;
}

export class FindByIdDTO implements FindByIdRequest {
  @IsMongoId()
  id: string;
}

export class UpdateProjectPriceDTO implements UpdateRequest {
  @IsMongoId()
  id: string;
  data: _ProjectPriceDTOObject;
}

class _ProjectPriceDTOObject implements UpdateTaskPriceObject {
  @IsMongoId()
  taskId?: string;

  @IsNumber()
  price?: number;
}
