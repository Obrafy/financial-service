import { IsMongoId, IsNumber, ValidateNested } from 'class-validator';
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

class _ProjectPriceDTOObject implements UpdateTaskPriceObject {
  @IsMongoId()
  taskId?: string;

  @IsNumber()
  price?: number;
}
export class UpdateProjectPriceDTO implements UpdateRequest {
  @IsMongoId()
  id: string;

  @ValidateNested()
  data: _ProjectPriceDTOObject;
}
