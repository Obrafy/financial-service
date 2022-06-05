import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import {
  UserManagementServiceClient,
  USER_MANAGEMENT_SERVICE_NAME,
} from 'src/common/proto-dto/authentication-service/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProjectPriceService } from 'src/project-price/project-price.service';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @Inject(USER_MANAGEMENT_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc,
    private projectPriceService: ProjectPriceService,
  ) {}

  private readonly logger = new Logger(EmployeeService.name);
  private userServiceGrpcClient: UserManagementServiceClient;

  /**
   * Is needed to load the gRPC client with the specific ServiceCLient loaded from a proto file
   */
  public onModuleInit(): void {
    this.userServiceGrpcClient = this.grpcClient.getService<UserManagementServiceClient>(USER_MANAGEMENT_SERVICE_NAME);
    this.logger.log('gRPC UserService Client Initialized');
  }

  /**
   * Receive an EmployeeId to call UserService to see if it exists,
   * if it's not a valid ID, throw an exception
   * @param employeeId
   */
  private async _validateEmployeeIdOrException(employeeId: string): Promise<void> {
    this.logger.debug('Trying to validate EmployeeId');
    const requestedEmployeeIdObj = await firstValueFrom(
      this.userServiceGrpcClient.findUserById({
        userId: employeeId,
      }),
    );

    this.logger.debug('Returned response from UserService', requestedEmployeeIdObj);
    if (requestedEmployeeIdObj.status !== HttpStatus.OK) {
      throw new BadRequestException('This employeeId does not exists.');
    }
  }

  /**
   * Receive an array of ProjectPrice ID and call its service to valid them.
   * @param projectHistoryIDs An array of ProjectPrice IDs
   */
  private async _validateProjectHistoryIDsOrException(projectHistoryIDs: string[]): Promise<void> {
    this.logger.debug('Trying to validate all ProjectHistory used');
    projectHistoryIDs.map(async (projectId) => {
      const result = await this.projectPriceService.findOne(projectId);

      if (!result) {
        throw new BadRequestException(`The projectId of value ${projectId} is not valid`);
      }
    });
  }

  /**
   * Receives an employeeId and a worked projectHistory to store the worker payment history
   * @param employeeToCreate
   * @returns
   */
  async create({ employeeId, projectHistory }: CreateEmployeeDTO): Promise<EmployeeDocument> {
    this.logger.log('Create', employeeId, projectHistory);

    Promise.all([
      await this._validateEmployeeIdOrException(employeeId),
      await this._validateProjectHistoryIDsOrException(projectHistory),
    ]);

    const createdEmployee = await this.employeeModel.create({ employeeId, projectHistory });

    return createdEmployee;
  }

  /**
   * Look for all Employees History in DB
   * @returns An array of valid Employees with their projectHistory
   */
  async findAll(): Promise<EmployeeDocument[]> {
    this.logger.log('findAll');
    const allEmployees = await this.employeeModel.find().populate({ path: 'projectHistory' });

    return allEmployees;
  }

  /**
   * Look for a specific Employee in DB
   * @param id Valid ID of a Specific Employee
   * @returns The Model of Employee
   */
  async findOne(id: string): Promise<EmployeeDocument> {
    this.logger.log('findOne', id);
    const searchedEmployee = await this.employeeModel.findOne({ _id: id }).populate({ path: 'projectHistory' });

    if (!searchedEmployee) {
      throw new NotFoundException(`The ${id} is not a valid one.`);
    }

    return searchedEmployee;
  }

  /**
   * Update a specific Employee with new data
   * @param param0
   * @returns The Model of the updated Employee
   */
  async update({ id, data: { projectHistory, employeeId } }: UpdateEmployeeDTO): Promise<EmployeeDocument> {
    this.logger.log('update', id, projectHistory, employeeId);
    const employeeToUpdate = {
      employeeId,
      projectHistory,
      updatedAt: Date.now(),
    };

    Promise.all([
      await this._validateEmployeeIdOrException(employeeId),
      await this._validateProjectHistoryIDsOrException(projectHistory),
    ]);

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
    this.logger.log('remove', id);
    const { deletedCount } = await this.employeeModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException('It is not a valid record ID.');
    }
  }
}
