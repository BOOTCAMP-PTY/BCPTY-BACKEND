import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userDeviceController } from './controllers/user_device.controller';
import {  userDeviceRepository } from './repositories/user_device.repository';
import { UserDeviceService } from './services/user_device.service';



@Module({
  imports: [TypeOrmModule.forFeature([userDeviceRepository])],
  controllers: [userDeviceController],
  providers: [UserDeviceService],
  exports: [UserDeviceService],
})
export class userDeviceModule {}