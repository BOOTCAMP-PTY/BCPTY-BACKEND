import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginSuccessDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly success:string

}
