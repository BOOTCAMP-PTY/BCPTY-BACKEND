import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dtos';
import { UserAuthEntity } from '../entities';

export class UserAuthDto extends AbstractDto {
  @ApiProperty({ description: 'User pin code' })
  readonly pinCode: number;

  @ApiProperty({ description: 'User email address' })
  readonly email: string;

  @ApiProperty({ description: 'User last successful logged date' })
  readonly lastSuccessfulLoggedDate: Date;

  @ApiProperty({ description: 'User last failed logged date' })
  readonly lastFailedLoggedDate: Date;

  @ApiProperty({ description: 'User last logout date' })
  readonly lastLogoutDate: Date;

  constructor(userAuth: UserAuthEntity) {
    super(userAuth);

    this.pinCode = userAuth.pinCode;
    this.email = userAuth.email;
    this.lastSuccessfulLoggedDate = userAuth.lastSuccessfulLoggedDate;
    this.lastFailedLoggedDate = userAuth.lastFailedLoggedDate;
    this.lastLogoutDate = userAuth.lastLogoutDate;
  }
}
