import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { GrpcMethod } from '@nestjs/microservices';
import * as PROTO from '../common/proto-dto/financial-service/financial-service.pb';
import { CreateEmployeeDTO, FindEmployeeByIdDTO, UpdateEmployeeDTO } from './dto/employee.dto';
import { makeResponse } from 'src/common/helpers/make-response';

@Controller()
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @GrpcMethod(PROTO.EMPLOYEE_SERVICE_NAME, 'Create')
  async create(createRequestBody: CreateEmployeeDTO): Promise<PROTO.pResponseWithObject> {
    const createdEmployeeHistory = await this.employeeService.create(createRequestBody);

    return makeResponse(createdEmployeeHistory, {
      httpStatus: HttpStatus.CREATED,
    });
  }

  @GrpcMethod(PROTO.EMPLOYEE_SERVICE_NAME, 'Find')
  async findAll(): Promise<PROTO.pResponseArrayObject> {
    const allEmployees = await this.employeeService.findAll();

    return makeResponse(allEmployees);
  }

  @GrpcMethod(PROTO.EMPLOYEE_SERVICE_NAME, 'FindOne')
  async findOne({ id }: FindEmployeeByIdDTO): Promise<PROTO.pResponseWithObject> {
    const requestedEmployee = await this.employeeService.findOne(id);

    return makeResponse(requestedEmployee);
  }

  @GrpcMethod(PROTO.EMPLOYEE_SERVICE_NAME, 'Update')
  async update(payload: UpdateEmployeeDTO): Promise<PROTO.pResponseWithObject> {
    const updatedEmployee = await this.employeeService.update(payload);

    return makeResponse(updatedEmployee);
  }

  @GrpcMethod(PROTO.EMPLOYEE_SERVICE_NAME, 'Delete')
  async remove({ id }: FindEmployeeByIdDTO): Promise<PROTO.pResponseWithObject> {
    await this.employeeService.remove(id);

    return makeResponse(null, {
      httpStatus: HttpStatus.NO_CONTENT,
    });
  }
}
