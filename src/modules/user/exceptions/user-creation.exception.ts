import { BadRequestException } from '@nestjs/common';

export class UserCreationException extends BadRequestException {
  constructor(error?: string) {
    super('Error while user auth creation', error);
  }
}
