import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UtilsService } from '../services';
import { AbstractDto } from '../dtos';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any): T {
    return UtilsService.toDto(this.dtoClass, this, options);
  }

  constructor(id: number, uuid?: string, createdAt?: Date);
  constructor(id: number, uuid: string, createdAt?: Date);
  constructor(id?: number, uuid?: string, createdAt?: Date);
  constructor(id?: number, uuid?: string, createdAt?: Date) {
    this.id = id;
    this.uuid = uuid;
    this.createdAt = createdAt;
  }
}
