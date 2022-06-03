
import {
  Column,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'user_devices' })
export class userDeviceEntity {

  @PrimaryGeneratedColumn()
  @Generated('uuid')
  uuid: string;
  
  @Column()
  emailMaster: string;

  @Column()
  userName: string;

  @Column()
  userPassword: string;


  constructor(
    emailMaster: string,
    userName: string,
    userPassword: string
  ) {

    this.emailMaster = emailMaster;
    this.userName = userName;
    this.userPassword = userPassword;
  }
}
