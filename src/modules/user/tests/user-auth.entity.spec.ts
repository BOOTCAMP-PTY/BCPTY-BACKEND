import { RoleType } from '../../auth/constants';
import { UserAuthEntity, UserEntity } from '../entities';

describe('UserAuth Entity class', () => {
  it('should make an UserAuth with no fields', () => {
    const userAuth = new UserAuthEntity();

    expect(userAuth.role).toBe(RoleType.USER);
    expect(userAuth.email).toBe('');
    expect(userAuth.password).toBe('');
    expect(userAuth.isEmailConfirmed).toBe(false);
    expect(userAuth.currentHashedRefreshToken).toBe('');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType only', () => {
    const userAuth = new UserAuthEntity(RoleType.SUSPENSION);

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('');
    expect(userAuth.password).toBe('');
    expect(userAuth.isEmailConfirmed).toBe(false);
    expect(userAuth.currentHashedRefreshToken).toBe('');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType and email only', () => {
    const userAuth = new UserAuthEntity(RoleType.SUSPENSION, 'test@test.com');

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('test@test.com');
    expect(userAuth.password).toBe('');
    expect(userAuth.isEmailConfirmed).toBe(false);
    expect(userAuth.currentHashedRefreshToken).toBe('');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType, email, and password only', () => {
    const userAuth = new UserAuthEntity(
      RoleType.SUSPENSION,
      'test@test.com',
      '123123',
    );

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('test@test.com');
    expect(userAuth.password).toBe('123123');
    expect(userAuth.isEmailConfirmed).toBe(false);
    expect(userAuth.currentHashedRefreshToken).toBe('');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType, email, password, and isEmailConfirmed only', () => {
    const userAuth = new UserAuthEntity(
      RoleType.SUSPENSION,
      'test@test.com',
      '123123',
      true,
    );

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('test@test.com');
    expect(userAuth.password).toBe('123123');
    expect(userAuth.isEmailConfirmed).toBe(true);
    expect(userAuth.currentHashedRefreshToken).toBe('');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType, email, password, isEmailConfirmed, currentHashedRefreshToken only', () => {
    const userAuth = new UserAuthEntity(
      RoleType.SUSPENSION,
      'test@test.com',
      '123123',
      true,
      'abcdef123456zyxwvu',
    );

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('test@test.com');
    expect(userAuth.password).toBe('123123');
    expect(userAuth.isEmailConfirmed).toBe(true);
    expect(userAuth.currentHashedRefreshToken).toBe('abcdef123456zyxwvu');
    expect(userAuth.user).toBe(undefined);
  });

  it('should make an UserAuth with RoleType, email, password, isEmailConfirmed, currentHashedRefreshToken, and user', () => {
    const user = new UserEntity();
    const userAuth = new UserAuthEntity(
      RoleType.SUSPENSION,
      'test@test.com',
      '123123',
      true,
      'abcdef123456zyxwvu',
      user,
    );

    expect(userAuth).toBeTruthy();
    expect(userAuth.role).toBe(RoleType.SUSPENSION);
    expect(userAuth.email).toBe('test@test.com');
    expect(userAuth.password).toBe('123123');
    expect(userAuth.isEmailConfirmed).toBe(true);
    expect(userAuth.currentHashedRefreshToken).toBe('abcdef123456zyxwvu');
    expect(userAuth.user).toBe(user);
  });
});
