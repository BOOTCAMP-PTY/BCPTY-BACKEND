import { ApiProperty } from '@nestjs/swagger';


export class CourseCreateDto {

  @ApiProperty({ description: 'User pin code' })
  readonly courseCollectionName: string;

  @ApiProperty({ description: 'User pin code' })
  readonly courseCollectionUserEmail: string;

  @ApiProperty({ description: 'rol user´s' })
  readonly courseCollectionDesc: string;

  @ApiProperty({ description: 'User email address' })
  readonly courseCollectionCategory: string;

  @ApiProperty({ description: 'User last successful logged date' })
  readonly courseCollectionReq: string;

  @ApiProperty({ description: 'User last failed logged date' })
  readonly courseCollectionRating: string;

  @ApiProperty({ description: 'User last logout date' })
  readonly courseCollectionIdiom: string;

}
