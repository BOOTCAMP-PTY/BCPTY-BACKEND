import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { MockType } from "src/common/utils/mocks";
import { authServiceMock, userServiceMock } from "src/common/utils/mocks/auth-service.mock";
import { repositoryMockFactory } from "src/common/utils/mocks/repository-factory.mock";
import { UserAuthEntity, UserEntity } from "src/modules/user/entities";
import { UserCreationException } from "src/modules/user/exceptions";
import { UserService } from "src/modules/user/services";
import { Repository } from "typeorm";
import { CourseIndvRequestDto } from "../../dto/request/course-ind.dto";
import { CourseMaster } from "../../entities/course-master.entity";
import { CourseIndividual } from "../../entities/course.entity";
import { CourseService } from "../../services/courses.service";

describe('CourseServiceMock1', () => {
    let service: CourseService;
    let repositoryMock1: MockType<Repository<UserEntity>>;
    let repositoryAuthMock1: MockType<Repository<UserAuthEntity>>;

    const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};
    const repositoryMockFactoryLocalUser1: () => MockType<Repository<any>> = jest.fn(() => ({
        create: jest.fn(),
        save: jest.fn(() => []) ,
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
          CourseService,
          { provide: UserService, useFactory: userServiceMock },
          // Provide your mock instead of the actual repository
          { provide: getRepositoryToken(UserEntity), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(UserAuthEntity), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(CourseMaster), useFactory: repositoryMockFactory },
          { provide: getRepositoryToken(CourseIndividual), useFactory: repositoryMockFactoryLocalUser1 },
        ],
      }).compile();
      
      service = module.get<CourseService>(CourseService);
      repositoryMock1 = module.get(getRepositoryToken(UserEntity));
      repositoryAuthMock1 = module.get(getRepositoryToken(UserAuthEntity));
    });
  
    it('should add course correctly', async () => {
      const user : Partial<any> = { uuid:'a', email: 'agmi@gmail.com'};
      const mockRequest1 : CourseIndvRequestDto = {
        id_course : "sd",
        courseLessonName :"",
        courseLessonDesc : ""
      }
      const userResult = await service.addSubCourse(mockRequest1)
      expect(userResult).toBeDefined();
    });

  });

