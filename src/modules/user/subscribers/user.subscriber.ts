import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { UserEntity } from '../../user/entities';
import { capitalizeFirst } from '../../../utils';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  public listenTo(): any {
    return UserEntity;
  }

  beforeInsert({ entity }: InsertEvent<UserEntity>): void {
    if (entity.firstName) {
      entity.firstName = capitalizeFirst(entity.firstName);
    }
    if (entity.lastName) {
      entity.lastName = capitalizeFirst(entity.lastName);
    }
  }

  beforeUpdate({ entity, databaseEntity }: UpdateEvent<UserEntity>): void {
    if (entity.firstName !== databaseEntity.firstName) {
      entity.firstName = capitalizeFirst(entity.firstName);
    }
    if (entity.lastName !== databaseEntity.lastName) {
      entity.lastName = capitalizeFirst(entity.lastName);
    }
  }
}
