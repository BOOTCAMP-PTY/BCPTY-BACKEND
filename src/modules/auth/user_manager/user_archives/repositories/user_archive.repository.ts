import { EntityRepository, Repository } from 'typeorm';
import { userArchiveEntity } from '../entities/user_device.entity';

@EntityRepository(userArchiveEntity)
export class userArchiveRepository extends Repository<userArchiveEntity> { }
