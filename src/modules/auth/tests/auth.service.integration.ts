import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcrypt';
import { Connection } from 'typeorm';

import {
  ConnectionMock,
  mockedConfigService,
  mockedJwtService,
} from '../../../common/utils/mocks';

import { UserAuthService, UserService } from '../../user/services';
import { UserAuthEntity } from '../../user/entities';
import { AuthService } from '../services';
import { RoleType } from 'src/modules/user/constants/role-type.constant';


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
      'strongPassDumy',
    );
    findAuthentication = jest.fn().mockResolvedValue(userAuthEntity);

    const authenticationRepository = {
      findOne: findAuthentication,
    };

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    module = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        UserAuthService,
        AuthService,
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: JwtService, useValue: mockedJwtService },

    
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
        password: 'strongPassDumy',
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
            password: 'strongPassDumy',
          }),
        ).rejects.toThrow();
      });
    });

    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });


      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findAuthentication.mockResolvedValue(undefined);
        });

        it('should throw an error', async () => {
          await expect(
            authService.validateUser({
              identifier: 'user@email.com',
              password: 'strongPassDumy',
            }),
          ).rejects.toThrow();
        });
      });
    });
  });
});