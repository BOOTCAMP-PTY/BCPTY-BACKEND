import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CourseIndvRequestDto {

    @ApiProperty({ description: 'id of the main course' })
    readonly id_course: string;

    @ApiProperty({ description: 'Name of the lesson' })
    readonly courseLessonName: string;
    
    @ApiProperty({ description: 'Description of the lesson' })
    readonly courseLessonDesc: string;

    @ApiPropertyOptional({ description: 'Content of the lesson part 1' })
    readonly courseLessonContent1?: object[];

    @ApiPropertyOptional({ description:  'Content of the lesson part 2' })
    readonly courseLessonContent2?: string;

    @ApiPropertyOptional({ description:  'Content of the lesson part 3' })
    readonly courseLessonContent3?: string;

    @ApiPropertyOptional({ description: 'Duration of the course' })
    readonly courseDuration?: string;




}
