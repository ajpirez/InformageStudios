import { MockType } from '../mocks/mock-type';
import {IRepository} from "../domain/interfaces/IRepository";

export const RepositoryMock: <T>() => MockType<IRepository<T>> = jest.fn(
  () => ({
    paginatedFind: jest.fn(() => ''),
    find: jest.fn(() => ''),
    aggregate: jest.fn(() => ''),
    countDocuments: jest.fn(() => ''),
    create: jest.fn(() => ''),
    delete: jest.fn(() => ''),
    deleteOne: jest.fn(() => ''),
    findById: jest.fn(() => ''),
    findOne: jest.fn(() => ''),
    update: jest.fn(() => ''),
    updateOne: jest.fn(() => ''),
  }),
);
