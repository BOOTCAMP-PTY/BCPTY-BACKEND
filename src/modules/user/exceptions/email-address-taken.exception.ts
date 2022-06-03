import { BadRequestException } from '@nestjs/common';

export class EmailAddressTakenException extends BadRequestException {
  constructor(error?: string) {
    super('E-mail address already taken', error);
  }
}
