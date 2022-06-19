import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly _logger: Logger = new Logger(AppService.name);

  async onModuleInit(): Promise<void> {
    this._logger.log('AppService has been initialized.');
    this._logger.log(`Current environment: ${process.env.NODE_ENV}`);
  }

  public  welcome(): string {
    return 'BOOTCAMP-PTY  - Gateway Server';
  }
}
