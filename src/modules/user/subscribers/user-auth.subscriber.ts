import { encodeString, generateHash } from '../../../utils';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UserAuthEntity } from '../entities';


@EventSubscriber()
export class UserAuthSubscriber
  implements EntitySubscriberInterface<UserAuthEntity>
{
  listenTo() {
    return UserAuthEntity;
  }

  async beforeInsert({ entity }: InsertEvent<UserAuthEntity>): Promise<void> {
    if (entity.password) {
      entity.password = await generateHash(entity.password);
    }
    if (entity.email) {
      entity.email = entity.email.toLowerCase();
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<UserAuthEntity>): Promise<void> {
    if (entity.password) {
      const password = await generateHash(entity.password);

      if (password !== databaseEntity?.password) {
        entity.password = generateHash(entity.password);
      }
    }

    if (entity.email) {
      if (entity.email !== databaseEntity.email) {
        entity.email = entity.email.toLowerCase();
      }
    }

    if (entity.currentHashedRefreshToken) {
      const currentHashedRefreshToken = encodeString(
        entity.currentHashedRefreshToken,
      );

      entity.currentHashedRefreshToken = await generateHash(
        currentHashedRefreshToken,
      );
    }
  }
}
