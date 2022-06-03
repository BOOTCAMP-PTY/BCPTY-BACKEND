import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { UserRepository } from './repositories/user.repository';
import { UserService, UserAuthService } from './services';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserAuthRepository])],
  controllers: [UserController],
  providers: [UserService, UserAuthService],
  exports: [UserService, UserAuthService],
})
export class UserModule {}
