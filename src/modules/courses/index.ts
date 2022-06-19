import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity, UserEntity } from '../user/entities';
import { UserAuthService, UserService } from '../user/services';
import { CoursesController } from './controller/courses.controller';
import { CourseMaster } from './entities/course-master.entity';
import { CourseIndividual } from './entities/course.entity';
import { CourseService } from './services/courses.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    CourseMaster, CourseIndividual, UserEntity, UserAuthEntity])],
  controllers: [CoursesController],
  providers: [CourseService, UserService, UserAuthService],
  exports: [],
})
export class CoursesModule { }
