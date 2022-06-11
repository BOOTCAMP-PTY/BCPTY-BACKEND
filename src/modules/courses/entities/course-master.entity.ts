

import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/modules/user/entities';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'courses_master' })
export class CourseMaster extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  courseCollectionName: string;

  @Column()
  authorUser: string;

  @Column()
  authorEmail: string;

  @Column({ nullable: true })
  courseCollectionDesc: string;


  @Column({ nullable: true })
  courseCollectionCategory: string;

  @Column({ nullable: true })
  courseCollectionReq: string;

  @Column({ nullable: true })
  courseCollectionRating?: string;

  @Column({ nullable: true })
  courseCollectionMisc?: string;

  @Column({ nullable: true })
  courseCollectionIdiom: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => CourseMaster, (CourseMaster) => CourseMaster)
  @JoinTable()
  courseAuthor: CourseMaster[];


  @OneToOne(() => UserEntity, (UserEntity) => UserEntity, { cascade: true })

  User: UserEntity;


  constructor(

    courseCollectionName: string,
    courseCollectionDesc: string,
    courseCollectionCategory: string,
    courseCollectionReq: string,
    authorUser: string,
    authorEmail: string,
    courseCollectionIdiom: string,
    courseCollectionRating?: string,
    courseCollectionMisc?: string,

  ) {
    super();

    this.courseCollectionName = courseCollectionName;
    this.courseCollectionDesc = courseCollectionDesc;
    this.courseCollectionCategory = courseCollectionCategory;
    this.courseCollectionReq = courseCollectionReq;
    this.courseCollectionIdiom = courseCollectionIdiom;
    this.courseCollectionRating = courseCollectionRating;
    this.courseCollectionMisc = courseCollectionMisc;
    this.authorUser = authorUser;
    this.authorEmail = authorEmail;

  }
}
