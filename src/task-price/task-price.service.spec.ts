import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { TaskPriceService } from './task-price.service';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';
import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { status } from '@grpc/grpc-js';
import { makeResponse } from '../common/utils';

export const mockTaskPrice = (taskId = randomUUID(), price = 3500): Partial<TaskPrice> => ({
  taskId: taskId,
  price: price,
  createdAt: new Date(),
});

describe('TaskPriceService', () => {
  let mockedTaskPriceService: TaskPriceService;
  let mockedTaskPriceModel: Model<TaskPriceDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskPriceService,
        {
          provide: getModelToken(TaskPrice.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTaskPrice()),
            constructor: jest.fn().mockResolvedValue(mockTaskPrice()),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            deleteOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    mockedTaskPriceService = module.get<TaskPriceService>(TaskPriceService);
    mockedTaskPriceModel = module.get<Model<TaskPriceDocument>>(getModelToken(TaskPrice.name));
  });

  it('should be defined', () => {
    expect(mockedTaskPriceService).toBeDefined();
    expect(mockedTaskPriceModel).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a TaskPrice', async () => {
      const expectedOutput = {
        taskId: 'Test',
        price: 3500,
      };
      const createdDate = new Date();

      const spyCreateModel = jest.spyOn(mockedTaskPriceModel, 'create').mockImplementationOnce(() => {
        return Promise.resolve({ ...expectedOutput, createdAt: createdDate });
      });

      const output = await mockedTaskPriceService.create(expectedOutput);

      expect(spyCreateModel).toBeCalled();
      expect(spyCreateModel).toBeCalledWith(expectedOutput);
      expect(output).toEqual(makeResponse({ ...expectedOutput, createdAt: createdDate }));
    });

    it.todo('test bad payload');
    it.todo('test returning duplicate values error');
    it.todo('test returning error when dont find taskId');
  });

  describe('findAll', () => {
    it('should get all tasks', async () => {
      const expectedOutput = [mockTaskPrice(), mockTaskPrice()];

      const spyFindModel = jest.spyOn(mockedTaskPriceModel, 'find').mockResolvedValueOnce(expectedOutput);

      const output = await mockedTaskPriceService.findAll();

      expect(spyFindModel).toBeCalled();
      expect(output).toEqual(makeResponse(expectedOutput));
    });

    it.todo('should return an empty array when dont have data');
  });

  describe('findOne', () => {
    // it('should find one task in DB', async () => {
    //   const createdTask = mockTaskPrice();
    //   const usedToFindID = String(Math.random());
    //   const expectedOutput = {
    //     id: randomUUID(),
    //     ...createdTask,
    //   };

    //   const spyFindOneModel = jest.spyOn(mockedTaskPriceModel, 'findOne').mockResolvedValueOnce(jest.fn());
    //   mockedTaskPriceModel.findOne = jest
    //     .fn()
    //     .mockImplementationOnce(() => ({ exec: jest.fn().mockResolvedValueOnce(expectedOutput) }));

    //   const output = await mockedTaskPriceService.findOne(usedToFindID);

    //   expect(spyFindOneModel).toBeCalledWith({ _id: usedToFindID });
    //   expect(output).toEqual(makeResponse(expectedOutput));
    // });

    it.todo('should return an empty object when dont have this specific id');
    it.todo('should find a specific object among many objects');
  });

  describe('update', () => {
    // it('should update a model', async () => {
    //   const expectedOutput = mockTaskPrice();
    //   const usedToFindID = String(Math.random());

    //   jest.spyOn(mockedTaskPriceModel, 'findOneAndUpdate').mockReturnValueOnce(
    //     createMock<Query<TaskPriceDocument, TaskPriceDocument>>({
    //       exec: jest.fn().mockResolvedValueOnce({
    //         ...expectedOutput,
    //       }),
    //     }),
    //   );

    //   const output = await mockedTaskPriceService.update({ id: usedToFindID, ...expectedOutput });

    //   expect(output).toEqual(expectedOutput);
    // });

    it.todo('should return an error when have a wrong request body');
    it.todo('it shouldnt update a model if ID is not found');
  });

  describe('remove', () => {
    it('should remove one model from DB', async () => {
      const usedToFindID = String(Math.random());

      const spyRemoveModel = jest
        .spyOn(mockedTaskPriceModel, 'deleteOne')
        .mockResolvedValueOnce({ acknowledged: true, deletedCount: 2 });

      await mockedTaskPriceService.remove(usedToFindID);

      expect(spyRemoveModel).toBeCalledWith({ _id: usedToFindID });
    });

    it.todo('should not delete if ID is not found');
  });
});
