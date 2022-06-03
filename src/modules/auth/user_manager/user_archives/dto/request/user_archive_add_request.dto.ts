import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class userArchiveAddRequest {

  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly userMasterEmail: string;


  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly  userName: string;


  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly clientName: string;


  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly method_payment: string;


  @ApiProperty({ description: 'User master email' })
  @IsNotEmpty()
  readonly content: object[];


  @ApiProperty({ description: 'User master email' })
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ description: 'User master email' })
  @IsString()
  @IsNotEmpty()
  readonly total_price: string;

}