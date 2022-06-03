import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';


import { MailModule } from '../mail';
import { UserModule } from '../user';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { JwtAccessTokenStrategy, JwtConfirmTokenStrategy, JwtRefreshTokenStrategy, LocalStrategy } from './strategies';


@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    forwardRef(() => MailModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: `${configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtConfirmTokenStrategy,
    {
      provide: 'MAIL_SERVICE',
      useFactory: () => ClientProxyFactory.create({ transport: Transport.TCP }),
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
