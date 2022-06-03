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
import { ResponseCode } from 'src/common/constants/response.constant';
import { userArchiveAddRequest } from '../dto/request/user_archive_add_request.dto';
import { userArchiveGetRequest } from '../dto/request/user_archive_get_request.dto';
import { userAddDeviceResponse } from '../dto/response/user_add_device_response.dto';
import { userAddDeviceGenericResponse } from '../dto/response/user_device_response.dto';
import { UserArchiveService } from '../services/user_archive.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('userArchives')
@ApiTags('userArchives')
export class userArchiveController {
    constructor(private readonly _userArchive: UserArchiveService) { }

    @Post('GetAllUserArchives')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Retrieving array with user devices of master', type: [userAddDeviceGenericResponse] })
    @ApiOperation({ summary: 'Returns a list of all user Devices listed on DB' })
     async getUserDevices(
        @Body() userGetRequest: userArchiveGetRequest
    ): Promise<any> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userArchive.getAllArchives(userGetRequest).then((e) => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return e;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }

    @Post('addUserArchive')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Retrieving array with user devices of master', type: [userAddDeviceGenericResponse] })
    @ApiOperation({ summary: 'Returns a list of all user Devices listed on DB' })
     async addUserArchive(
        @Body() userAddRequest: userArchiveAddRequest
    ): Promise<any> {
        const userAddDeviceDtoResponse = new userAddDeviceResponse;
        return await this._userArchive.addOneArchive(userAddRequest).then((e) => {
            userAddDeviceDtoResponse.Status = ResponseCode.SUCCESS;
            return e;
        })
            .catch(err => {
                userAddDeviceDtoResponse.Status = ResponseCode.FAIL;
                return userAddDeviceDtoResponse;
            });
    }
 
}