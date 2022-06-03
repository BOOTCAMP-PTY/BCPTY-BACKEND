import { BadRequestException } from '@nestjs/common';

export class PinCodeGenerationErrorException extends BadRequestException {
  constructor(error?: string) {
    super('Error while PinCode generation', error);
  }
}
