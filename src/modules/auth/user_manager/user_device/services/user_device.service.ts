import { Injectable } from '@nestjs/common';
import { userDeviceDto } from '../dto/models/user_device.dto';
import { userDeviceGetRequest } from '../dto/request/user_device_get_request.dto';
import { userDeviceRepository } from '../repositories/user_device.repository';



@Injectable()
export class UserDeviceService {
  constructor(
    private readonly _userDeviceRepository: userDeviceRepository
  ) { }

  public async getAllDevices(userGetDevice:userDeviceGetRequest): Promise<any> {

    const queryBuilder = this._userDeviceRepository.createQueryBuilder('user_devices')
    .where("email_master = :email", { email: userGetDevice.userEmail }).execute()
    return queryBuilder;

  }
  public async addOneDevice(userDevice: userDeviceDto): Promise<any> {
    const user = this._userDeviceRepository.create(userDevice);
    return await this._userDeviceRepository.save(user);

  }
  public async removeOneDevice(userDevice: userDeviceDto): Promise<any> {

    const queryBuilder = this._userDeviceRepository.createQueryBuilder('user_devices').update(userDevice)
    .delete()
    .where("user_name = :userName", { userName: userDevice.userName })
    .execute();
  return queryBuilder;
  }
  public async updateOneDevice(userDevice: userDeviceDto) {
    const queryBuilder = this._userDeviceRepository.createQueryBuilder('user_devices').update(userDevice)
      .set({
         userName: userDevice.userName,
          userPassword: userDevice.userPassword
          })
      .where("user_name = :user_name", { user_name: userDevice.userName})
      .execute();
    return queryBuilder;
  }

}



