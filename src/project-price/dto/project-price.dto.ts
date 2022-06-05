import { IsMongoId, IsNumber, ValidateNested } from 'class-validator';
import {
  CreateRequest,
  FindByIdRequest,
  UpdateRequest,
  UpdateProjectPriceObject,
} from '../../common/proto-dto/financial-service/financial-service.pb';

export class CreateProjectPriceDTO implements CreateRequest {
  @IsMongoId()
  projectId: string;

  @IsNumber()
  price: number;
}

export class FindByIdDTO implements FindByIdRequest {
  @IsMongoId()
  id: string;
}

class _ProjectPriceDTOObject implements UpdateProjectPriceObject {
  @IsMongoId()
  projectId?: string;

  @IsNumber()
  price?: number;
}
export class UpdateProjectPriceDTO implements UpdateRequest {
  @IsMongoId()
  id: string;

  @ValidateNested()
  data: _ProjectPriceDTOObject;
}
