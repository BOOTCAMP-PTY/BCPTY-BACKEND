import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../../modules/user/constants';


export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
