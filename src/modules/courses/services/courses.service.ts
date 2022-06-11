import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/services';
import { Repository } from 'typeorm';
import { CourseLessonDto } from '../dto/models/course-lesson.dto';
import { CourseMasterDto } from '../dto/models/course-master.dto';
import { CourseCreateDto } from '../dto/models/courses-create.dto';
import { CourseIndvRequestDto } from '../dto/request/course-ind.dto';
import { CourseLessonGetRequestDto } from '../dto/request/course-lessons-get-dto';
import { CourseLessonsGetRequestDto } from '../dto/request/course-lessons-get-dto copy';
import { CourseMaster } from '../entities/course-master.entity';
import { CourseIndividual } from '../entities/course.entity';




@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseMaster)
        private readonly _courseMasterRepository: Repository<CourseMaster>,
        @InjectRepository(CourseIndividual)
        private readonly _courseIndividualRepository: Repository<CourseIndividual>,
        private readonly _userService: UserService,
    ) { }

    public async createCourseMaster(courserRegistrationDto: CourseCreateDto,): Promise<any> {
        const userSearch: Partial<any> = { email: courserRegistrationDto.courseCollectionUserEmail }
        const User = await this._userService.findUser(userSearch)
        const authorUser = User.firstName;
        const authorEmail = User.userAuth.email;
        const createdUser: CourseMasterDto = {
            ...courserRegistrationDto,
            authorUser, authorEmail, User
        };
        return this._courseMasterRepository.save(createdUser)

    }

    public async addSubCourse(courserRegistrationDto: CourseIndvRequestDto): Promise<any> {

        const createdUser: CourseLessonDto = { ...courserRegistrationDto };
        return this._courseIndividualRepository.save(createdUser)

    }
    
    public async getListLesson(courserRegistrationDto: CourseLessonGetRequestDto): Promise<any> {
        const queryBuilder = await  this._courseIndividualRepository.createQueryBuilder('courses_lessons')
            .where("uuid = :id", { id: courserRegistrationDto.uuid_course }).execute()
            console.log(queryBuilder)
        return queryBuilder;

    }
    
    public async getListLessons(courserRegistrationDto: CourseLessonsGetRequestDto): Promise<any> {
        const queryBuilder = await  this._courseIndividualRepository.createQueryBuilder('courses_lessons')
            .where("id_course = :id", { id: courserRegistrationDto.id_course }).execute()
            console.log(queryBuilder)
        return queryBuilder;

    }
}
