import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import {
  UserManagementServiceClient,
  USER_MANAGEMENT_SERVICE_NAME,
} from 'src/common/proto-dto/authentication-service/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TaskPriceService } from 'src/task-price/task-price.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @Inject(USER_MANAGEMENT_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc,
    private projectPriceService: TaskPriceService,
  ) {}

  private userServiceGrpcClient: UserManagementServiceClient;

  /**
   * Is needed to load the gRPC client with the specific ServiceCLient loaded from a proto file
   */
  public onModuleInit(): void {
    this.userServiceGrpcClient = this.grpcClient.getService<UserManagementServiceClient>(USER_MANAGEMENT_SERVICE_NAME);
  }

  /**
   *
   * @param employeeToCreate
   * @returns
   */
  async create(employeeToCreate: CreateEmployeeDTO): Promise<EmployeeDocument> {
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

      if (result.errors !== null) {
        return false;
      }

      return true;
    });

    const isValidProjectResolved = await Promise.all(isValidProjectPricePromise);

    if (isValidProjectResolved.includes(false)) {
      throw new BadRequestException('Any projectId does not exists.');
    }

    const createdEmployee = await this.employeeModel.create(employeeToCreate);

    return createdEmployee;
  }

  /**
   * Look for all Employees History in DB
   * @returns An array of valid Employees with their projectHistory
   */
  async findAll(): Promise<EmployeeDocument[]> {
    const allEmployees = await this.employeeModel.find().populate({ path: 'projectHistory' });

    return allEmployees;
  }

  /**
   * Look for a specific Employee in DB
   * @param id Valid ID of a Specific Employee
   * @returns The Model of Employee
   */
  async findOne(id: string): Promise<EmployeeDocument> {
    const searchedEmployee = await this.employeeModel.findOne({ _id: id }).populate({ path: 'projectHistory' });

    return searchedEmployee;
  }

  /**
   * Update a specific Employee with new data
   * @param param0
   * @returns The Model of the updated Employee
   */
  async update({ id, data: { projectHistory, employeeId } }: UpdateEmployeeDTO): Promise<EmployeeDocument> {
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

      if (result.errors !== null) {
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

    return updatedModel;
  }

  /**
   * Delete a specific Employee Project History
   * @param id Valid ID of a Specific Employee
   * @returns Nothing
   */
  async remove(id: string): Promise<void> {
    const { deletedCount } = await this.employeeModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException('It is not a valid record ID.');
    }
  }
}
