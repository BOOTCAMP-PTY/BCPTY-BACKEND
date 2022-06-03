import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../../modules/user/entities';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly _authService: AuthService) {
    super({ usernameField: 'identifier', passwordField: 'password' });
  }

  public async validate(
    identifier: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this._authService.validateUser({
      identifier,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
