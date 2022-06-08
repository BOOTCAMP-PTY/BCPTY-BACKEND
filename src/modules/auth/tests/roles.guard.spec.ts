import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';


import { RolesGuard } from '../guards';
import { RoleType } from '../../../modules/user/constants/role-type.constant';

describe('RolesGuard', () => {
  let reflector: Reflector;
  let guard: RolesGuard;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true with auth', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      user: {
        userAuth: {
          role: RoleType.SUSPENSION,
        },
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
  });
});
