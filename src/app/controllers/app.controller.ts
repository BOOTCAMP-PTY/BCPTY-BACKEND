import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from '../services';

@Controller('App')
@ApiTags('App')
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  async welcome(): Promise<string> {
    return this._appService.welcome();
  }
}
