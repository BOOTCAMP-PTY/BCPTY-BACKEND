import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userDeviceGetRequest {

  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly userEmail: string;


}