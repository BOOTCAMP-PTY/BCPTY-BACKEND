import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../../modules/user/entities';
import { UserService } from '../../../modules/user/services';
import { encodeString } from '../../../utils';

import { WrongCredentialsProvidedException } from '../exceptions';
import { TokenPayloadInterface } from '../interfaces';
import { AuthService } from '../services';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: _configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    { uuid }: TokenPayloadInterface,
  ): Promise<UserEntity> {
    const refreshToken = request.cookies?.Refresh;
    const encodedRefreshToken = encodeString(refreshToken);
    const user = await this._userService.getUser(uuid);

    if (!user) {
      throw new WrongCredentialsProvidedException();
    }

    return this._authService.getUserIfRefreshTokenMatches(
      encodedRefreshToken,
      user,
    );
  }
}
