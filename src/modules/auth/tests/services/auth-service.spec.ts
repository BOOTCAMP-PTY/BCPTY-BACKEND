import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MockType } from "src/common/utils/mocks";
import { authServiceMock, userServiceMock } from "src/common/utils/mocks/auth-service.mock";
import { repositoryMockFactory } from "src/common/utils/mocks/repository-factory.mock";
import { UserAuthEntity, UserEntity } from "src/modules/user/entities";
import { UserAuthService, UserService } from "src/modules/user/services";
import { Repository } from "typeorm";

import { UserLoginDto } from "../../dtos";
import { WrongCredentialsProvidedException } from "../../exceptions";
import { AuthService } from "../../services";

describe('AuthServiceMock1', () => {
    let service: AuthService;
    let repositoryMock1: MockType<Repository<UserEntity>>;
    let repositoryAuthMock1: MockType<Repository<UserAuthEntity>>;

    const user: Partial<any> = { uuid: 'a', email: 'agmi@gmail.com' };
    const repositoryMockFactoryLocalUser1: () => MockType<Repository<any>> = jest.fn(() => ({
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
        }))
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                ConfigService,
                { provide: UserService, useFactory: userServiceMock },
                { provide: UserAuthService, useFactory: authServiceMock },
                // Provide your mock instead of the actual repository
                { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactoryLocalUser1 },
                { provide: getRepositoryToken(UserAuthEntity), useFactory: repositoryMockFactory },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repositoryMock1 = module.get(getRepositoryToken(UserEntity));
        repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
    });



    it('should throw WrongCredentialsProvidedException when user doesn´t exist', async () => {

        try {
            const user: UserLoginDto = {
                identifier: '',
                password: ''
            };
            await service.validateUser(user)

        } catch (error) {
            expect(error).toBeInstanceOf(WrongCredentialsProvidedException)

        }


    });

    
});

describe('AuthServiceMock1', () => {
    let service: AuthService;
    let repositoryMock1: MockType<Repository<UserEntity>>;
    let repositoryAuthMock1: MockType<Repository<UserAuthEntity>>;

    const userMock: Partial<any> = { uuid: 'a', email: 'agmi@gmail.com' };
    const repositoryMockFactoryLocalUser1: () => MockType<Repository<any>> = jest.fn(() => ({
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnThis(),
        createQueryBuilder: jest.fn(() => ({
            where: jest.fn().mockReturnThis(),
            setParameter: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            getOne: jest.fn(() => Promise.resolve()),
            orWhere: jest.fn().mockReturnThis(),
        }))
    }));

    const userServiceMockLocal = () => ({
        collectionGetQuery: jest.fn(),
        findUser : jest.fn().mockReturnValueOnce(userMock),
      });
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                ConfigService,
                { provide: UserService, useFactory: userServiceMockLocal },
                { provide: UserAuthService, useFactory: authServiceMock },
                // Provide your mock instead of the actual repository
                { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactoryLocalUser1 },
                { provide: getRepositoryToken(UserAuthEntity), useFactory: repositoryMockFactory },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repositoryMock1 = module.get(getRepositoryToken(UserEntity));
        repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
    });



    it('should throw TypeError when userAuth doesn´t exist', async () => {

        try {
            const user: UserLoginDto = {
                identifier: 'pato',
                password: 'ganzo'
            };
            await service.validateUser(user)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)

        }


    });

    
});

