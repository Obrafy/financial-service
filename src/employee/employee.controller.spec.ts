import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeDocument } from './entities/employee.entity';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let mockedService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    mockedService = module.get<EmployeeService>(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });

  describe('create', () => {
    it.todo('should return a created model');
    it.todo('should return an error if receive a bad payload');
    it.todo('should return a 404 if projectId is not found');
  });

  describe('findAll', () => {
    it('should respond all values', async () => {
      // const expectedOutput = [] as EmployeeDocument[];
      // jest.spyOn(mockedService, 'findAll').mockResolvedValue(expectedOutput);
      // const expectedResponse = await controller.findAll();
      // expect(expectedResponse).toEqual(expectedOutput);
    });

    it.todo('should return an empty array if dont have any data');
  });

  describe('findOne', () => {
    it.todo('should return a single record');
    it.todo('should return an empty object');
  });

  describe('update', () => {
    it.todo('return updated object');
  });

  describe('remove', () => {
    it.todo('should remove a single record');
  });
});
