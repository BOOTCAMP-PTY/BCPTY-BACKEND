import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers';
import { UserAuthEntity, UserEntity } from './entities';
import { UserService, UserAuthService } from './services';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserAuthEntity])],
  controllers: [UserController],
  providers: [UserService, UserAuthService],
  exports: [UserService, UserAuthService],
})
export class UserModule {}
