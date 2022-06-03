import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class userAddDeviceGenericResponse {

    @ApiProperty({ description: 'Code return' })
    @IsString()
    @IsNotEmpty()
     codeReturn: string;
  
  
  }