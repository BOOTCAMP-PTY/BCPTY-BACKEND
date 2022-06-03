import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userDeviceAddRequest {

  @ApiProperty({ description: 'User Device name' })
  @IsString()
  @IsNotEmpty()
  readonly userDeviceName: string;

  @ApiProperty({ description: 'Password of User´s Device' })
  @IsString()
  @IsNotEmpty()
  readonly userDevicePassword: string;

}