import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { TaskPriceService } from './task-price.service';
import { TaskPrice, TaskPriceDocument } from './entities/task-price.entity';
import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';

const mockTaskPrice = (name = 'Testing', price = 3500): Partial<TaskPrice> => ({
  name,
  price,
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
            remove: jest.fn(),
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

  it('should test create method', async () => {
    const expectedOutput = {
      name: 'Test',
      price: 3500,
    };

    const spyCreateModel = jest.spyOn(mockedTaskPriceModel, 'create').mockImplementationOnce(() => {
      return Promise.resolve(expectedOutput);
    });

    const output = await mockedTaskPriceService.create(expectedOutput);

    expect(spyCreateModel).toBeCalled();
    expect(spyCreateModel).toBeCalledWith(expectedOutput);
    expect(output).toEqual(expectedOutput);
  });

  it('should get all tasks', async () => {
    const expectedOutput = [mockTaskPrice(), mockTaskPrice()];

    const spyFindModel = jest.spyOn(mockedTaskPriceModel, 'find').mockResolvedValueOnce(expectedOutput);

    const output = await mockedTaskPriceService.findAll();

    expect(spyFindModel).toBeCalled();
    expect(output).toEqual(expectedOutput);
  });

  it('should find one task in DB', async () => {
    const expectedOutput = mockTaskPrice();
    const usedToFindID = Math.random();

    const spyFindOneModel = jest.spyOn(mockedTaskPriceModel, 'findOne').mockReturnValueOnce(
      createMock<Query<TaskPriceDocument, TaskPriceDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          ...expectedOutput,
        }),
      }),
    );

    const output = await mockedTaskPriceService.findOne(usedToFindID);

    expect(spyFindOneModel).toBeCalledWith({ id: usedToFindID });
    expect(output).toEqual(expectedOutput);
  });

  it('should update taskPrice model', async () => {
    const expectedOutput = mockTaskPrice();
    const usedToFindID = Math.random();

    jest.spyOn(mockedTaskPriceModel, 'findOneAndUpdate').mockReturnValueOnce(
      createMock<Query<TaskPriceDocument, TaskPriceDocument>>({
        exec: jest.fn().mockResolvedValueOnce({
          ...expectedOutput,
        }),
      }),
    );

    const output = await mockedTaskPriceService.update(usedToFindID, expectedOutput);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove from db', async () => {
    const usedToFindID = Math.random();

    const spyRemoveModel = jest.spyOn(mockedTaskPriceModel, 'remove').mockResolvedValueOnce(true);
    await mockedTaskPriceService.remove(usedToFindID);

    expect(spyRemoveModel).toBeCalledWith({ id: usedToFindID });
  });
});
