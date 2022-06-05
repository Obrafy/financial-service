import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { ProjectPriceService } from './project-price.service';
import { ProjectPrice, ProjectPriceDocument } from './entities/project-price.entity';
import { createMock } from '@golevelup/ts-jest';
import { getModelToken } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { makeResponseProjectPrice } from '../common/utils';

export const mockProjectPrice = (projectId = randomUUID(), price = 3500): Partial<ProjectPrice> => ({
  projectId: projectId,
  price: price,
  createdAt: new Date(),
});

describe('ProjectPriceService', () => {
  let mockedProjectPriceService: ProjectPriceService;
  let mockedProjectPriceModel: Model<ProjectPriceDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectPriceService,
        {
          provide: getModelToken(ProjectPrice.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockProjectPrice()),
            constructor: jest.fn().mockResolvedValue(mockProjectPrice()),
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

    mockedProjectPriceService = module.get<ProjectPriceService>(ProjectPriceService);
    mockedProjectPriceModel = module.get<Model<ProjectPriceDocument>>(getModelToken(ProjectPrice.name));
  });

  it('should be defined', () => {
    expect(mockedProjectPriceService).toBeDefined();
    expect(mockedProjectPriceModel).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a ProjectPrice', async () => {
      // const expectedOutput = {
      //   projectId: 'Test',
      //   price: 3500,
      // };
      // const createdDate = new Date();
      // const spyCreateModel = jest.spyOn(mockedProjectPriceModel, 'create').mockImplementationOnce(() => {
      //   return Promise.resolve({ ...expectedOutput, createdAt: createdDate });
      // });
      // const output = await mockedProjectPriceService.create(expectedOutput);
      // expect(spyCreateModel).toBeCalled();
      // expect(spyCreateModel).toBeCalledWith(expectedOutput);
      // expect(output).toEqual(makeResponseProjectPrice({ ...expectedOutput, createdAt: createdDate }));
    });

    it.todo('test bad payload');
    it.todo('test returning duplicate values error');
    it.todo('test returning error when dont find projectId');
  });

  describe('findAll', () => {
    it('should get all projects', async () => {
      // const expectedOutput = [mockProjectPrice(), mockProjectPrice()];
      // const spyFindModel = jest.spyOn(mockedProjectPriceModel, 'find').mockResolvedValueOnce(expectedOutput);
      // const output = await mockedProjectPriceService.findAll();
      // expect(spyFindModel).toBeCalled();
      // expect(output).toEqual(makeResponseProjectPrice(expectedOutput));
    });

    it.todo('should return an empty array when dont have data');
  });

  describe('findOne', () => {
    // it('should find one project in DB', async () => {
    //   const createdProject = mockProjectPrice();
    //   const usedToFindID = String(Math.random());
    //   const expectedOutput = {
    //     id: randomUUID(),
    //     ...createdProject,
    //   };

    //   const spyFindOneModel = jest.spyOn(mockedProjectPriceModel, 'findOne').mockResolvedValueOnce(jest.fn());
    //   mockedProjectPriceModel.findOne = jest
    //     .fn()
    //     .mockImplementationOnce(() => ({ exec: jest.fn().mockResolvedValueOnce(expectedOutput) }));

    //   const output = await mockedProjectPriceService.findOne(usedToFindID);

    //   expect(spyFindOneModel).toBeCalledWith({ _id: usedToFindID });
    //   expect(output).toEqual(makeResponseProjectPrice(expectedOutput));
    // });

    it.todo('should return an empty object when dont have this specific id');
    it.todo('should find a specific object among many objects');
  });

  describe('update', () => {
    // it('should update a model', async () => {
    //   const expectedOutput = mockProjectPrice();
    //   const usedToFindID = String(Math.random());

    //   jest.spyOn(mockedProjectPriceModel, 'findOneAndUpdate').mockReturnValueOnce(
    //     createMock<Query<ProjectPriceDocument, ProjectPriceDocument>>({
    //       exec: jest.fn().mockResolvedValueOnce({
    //         ...expectedOutput,
    //       }),
    //     }),
    //   );

    //   const output = await mockedProjectPriceService.update({ id: usedToFindID, ...expectedOutput });

    //   expect(output).toEqual(expectedOutput);
    // });

    it.todo('should return an error when have a wrong request body');
    it.todo('it shouldnt update a model if ID is not found');
  });

  describe('remove', () => {
    it('should remove one model from DB', async () => {
      const usedToFindID = String(Math.random());

      const spyRemoveModel = jest
        .spyOn(mockedProjectPriceModel, 'deleteOne')
        .mockResolvedValueOnce({ acknowledged: true, deletedCount: 2 });

      await mockedProjectPriceService.remove(usedToFindID);

      expect(spyRemoveModel).toBeCalledWith({ _id: usedToFindID });
    });

    it.todo('should not delete if ID is not found');
  });
});
