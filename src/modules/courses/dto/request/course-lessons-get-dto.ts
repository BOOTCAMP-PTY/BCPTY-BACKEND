import { ApiProperty } from '@nestjs/swagger';


export class CourseLessonGetRequestDto {

    @ApiProperty({ description: 'id of the main course' })
    readonly uuid_course: string;

}
