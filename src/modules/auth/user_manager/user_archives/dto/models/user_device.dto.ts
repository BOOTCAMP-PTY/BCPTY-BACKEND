import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userDeviceDto {

  @ApiProperty({ description: 'User Device name' })
  @IsString()
  @IsNotEmpty()
   emailMaster: string;

  @ApiProperty({ description: 'Password of User´s Device' })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: 'Password of User´s Device' })
  @IsString()
  @IsNotEmpty()
   userPassword: string;

}