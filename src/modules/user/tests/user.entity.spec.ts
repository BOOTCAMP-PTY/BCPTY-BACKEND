import { UserAuthEntity, UserEntity } from '../entities';

describe('UserEntity class', () => {
  it('should make a user with no fields', () => {
    const user = new UserEntity();

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('');
    expect(user.middleName).toBe('');
    expect(user.lastName).toBe('');
    expect(user.motherName).toBe('');
    expect(user.phone).toBe('');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with firstName only', () => {
    const user = new UserEntity('Gailisis');

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('');
    expect(user.lastName).toBe('');
    expect(user.motherName).toBe('');
    expect(user.phone).toBe('');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with firstName and middleName only', () => {
    const user = new UserEntity('Gailisis', 'Andrew');

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('');
    expect(user.motherName).toBe('');
    expect(user.phone).toBe('');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with firstName, middleName, and lastName only', () => {
    const user = new UserEntity('Gailisis', 'Andrew', 'Dawsons');

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('');
    expect(user.phone).toBe('');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with full names only', () => {
    const user = new UserEntity('Gailisis', 'Andrew', 'Dawsons', 'Smith');

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('Smith');
    expect(user.phone).toBe('');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with full names, and phone only', () => {
    const user = new UserEntity(
      'Gailisis',
      'Andrew',
      'Dawsons',
      'Smith',
      '+13101234567',
    );

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('Smith');
    expect(user.phone).toBe('+13101234567');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with full names, phone, and avatar only', () => {
    const user = new UserEntity(
      'Gailisis',
      'Andrew',
      'Dawsons',
      'Smith',
      '+13101234567',
    );

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('Smith');
    expect(user.phone).toBe('+13101234567');
    expect(user.avatar).toBe('');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with full names, phone, and avatar only', () => {
    const user = new UserEntity(
      'Gailisis',
      'Andrew',
      'Dawsons',
      'Smith',
      '+13101234567',
      'https://image.io/test-image.jpg',
    );

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('Smith');
    expect(user.phone).toBe('+13101234567');
    expect(user.avatar).toBe('https://image.io/test-image.jpg');
    expect(user.userAuth).toBe(undefined);
  });

  it('should make a user with firstName and relation', () => {
    const userAuth = new UserAuthEntity();
    const user = new UserEntity(
      'Gailisis',
      'Andrew',
      'Dawsons',
      'Smith',
      '+13101234567',
      'https://image.io/test-image.jpg',
      userAuth,
    );

    expect(user).toBeTruthy();
    expect(user.firstName).toBe('Gailisis');
    expect(user.middleName).toBe('Andrew');
    expect(user.lastName).toBe('Dawsons');
    expect(user.motherName).toBe('Smith');
    expect(user.phone).toBe('+13101234567');
    expect(user.avatar).toBe('https://image.io/test-image.jpg');
    expect(user.userAuth).toBe(userAuth);
  });
});
