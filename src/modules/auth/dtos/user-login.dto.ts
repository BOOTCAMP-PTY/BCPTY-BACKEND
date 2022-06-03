import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
