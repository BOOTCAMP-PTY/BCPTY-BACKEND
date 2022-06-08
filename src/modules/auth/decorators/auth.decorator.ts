import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from '../../../modules/user/constants/role-type.constant';
import { JwtAccessTokenGuard, RolesGuard, EmailConfirmationGuard } from '../guards';


export function Authorization(...roles: RoleType[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAccessTokenGuard, RolesGuard, EmailConfirmationGuard),
  );
}
