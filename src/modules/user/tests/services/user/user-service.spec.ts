import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/common/utils/mocks';
import { MockDataSource, repositoryMockFactory } from 'src/common/utils/mocks/repository-factory.mock';
import { UserRegistrationDto } from 'src/modules/auth/dtos';
import { UserCreationException } from 'src/modules/user/exceptions';
import { DataSource, Repository } from 'typeorm';
import { UserAuthEntity, UserEntity } from '../../../entities';
import { UserService } from '../../../services';

describe('UserServiceMock1', () => {
  let service: UserService;
  let repositoryMock1: MockType<Repository<UserEntity>>;
  let repositoryAuthMock1: MockType<Repository<UserAuthEntity>>;

  const user: Partial<any> = { uuid: 'a', email: 'agmi@gmail.com' };
  const repositoryMockFactoryLocalUser1: () => MockType<Repository<any>> =
    jest.fn(() => ({
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn(() => Promise.resolve(user)),
        orWhere: jest.fn().mockReturnThis(),
      })),
    }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DataSource, useFactory: repositoryMockFactory },
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactoryLocalUser1,
        },
        {
          provide: getRepositoryToken(UserAuthEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock1 = module.get(getRepositoryToken(UserEntity));
    repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
  });

  it('should work email', async () => {
    const user: Partial<any> = { uuid: 'a', email: 'agmi@gmail.com' };
    const userResult = await service.findUser(user);
    expect(userResult).toBeDefined();
    expect(userResult).toEqual(user);
  });
});

describe('UserServiceMock2', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<UserEntity>>;
  let repositoryAuthMock: MockType<Repository<UserAuthEntity>>;

  const user: Partial<any> = { uuid: 'adawdwa-12dawdwad-d21d1-awdawd' };
  const repositoryMockFactoryLocalUser: () => MockType<Repository<any>> =
    jest.fn(() => ({
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn(() => Promise.resolve(user)),
        orWhere: jest.fn().mockReturnThis(),
      })),
    }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DataSource, useFactory: repositoryMockFactory },
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactoryLocalUser,
        },
        {
          provide: getRepositoryToken(UserAuthEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
    repositoryAuthMock = module.get(getRepositoryToken(UserAuthEntity));
  });

  it('should do uuid', async () => {
    const userResult = await service.findUser(user);
    expect(userResult).toBeDefined();
    expect(userResult).toEqual(user);
  });
});

describe('UserServiceMock3', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<UserEntity>>;
  let repositoryAuthMock: MockType<Repository<UserAuthEntity>>;

  const user: Partial<any> = { pinCode: '67584754' };
  const repositoryMockFactoryLocalUser: () => MockType<Repository<any>> =
    jest.fn(() => ({
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      createQueryBuilder: jest.fn(() => ({
        where: jest.fn().mockReturnThis(),
        setParameter: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn(() => Promise.resolve(user)),
        orWhere: jest.fn().mockReturnThis(),
      })),
    }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,

        { provide: DataSource, useFactory: MockDataSource },
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactoryLocalUser,
        },
        {
          provide: getRepositoryToken(UserAuthEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
    repositoryAuthMock = module.get(getRepositoryToken(UserAuthEntity));

  });

  it('should do pinCode', async () => {
    const userResult = await service.findUser(user);
    expect(userResult).toBeDefined();
    expect(userResult).toEqual(user);
  });

  it('should throw UserCreationException when user doesn´t follow rules', async () => {
    try {
      const user: UserRegistrationDto = {
        email: 'agmi@gmail.com',
        firstName: 'agmi@gmail.com',
        lastName: 'agmi@gmail.com',
        password: 'agmi@gmail.com',
      };
      await service.createUser(user);
    } catch (error) {
      expect(error).toBeInstanceOf(UserCreationException);
    }
  });
});
