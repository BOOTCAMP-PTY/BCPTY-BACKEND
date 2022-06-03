import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../../modules/user/entities';
import { UserService } from '../../../modules/user/services';
import { TokenPayloadInterface } from '../interfaces';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: _configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  public async validate({ uuid }: TokenPayloadInterface): Promise<UserEntity> {
    return this._userService.getUser(uuid);
  }
}
