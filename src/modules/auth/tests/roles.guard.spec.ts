import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';

import { RoleType } from '../../user/constants';
import { RolesGuard } from '../guards';

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
