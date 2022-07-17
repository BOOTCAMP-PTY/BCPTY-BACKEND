import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType } from 'src/common/utils/mocks';
import {
  authServiceMock,
  userServiceMock,
} from 'src/common/utils/mocks/auth-service.mock';
import { repositoryMockFactory } from 'src/common/utils/mocks/repository-factory.mock';
import { UserAuthEntity, UserEntity } from 'src/modules/user/entities';
import { UserAuthService, UserService } from 'src/modules/user/services';
import { Repository } from 'typeorm';
import { CoursesController } from '../../controller/courses.controller';
import { CourseMaster } from '../../entities/course-master.entity';
import { CourseIndividual } from '../../entities/course.entity';
import { CourseService } from '../../services/courses.service';

describe('CoursesControllerMock1', () => {
  let testController: CoursesController;
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
      controllers: [CoursesController],
      providers: [
        JwtService,
        ConfigService,
        CourseService,
        {
          provide: getRepositoryToken(CourseIndividual),
          useFactory: repositoryMockFactoryLocalUser1,
        },
        { provide: UserService, useFactory: userServiceMock },
        { provide: UserAuthService, useFactory: authServiceMock },
        {
          provide: getRepositoryToken(CourseMaster),
          useFactory: repositoryMockFactoryLocalUser1,
        },
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

    testController = module.get<CoursesController>(CoursesController);
    repositoryMock1 = module.get(getRepositoryToken(UserEntity));
    repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
  });
  it('should be defined', async () => {
    expect(testController).toBeDefined();
  });
});
