import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../entities';
import { UserAuthService, UserService } from '../services';
import { UserAuthRepository, UserRepository } from '../repositories';
import { mockedUserRepository } from '../../../utils/mocks';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  const { getOne } = mockedUserRepository.createQueryBuilder();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        UserAuthService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockedUserRepository,
        },
        { provide: getRepositoryToken(UserAuthRepository), useValue: {} },
      ],
    }).compile();

    service = await module.get(UserService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when get an user by uuid', () => {
    describe('and the user is matched', () => {
      let user: UserEntity;

      beforeEach(() => {
        user = new UserEntity('John', null, 'Doe', null, '+13101234567');

        getOne.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const fetchedUser = await service.getUser('12345-1234');

        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is not matched', () => {
      beforeEach(() => {
        mockedUserRepository
          .createQueryBuilder()
          .getOne.mockReturnValue(undefined);
      });

      it('should undefined', async () => {
        const user = await service.getUser('uuid');
        expect(user).toEqual(undefined);
      });
    });
  });
});
