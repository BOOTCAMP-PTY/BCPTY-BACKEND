import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDeviceService } from '../services/user_device.service';
import { ResponseCode } from 'src/common/constants/response.constant';
import { userDeviceDto } from '../dto/models/user_device.dto';
import { userAddDeviceResponse } from '../dto/response/user_add_device_response.dto';
import { userAddDeviceGenericResponse } from '../dto/response/user_device_response.dto';
import { userDeviceGetRequest } from '../dto/request/user_device_get_request.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('userDevice')
@ApiTags('userDevice')
export class userDeviceController {
    constructor(private readonly _userDevice: UserDeviceService) { }

    @Post('GetAllUserDevices')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Retrieving array with user devices of master', type: [userAddDeviceGenericResponse] })
    @ApiOperation({ summary: 'Returns a list of all user Devices listed on DB' })
     async getUserDevices(
        @Body() userDeviceRequest: userDeviceGetRequest
    ): Promise<any> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userDevice.getAllDevices(userDeviceRequest).then((e) => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return e;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }
    @Post('addOneDevice')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'adds one device to user master' })
    @ApiResponse({ status: 200, description: 'Update successfully executed', type: [userAddDeviceResponse] })
    async addOneUserDevice(
        @Body() userDeviceRequest: userDeviceDto
    ): Promise<userAddDeviceResponse> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userDevice.addOneDevice(userDeviceRequest).then(() => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return userAddDeviceDtoResponse;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }
    @Post('removeOneDevice')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'remove one device to user master' })
    @ApiResponse({ status: 200, description: 'Update successfully executed', type: [userAddDeviceResponse] })
    async removeOneUserDevice(
        @Body() userDeviceRequest: userDeviceDto
    ): Promise<userAddDeviceResponse> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userDevice.removeOneDevice(userDeviceRequest).then(() => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return userAddDeviceDtoResponse;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }

    @Post('updateOneDevice')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'update one device to user master' })
    @ApiResponse({ status: 200, description: 'Update successfully executed', type: [userAddDeviceResponse] })
    async updateOneUserDevice(
        @Body() userDeviceRequest: userDeviceDto
    ): Promise<userAddDeviceResponse> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userDevice.updateOneDevice(userDeviceRequest).then(() => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return userAddDeviceDtoResponse;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }


}