import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import {
  pCreateRequest,
  pResponseArrayObject,
  pResponseWithObject,
  pUpdateRequest,
} from '../common/proto-dto/financial-service/financial-service.pb';
import { makeResponseEmployee } from '../common/utils';
import {
  UserManagementServiceClient,
  USER_MANAGEMENT_SERVICE_NAME,
} from 'src/common/proto-dto/authentication-service/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TaskPriceService } from 'src/task-price/task-price.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @Inject(USER_MANAGEMENT_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc,
    private projectPriceService: TaskPriceService,
  ) {}

  private userServiceGrpcClient: UserManagementServiceClient;

  public onModuleInit(): void {
    this.userServiceGrpcClient = this.grpcClient.getService<UserManagementServiceClient>(USER_MANAGEMENT_SERVICE_NAME);
  }

  async create(employeeToCreate: pCreateRequest): Promise<pResponseWithObject> {
    // Search for a valid user:
    const statusOfUserInUserService = await firstValueFrom(
      this.userServiceGrpcClient.findUserById({
        userId: employeeToCreate.employeeId,
      }),
    );

    if (statusOfUserInUserService.status !== HttpStatus.OK) {
      throw new BadRequestException('This employeeId does not exists.');
    }

    //Search for a valid project-price:
    const isValidProjectPricePromise = employeeToCreate.projectHistory.map(async (project) => {
      const result = await this.projectPriceService.findOne(project);

      if (result.error !== null) {
        return false;
      }

      return true;
    });

    const isValidProjectResolved = await Promise.all(isValidProjectPricePromise);

    if (isValidProjectResolved.includes(false)) {
      throw new BadRequestException('Any projectId does not exists.');
    }

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

  async update({ id, data: { projectHistory, employeeId } }: pUpdateRequest): Promise<pResponseWithObject> {
    const employeeToUpdate = {
      employeeId,
      projectHistory,
      updatedAt: Date.now(),
    };

    const statusOfUserInUserService = await firstValueFrom(
      this.userServiceGrpcClient.findUserById({
        userId: employeeId,
      }),
    );

    if (statusOfUserInUserService.status !== HttpStatus.OK) {
      throw new BadRequestException('This employeeId does not exists.');
    }

    //Search for a valid project-price:
    const isValidProjectPricePromise = projectHistory.map(async (project) => {
      const result = await this.projectPriceService.findOne(project);

      if (result.error !== null) {
        return false;
      }

      return true;
    });

    const isValidProjectResolved = await Promise.all(isValidProjectPricePromise);

    if (isValidProjectResolved.includes(false)) {
      throw new BadRequestException('Any projectId does not exists.');
    }

    await this.employeeModel.findOneAndUpdate({ _id: id }, employeeToUpdate);
    const updatedModel = await this.employeeModel.findOne({ _id: id });

    return makeResponseEmployee(updatedModel);
  }

  async remove(id: string): Promise<pResponseWithObject> {
    const { deletedCount } = await this.employeeModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException('It is not a valid record ID.');
    }

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
      data: null,
    };
  }
}
