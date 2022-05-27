import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(employeeToCreate: CreateEmployeeDto): Promise<EmployeeDocument> {
    const createdEmployee = await this.employeeModel.create(employeeToCreate);

    return createdEmployee;
  }

  async findAll(): Promise<EmployeeDocument[]> {
    const allEmployees = await this.employeeModel.find().populate({ path: 'projectHistory' });

    return allEmployees;
  }

  async findOne(id: string): Promise<EmployeeDocument> {
    const searchedEmployee = await this.employeeModel.findOne({ _id: id }).populate({ path: 'projectHistory' }).exec();

    return searchedEmployee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeDocument> {
    await this.employeeModel.findOneAndUpdate({ _id: id }, updateEmployeeDto).exec();

    const updatedModel = await this.employeeModel.findOne({ _id: id }).exec();

    return updatedModel;
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.employeeModel.deleteOne({ _id: id });

    if (deletedCount == 0) {
      return false;
    }

    return true;
  }
}
