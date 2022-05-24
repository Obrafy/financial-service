import { Test, TestingModule } from '@nestjs/testing';
import { TaskPriceController } from './task-price.controller';
import { TaskPriceService } from './task-price.service';

describe('TaskPriceController', () => {
  let controller: TaskPriceController;
  let mockedService: TaskPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskPriceController],
      providers: [
        {
          provide: TaskPriceService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskPriceController>(TaskPriceController);
    mockedService = module.get<TaskPriceService>(TaskPriceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockedService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it.todo('should return a created model');
    it.todo('should return an error if receive a bad payload');
    it.todo('should return a 404 if taskId is not found');
  });

  describe('findAll', () => {
    it.todo('should respond all values');

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
