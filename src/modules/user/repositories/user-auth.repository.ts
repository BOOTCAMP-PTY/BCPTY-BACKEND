import { EntityRepository, Repository } from 'typeorm';

import { UserAuthEntity } from '../entities';

@EntityRepository(UserAuthEntity)
export class UserAuthRepository extends Repository<UserAuthEntity> {}
