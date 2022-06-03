import { Controller, Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  EMPLOYEE_SERVICE_NAME,
  pCreateRequest,
  pFindByIdRequest,
  pUpdateRequest,
} from 'src/task-price/dto/proto/financial-service/financial-service.pb';

@Controller()
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @GrpcMethod(EMPLOYEE_SERVICE_NAME, 'Create')
  async create(createRequestBody: pCreateRequest) {
    return this.employeeService.create(createRequestBody);
  }

  @GrpcMethod(EMPLOYEE_SERVICE_NAME, 'Find')
  async findAll() {
    return this.employeeService.findAll();
  }

  @GrpcMethod(EMPLOYEE_SERVICE_NAME, 'FindOne')
  async findOne({ id }: pFindByIdRequest) {
    return this.employeeService.findOne(id);
  }

  @GrpcMethod(EMPLOYEE_SERVICE_NAME, 'Update')
  async update(payload: pUpdateRequest) {
    return this.employeeService.update(payload);
  }

  @GrpcMethod(EMPLOYEE_SERVICE_NAME, 'Delete')
  async remove({ id }: pFindByIdRequest) {
    return this.employeeService.remove(id);
  }
}
