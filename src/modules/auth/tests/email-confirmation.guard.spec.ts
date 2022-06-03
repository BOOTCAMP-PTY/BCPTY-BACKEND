import { createMock } from '@golevelup/nestjs-testing';
import { ExecutionContext } from '@nestjs/common';
import { EmailConfirmationGuard } from '../guards';

describe('EmailConfirmationGuard', () => {
  let guard: EmailConfirmationGuard;

  beforeEach(() => {
    guard = new EmailConfirmationGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true with auth', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      user: {
        userAuth: {
          isEmailConfirmed: true,
        },
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should return false with auth', () => {
    const context = createMock<ExecutionContext>();

    expect(context.switchToHttp).toBeCalledTimes(0);
  });
});
