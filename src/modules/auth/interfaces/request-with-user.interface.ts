import { Request } from 'express';
import { UserEntity } from '../../../modules/user/entities';


export interface RequestWithUserInterface extends Request {
  user: UserEntity;
}
