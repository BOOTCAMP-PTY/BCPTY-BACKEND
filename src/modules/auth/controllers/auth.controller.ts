import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  ResponseCode,
  ResponseName,
} from 'src/common/constants/response.constant';
import { UserDto } from '../../../modules/user/dtos';
import { UserService } from '../../../modules/user/services';
import { UserLoginDto, UserRegistrationDto } from '../dtos';
import { LoginSuccessDto } from '../dtos/login-sucess.dto';
import {
  LocalAuthenticationGuard,
  JwtRefreshTokenGuard,
  JwtAccessTokenGuard,
} from '../guards';
import { RequestWithUserInterface } from '../interfaces';
import { AuthService } from '../services';

@Controller({ path: 'Auth', version: '1' })
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  @Inject(AuthService)
  private readonly _authService: AuthService;
  @Inject(UserService)
  private readonly _userService: UserService;

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully Registered',
    status: HttpStatus.OK,
    type: UserDto,
  })
  @ApiOperation({ summary: 'Allows new users registration' })
  async register(
    @Body() userRegistrationDto: UserRegistrationDto,
    @Res() res: Response,
  ): Promise<any> {
    await this._authService.register(userRegistrationDto);
    res
      .status(HttpStatus.OK)
      .json(`${ResponseName.SUCCESS}:${ResponseCode.SUCCESS_CODE}`)
      .send();
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'An user logged in and a session cookie',
    status: HttpStatus.OK,
    type: LoginSuccessDto,
  })
  @ApiOperation({ summary: 'Starts a new user session' })
  async login(
    @Req() req: RequestWithUserInterface,
    @Body() userLogin: UserLoginDto,
    @Res() res,
  ): Promise<void> {
    const [accessTokenCookie, refreshTokenCookie] =
      await this._authService.login(userLogin);
    res
      .setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
      .json(`${ResponseName.SUCCESS}:${ResponseCode.SUCCESS_CODE}`)
      .send();
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get current user profile',
    type: UserDto,
  })
  @ApiOperation({ summary: 'Get current user profile' })
  async userProfile(@Req() { user }: RequestWithUserInterface): Promise<any> {
    const userEntity = await this._userService.getUser(user.uuid);
    return userEntity.toDto();
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('signout')
  @ApiOperation({ summary: 'Delete current user session' })
  async logout(@Req() request: RequestWithUserInterface): Promise<void> {
    await this._authService.logout(request.user);

    request.res.setHeader(
      'Set-Cookie',
      this._authService.getCookiesForLogout(),
    );
  }
}
