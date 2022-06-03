import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../../user/entities';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);

  constructor() { }

  sendConfirmationEmail(user: UserEntity) {

  }
  
}
