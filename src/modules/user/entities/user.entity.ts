

import { Exclude } from 'class-transformer';
import { CourseMaster } from 'src/modules/courses/entities/course-master.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from '../../../common/entities';
import { UserDto } from '../dtos';
import { UserAuthEntity } from '../entities';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  motherName?: string;

  @Column({ nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  @Exclude()
  updatedAt: Date;


  @OneToOne(() => CourseMaster)
  @JoinColumn()
  courseListAuthor: CourseMaster;

  @OneToOne(() => UserAuthEntity, (userAuth: UserAuthEntity) => userAuth.user, {
    eager: true,
    onDelete: 'CASCADE',
  })

  
  public userAuth: UserAuthEntity;

  dtoClass = UserDto;

  constructor(
    firstName?: string,
    middleName?: string,
    lastName?: string,
    motherName?: string,
    birthdate?: Date,
    avatar?: string,
    userAuth?: UserAuthEntity,
    courseListAuthor?: CourseMaster,
  ) {
    super();

    this.firstName = firstName || '';
    this.middleName = middleName || '';
    this.lastName = lastName || '';
    this.motherName = motherName ||'';
    this.birthdate = birthdate || undefined;
    this.avatar = avatar || '';
    this.userAuth = userAuth || undefined;
    this.courseListAuthor = courseListAuthor || undefined;
  }
}
