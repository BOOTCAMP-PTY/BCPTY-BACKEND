import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userAddDeviceResponse {

  @ApiProperty({ description: 'User Device name' })
  @IsString()
  @IsNotEmpty()
   Status: string;


}