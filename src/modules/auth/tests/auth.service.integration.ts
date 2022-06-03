import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Connection } from 'typeorm';

import {
  ConnectionMock,
  mockedConfigService,
  mockedJwtService,
} from '../../../utils/mocks';
import { UserAuthRepository, UserRepository } from '../../user/repositories';
import { UserAuthService, UserService } from '../../user/services';
import { UserAuthEntity } from '../../user/entities';
import { MailService } from '../../mail/services';
import { MAIL_QUEUE } from '../../mail/constants';
import { AuthService } from '../services';
import { RoleType } from '../../user/constants';

jest.mock('bcrypt');

describe('The AuthenticationService', () => {
  let module: TestingModule;
  let authService: AuthService;
  let bcryptCompare: jest.Mock;
  let userAuthEntity: UserAuthEntity;
  let findAuthentication: jest.Mock;

  beforeEach(async () => {
    userAuthEntity = new UserAuthEntity(
      RoleType.USER,
      'user@email.com',
      'strongPassword',
    );
    findAuthentication = jest.fn().mockResolvedValue(userAuthEntity);

    const authenticationRepository = {
      findOne: findAuthentication,
    };

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    module = await Test.createTestingModule({
      imports: [BullModule.registerQueue({ name: MAIL_QUEUE })],
      providers: [
        UserService,
        UserAuthService,
        AuthService,
        MailService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: getRepositoryToken(UserAuthRepository),
          useValue: authenticationRepository,
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: {},
        },
        { provide: Connection, useClass: ConnectionMock },
      ],
    }).compile();

    authService = await module.get(AuthService);
  });

  afterEach(async () => {
    await module.close();
  });

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get a user by email', async () => {
      const getAuthentication = jest.spyOn(authService, 'validateUser');

      await authService.validateUser({
        identifier: 'user@email.com',
        password: 'strongPassword',
      });
      expect(getAuthentication).toBeCalledTimes(1);
    });

    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });

      it('should throw an error', async () => {
        await expect(
          authService.validateUser({
            identifier: 'user@email.com',
            password: 'strongPassword',
          }),
        ).rejects.toThrow();
      });
    });

    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });

      // todo
      // describe('and the user is found in the database', () => {
      //   beforeEach(() => {
      //     findAuthentication.mockResolvedValue(authentication);
      //   });

      //   it('should return the user data', async () => {
      //     const user = await authenticationService.getAuthenticatedUser(
      //       'user@email.com',
      //       'strongPassword',
      //     );

      //     expect(user).toBe(authentication);
      //   });
      // });

      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findAuthentication.mockResolvedValue(undefined);
        });

        it('should throw an error', async () => {
          await expect(
            authService.validateUser({
              identifier: 'user@email.com',
              password: 'strongPassword',
            }),
          ).rejects.toThrow();
        });
      });
    });
  });
});