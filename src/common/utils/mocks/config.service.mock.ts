export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'PORT':
        return '7000';
      case 'POSTGRES_HOST':
        return 'localhost';
      case 'POSTGRES_PORT':
        return '7000';
      case 'POSTGRES_USER':
        return 'pietrzakadrian';
      case 'POSTGRES_PASSWORD':
        return '7000';
      case 'POSTGRES_DB':
        return 'nestjs-authentication-full';
      case 'JWT_ACCESS_TOKEN_SECRET':
        return '7000';
      case 'JWT_ACCESS_TOKEN_EXPIRATION_TIME':
        return '7000';
      case 'JWT_REFRESH_TOKEN_SECRET':
        return '7000';
      case 'JWT_REFRESH_TOKEN_EXPIRATION_TIME':
        return '7000';
      case 'JWT_VERIFICATION_TOKEN_SECRET':
        return '7000';
      case 'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME':
        return '7000';
      case 'EMAIL_HOST':
        return '7000';
      case 'EMAIL_PORT':
        return '7000';
      case 'EMAIL_ADDRESS':
        return '7000';
      case 'EMAIL_PASSWORD':
        return '7000';
      case 'EMAIL_CONFIRMATION_URL':
        return '7000';
      case 'REDIS_HOST':
        return '7000';
      case 'REDIS_PORT':
        return '7000';
    }
  },
};
