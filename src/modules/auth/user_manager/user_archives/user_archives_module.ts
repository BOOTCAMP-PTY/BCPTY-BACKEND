import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userArchiveController } from './controllers/user_archive.controller';
import { userArchiveRepository } from './repositories/user_archive.repository';
import { UserArchiveService } from './services/user_archive.service';



@Module({
  imports: [TypeOrmModule.forFeature([userArchiveRepository])],
  controllers: [userArchiveController],
  providers: [UserArchiveService],
  exports: [UserArchiveService],
})
export class userArchiveModule {}