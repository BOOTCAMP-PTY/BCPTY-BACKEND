
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity({ name: 'user_archives' })
export class userArchiveEntity {

  @PrimaryGeneratedColumn()
  uuid: string;
  
  @Column()
  emailMaster: string;

  @Column()
  userName: string;

  @Column()
  clientName: string;

  @Column()
  method_payment: string;

  @Column({ type: 'jsonb'})
  content:object[];

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  total_price: string;


  constructor(
    emailMaster: string,
    userName: string,
    clientName: string,
    method_payment: string,
    content: object[],
    date: Date,
    total_price: string,
  ) {

    this.emailMaster = emailMaster;
    this.userName = userName;
    this.clientName = clientName;
    this.method_payment = method_payment;
    this.content = content;
    this.date = date;
    this.total_price = total_price;
  }
}
