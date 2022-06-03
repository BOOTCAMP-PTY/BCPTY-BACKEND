import { BadRequestException } from '@nestjs/common';

export class RefreshTokenNotMatchingException extends BadRequestException {
  constructor(error?: string) {
    super('Refresh token not matching', error);
  }
}