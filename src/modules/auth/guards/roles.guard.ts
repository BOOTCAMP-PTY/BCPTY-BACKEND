import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../../../modules/user/constants';


export class RolesGuard implements CanActivate {
  constructor(private _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this._reflector.getAllAndOverride<RoleType[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user?.usrAuth?.role?.includes(role));
  }
}
