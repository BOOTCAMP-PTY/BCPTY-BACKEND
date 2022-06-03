import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PaginateResponse } from '../../../common/decorators';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { UserDto } from '../dtos';
import { UserService } from '../services';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('User')
@ApiTags('Users')
export class UserController {
  constructor(private readonly _userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @PaginateResponse(UserDto)
  @ApiOperation({ summary: 'Get user list' })
  async getUsers(@Query() options: PageOptionsDto): Promise<PageDto<UserDto>> {
    return this._userService.getUsers(options);
  }
}
