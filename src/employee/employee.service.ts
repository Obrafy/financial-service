import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import {
  pCreateRequest,
  pResponseArrayObject,
  pResponseWithObject,
  pUpdateRequest,
} from '../common/proto-dto/financial-service/financial-service.pb';
import { makeResponseEmployee } from '../common/utils';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(employeeToCreate: pCreateRequest): Promise<pResponseWithObject> {
    const createdEmployee = await this.employeeModel.create(employeeToCreate);

    return makeResponseEmployee(createdEmployee);
  }

  async findAll(): Promise<pResponseArrayObject> {
    const allEmployees = await this.employeeModel.find().populate({ path: 'projectHistory' });

    return makeResponseEmployee(allEmployees);
  }

  async findOne(id: string): Promise<pResponseWithObject> {
    const searchedEmployee = await this.employeeModel.findOne({ _id: id }).populate({ path: 'projectHistory' });

    return makeResponseEmployee(searchedEmployee);
  }

  async update({ id, employeeId, projectHistory }: pUpdateRequest): Promise<pResponseWithObject> {
    const employeeToUpdate = {
      employeeId,
      projectHistory,
      updatedAt: Date.now(),
    };

    await this.employeeModel.findOneAndUpdate({ _id: id }, employeeToUpdate);
    const updatedModel = await this.employeeModel.findOne({ _id: id });

    return makeResponseEmployee(updatedModel);
  }

  async remove(id: string): Promise<pResponseWithObject> {
    const { deletedCount } = await this.employeeModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: "Can't find a record",
        data: null,
      };
    }

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
      data: null,
    };
  }
}
