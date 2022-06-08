import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity, UserEntity } from './entities';
import { UserService, UserAuthService } from './services';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserAuthEntity])],
  controllers: [],
  providers: [UserService, UserAuthService],
  exports: [UserService, UserAuthService],
})
export class UserModule {}
