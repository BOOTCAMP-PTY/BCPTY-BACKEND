import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userArchiveGetRequest {

  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly userMasterEmail: string;

}