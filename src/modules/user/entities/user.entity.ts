

import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, OneToOne, UpdateDateColumn } from 'typeorm';
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

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  @Exclude()
  updatedAt: Date;

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
    phone?: string,
    avatar?: string,
    userAuth?: UserAuthEntity,
  ) {
    super();

    this.firstName = firstName || undefined;
    this.middleName = middleName || undefined;
    this.lastName = lastName || undefined;
    this.motherName = motherName || undefined;
    this.birthdate = birthdate || undefined;
    this.phone = phone || undefined;
    this.avatar = avatar || undefined;
    this.userAuth = userAuth || undefined;
  }
}
