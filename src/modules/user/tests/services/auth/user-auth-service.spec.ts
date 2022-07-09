import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MockType } from "src/common/utils/mocks";
import { userServiceMock } from "src/common/utils/mocks/auth-service.mock";
import { repositoryMockFactory } from "src/common/utils/mocks/repository-factory.mock";
import { Repository } from "typeorm";
import { UserAuthEntity, UserEntity } from "../../../entities";
import { UserAuthService, UserService } from "../../../services";

describe('UserAuthServiceMock1', () => {
    let service: UserAuthService;
    let repositoryMock1: MockType<Repository<UserEntity>>;
    let repositoryAuthMock1: MockType<Repository<UserAuthEntity>>;

    const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};
    const repositoryMockFactoryLocalUser1: () => MockType<Repository<any>> = jest.fn(() => ({
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockReturnThis(),
        getOne:  jest.fn().mockReturnThis(),
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            setParameter: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            getOne:  jest.fn(() => Promise.resolve(user)),
            orWhere: jest.fn().mockReturnThis(),
        }))
    }));

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserAuthService,
          { provide: UserService, useFactory: userServiceMock },
          // Provide your mock instead of the actual repository
          { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactoryLocalUser1 },
          { provide: getRepositoryToken(UserAuthEntity), useFactory: repositoryMockFactory },
        ],
      }).compile();
      
      service = module.get<UserAuthService>(UserAuthService);
      repositoryMock1 = module.get(getRepositoryToken(UserEntity));
      repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
    });
  
    it('should work email be defined', async () => {
        const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};
      const userResult = await service.markEmailAsConfirmed("patito@gmail.com")
      expect(userResult).toBeDefined();
    });


  });

