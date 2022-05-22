import { Test, TestingModule } from '@nestjs/testing';
import { TaskPrice } from './entities/task-price.entity';
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
    it('should respond all values', async () => {
      const expectedOutput = [
        {
          taskId: 'task-doidonas112',
          price: 2000.123,
          createdAt: new Date('2022-05-21T18:05:00.127Z'),
          updatedAt: new Date(),
        },
        {
          taskId: 'task-doidonas112',
          price: 2000.123,
          createdAt: new Date('2022-05-21T19:06:15.972Z'),
          updatedAt: new Date(),
        },
      ] as TaskPrice[];
      jest.spyOn(mockedService, 'findAll').mockResolvedValue(expectedOutput);

      const expectedResponse = await controller.findAll();

      expect(expectedResponse).toEqual(expectedOutput);
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
