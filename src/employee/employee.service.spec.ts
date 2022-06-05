import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import { getModelToken } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

const mockEmployee = (employeeId = randomUUID().toString(), projectHistory = []): Partial<Employee> => ({
  employeeId,
  projectHistory,
});

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockedModel: Model<EmployeeDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getModelToken(Employee.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockEmployee()),
            constructor: jest.fn().mockResolvedValue(mockEmployee()),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    mockedModel = module.get<Model<EmployeeDocument>>(getModelToken(Employee.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockedModel).toBeDefined();
  });

  describe('create', () => {
    it.todo('should create a TaskPrice');

    it.todo('test bad payload');
    it.todo('test returning duplicate values error');
    it.todo('test returning error when dont find projectId');
  });

  describe('findAll', () => {
    it.todo('should get all projects');

    it.todo('should return an empty array when dont have data');
  });

  describe('findOne', () => {
    it.todo('should find one project in DB');

    it.todo('should return an empty object when dont have this specific id');
    it.todo('should find a specific object among many objects');
  });

  describe('update', () => {
    it.todo('should update a model');

    it.todo('should return an error when have a wrong request body');
    it.todo('it shouldnt update a model if ID is not found');
  });

  describe('remove', () => {
    it.todo('should remove one model from DB');

    it.todo('should not delete if ID is not found');
  });
});
