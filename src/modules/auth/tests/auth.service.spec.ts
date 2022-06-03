import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { RoleType } from '../../user/constants';
import { AuthService } from '../services';
import { UserEntity, UserAuthEntity } from '../../user/entities';
import { UserService, UserAuthService } from '../../user/services';
import { UserAuthRepository, UserRepository } from '../../user/repositories';
import {
  mockedConfigService,
  mockedJwtService,
  mockedUserRepository,
  mockedUserService,
} from '../../../utils/mocks';
import { MAIL_QUEUE } from '../../mail/constants';
import { MailService } from '../../mail/services';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: MAIL_QUEUE })],
      providers: [
        { provide: UserService, useValue: mockedUserService },
        UserAuthService,
        AuthService,
        MailService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService },
        { provide: UserRepository, useValue: mockedUserRepository },
        { provide: UserAuthRepository, useValue: {} },
      ],
    }).compile();

    service = await module.get(AuthService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when getting a authentication by email', () => {
    describe('and the user is matched', () => {
      let user: UserEntity;

      beforeEach(() => {
        user = new UserEntity(
          'John',
          null,
          'Doe',
          null,
          '+13101234567',
          null,
          new UserAuthEntity(RoleType.USER, 'test@test.com', '123123'),
        );

        mockedUserService.findUser.mockReturnValue(Promise.resolve(user));
      });

      it('should return the user', async () => {
        const fetchedUser = await service.validateUser({
          identifier: 'test@example.com',
          password: '123123',
        });

        expect(fetchedUser).toEqual(user);
      });
    });
  });
});
