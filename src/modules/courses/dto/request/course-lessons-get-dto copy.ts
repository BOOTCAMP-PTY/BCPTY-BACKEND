import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CourseLessonsGetRequestDto {

    @ApiProperty({ description: 'id of the main course' })
    readonly id_course: string;

}
