import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserRegistrationDto, UserLoginDto } from '../dtos';
import {
  RefreshTokenNotMatchingException,
  WrongCredentialsProvidedException,
} from '../exceptions';
import { TokenPayloadInterface, VerificationTokenPayload } from '../interfaces';

import { UserEntity } from '../../user/entities';
import { UserAuthService, UserService } from '../../user/services';
import { validateHash } from '../../../common/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _userAuthService: UserAuthService,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  public async register(
    userRegistrationDto: UserRegistrationDto,
  ): Promise<UserEntity> {
    return this._userService.createUser(userRegistrationDto);
  }

  public async login(user: UserLoginDto): Promise<string[]> {
    const data = await this._userService.getUserByMail(user.identifier);
    const accessTokenCookie = await this._getCookieWithJwtToken(data.uuid);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this._getCookieWithJwtRefreshToken(data.uuid);

    await this._userAuthService.updateRefreshToken(
      data.userAuth.id,
      refreshToken,
    );

    return [accessTokenCookie, refreshTokenCookie];
  }

  public async logout(user: UserEntity): Promise<void> {
    await this._userAuthService.updateRefreshToken(user.userAuth.id, null);
  }

  public async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const { identifier, password } = userLoginDto;
    const user = await this._userService.findUser({
      pinCode: +identifier,
      email: identifier,
      uuid: identifier,
    });

    if (!user) {
      throw new WrongCredentialsProvidedException();
    }
    const isPasswordValid = await validateHash(
      password,
      user.userAuth.password,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsProvidedException();
    }

    return user;
  }

  public refreshToken(user: UserEntity): string {
    return this._getCookieWithJwtToken(user.uuid);
  }

  public getCookiesForLogout(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    user: UserEntity,
  ): Promise<UserEntity> {
    const isRefreshTokenMatching = await validateHash(
      refreshToken,
      user.userAuth.currentHashedRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      throw new RefreshTokenNotMatchingException();
    }

    return user;
  }

  public getJwtConfirmToken(email: string): string {
    const payload: VerificationTokenPayload = { email };
    return this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_VERIFICATION_TOKEN_SECRET_KEY'),
      expiresIn: `${this._configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  public async resendConfirmationLink(user: UserEntity): Promise<void> {
    if (user.userAuth.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
  }

  public async confirm(user: UserEntity): Promise<void> {
    await this._userAuthService.markEmailAsConfirmed(user.userAuth.email);
  }

  private _getCookieWithJwtToken(uuid: string): string {
    const payload: TokenPayloadInterface = { uuid };
    const token = this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
      expiresIn: `${this._configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this._configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}`;
  }

  private _getCookieWithJwtRefreshToken(uuid: string) {
    const payload: TokenPayloadInterface = { uuid };
    const token = this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_REFRESH_TOKEN_SECRET_KEY'),
      expiresIn: `${this._configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this._configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;

    return { cookie, token };
  }
}
