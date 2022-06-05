import { IsMongoId } from 'class-validator';
import {
  pCreateRequest,
  pFindByIdRequest,
  pUpdateRequest,
  UpdateEmployeeData,
} from '../../common/proto-dto/financial-service/financial-service.pb';

export class CreateEmployeeDTO implements pCreateRequest {
  @IsMongoId()
  employeeId: string;

  @IsMongoId({ each: true })
  projectHistory: string[];
}

export class FindEmployeeByIdDTO implements pFindByIdRequest {
  @IsMongoId()
  id: string;
}

export class UpdateEmployeeDTO implements pUpdateRequest {
  id: string;
  data: _UpdatedEmployeeData;
}

class _UpdatedEmployeeData implements UpdateEmployeeData {
  @IsMongoId()
  employeeId?: string;

  @IsMongoId({ each: true })
  projectHistory: string[];
}
