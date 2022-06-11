

import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseMaster } from './course-master.entity';


@Entity({ name: 'courses_lessons' })
export class CourseIndividual extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  id_course: string;

  @Column()
  courseLessonName: string;

  @Column({ nullable: true })
  courseLessonDesc: string;

  @Column({ nullable: true })
  courseLessonContent1: string;

  @Column({ nullable: true })
  courseLessonContent2: string;

  @Column({ nullable: true })
  courseLessonContent3: string;

  @Column()
  courseDuration: string;



  @ManyToOne(() => CourseMaster, courseList => courseList.courseAuthor)
  @JoinColumn()
  courseAuthor: CourseMaster;

  constructor(
    id_course : string,
    courseLessonName: string,
    courseDuration: string,

  ) {
    super();

    this.courseLessonName = courseLessonName;
    this.courseDuration = courseDuration;
    this.id_course = id_course;



  }
}
