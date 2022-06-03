import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../common/entities';
import { RoleType } from '../constants';
import { UserAuthDto } from '../dtos';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_auth' })
export class UserAuthEntity extends AbstractEntity<UserAuthDto> {
  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true })
  pinCode: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  lastSuccessfulLoggedDate?: Date;

  @Column({ nullable: true })
  lastFailedLoggedDate?: Date;

  @Column({ nullable: true })
  lastLogoutDate?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @Column({ default: false })
  @Exclude()
  isEmailConfirmed: boolean;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.userAuth, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: UserEntity;

  dtoClass = UserAuthDto;

  constructor(
    role: RoleType,
    email?: string,
    password?: string,
    isEmailConfirmed?: boolean,
    currentHashedRefreshToken?: string,
    user?: UserEntity,
  );
  constructor(
    role: RoleType,
    email: string,
    password: string,
    isEmailConfirmed?: boolean,
    currentHashedRefreshToken?: string,
    user?: UserEntity,
  );
  constructor(
    role: RoleType,
    email: string,
    password: string,
    isEmailConfirmed: boolean,
    currentHashedRefreshToken?: string,
    user?: UserEntity,
  );
  constructor(
    role: RoleType,
    email: string,
    password: string,
    isEmailConfirmed: boolean,
    currentHashedRefreshToken: string,
    user?: UserEntity,
  );
  constructor(
    role?: RoleType,
    email?: string,
    password?: string,
    isEmailConfirmed?: boolean,
    currentHashedRefreshToken?: string,
    user?: UserEntity,
  );
  constructor(
    role?: RoleType,
    email?: string,
    password?: string,
    isEmailConfirmed?: boolean,
    currentHashedRefreshToken?: string,
    user?: UserEntity,
  ) {
    super();

    this.role = role || RoleType.USER;
    this.email = email || '';
    this.password = password || '';
    this.isEmailConfirmed = isEmailConfirmed || false;
    this.currentHashedRefreshToken = currentHashedRefreshToken || '';
    this.user = user || undefined;
  }
}
