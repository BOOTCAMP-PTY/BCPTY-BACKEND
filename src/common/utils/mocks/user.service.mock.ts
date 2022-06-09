import { Repository } from "typeorm";

export const mockedUserService = {
  findUser: jest.fn(),
};

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};

const repositoryMockFactoryLocalUser: () => MockType<Repository<any>> = jest.fn(() => ({
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne:  jest.fn((id) => Promise.resolve(user)),
        orWhere: jest.fn().mockReturnThis(),
    }))
}));
