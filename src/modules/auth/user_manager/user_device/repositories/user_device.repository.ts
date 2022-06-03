import { EntityRepository, Repository } from 'typeorm';
import { userDeviceEntity } from '../entities/user_device.entity';

@EntityRepository(userDeviceEntity)
export class userDeviceRepository extends Repository<userDeviceEntity> { }
