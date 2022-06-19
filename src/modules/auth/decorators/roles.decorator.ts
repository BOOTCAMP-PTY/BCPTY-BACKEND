import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../../modules/user/constants/role-type.constant';


export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);
