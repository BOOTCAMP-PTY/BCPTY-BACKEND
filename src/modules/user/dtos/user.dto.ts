import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { AbstractDto } from '../../../common/dtos';
import { UserAuthDto } from '../dtos';
import { UserEntity } from '../entities';

export class UserDto extends AbstractDto {
  @ApiProperty({ description: 'User first name' })
  readonly firstName: string;

  @ApiPropertyOptional({ description: 'User middle name' })
  readonly middleName?: string;

  @ApiProperty({ description: 'User last name' })
  readonly lastName: string;

  @ApiPropertyOptional({ description: 'User mother name' })
  readonly motherName?: string;

  get shortName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiPropertyOptional({ description: 'User birthdate' })
  readonly birthdate?: Date;



  @ApiPropertyOptional({ description: 'User avatar image' })
  readonly avatar?: string;

  @ApiPropertyOptional({
    description: 'User session information',
    type: () => UserAuthDto,
  })
  @IsOptional()
  readonly userAuth?: UserAuthDto;

  constructor(user: UserEntity) {
    super(user);

    this.firstName = user.firstName;
    this.middleName = user?.middleName;
    this.lastName = user.lastName;
    this.motherName = user?.motherName;
    this.birthdate = user?.birthdate;
    this.userAuth = user.userAuth?.toDto();
  }
}
