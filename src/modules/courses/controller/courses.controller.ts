import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  ResponseCode,
  responseKey,
  ResponseName,
} from 'src/common/constants/response.constant';
import { SuccessResponse } from 'src/common/dtos/http-response.dto';

import { JwtAccessTokenGuard } from 'src/modules/auth/guards';
import { CourseCreateDto } from '../dto/models/courses-create.dto';
import { CourseIndvRequestDto } from '../dto/request/course-ind.dto';
import { CourseLessonGetRequestDto } from '../dto/request/course-lesson-get-dto';
import { CourseLessonsGetRequestDto } from '../dto/request/course-lessons-get-dto';
import { CourseService } from '../services/courses.service';

@Controller({ path: 'courses', version: '1' })
@ApiTags('courses')
@UseInterceptors(ClassSerializerInterceptor)
export class CoursesController {
  @Inject(CourseService)
  private readonly _courseService: CourseService;

  @Post('createMasterCourse')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully Registered Course',
    status: HttpStatus.OK,
    type: SuccessResponse,
  })
  @ApiOperation({ summary: 'Registers a new course' })
  @UseGuards(JwtAccessTokenGuard)
  async register(
    @Body() courserRegistrationDto: CourseCreateDto,
    @Res() res: Response,
  ): Promise<any> {
    const resultAdded = await this._courseService.createCourseMaster(
      courserRegistrationDto,
    );
    res
      .status(HttpStatus.OK)
      .json({
        [responseKey.STATUS]: ResponseCode.SUCCESS_CODE,
        [responseKey.MESSAGE]: ResponseName.SUCCESS,
        [responseKey.DATA]: resultAdded,
      })
      .send();
  }

  @Post('addSubCourse')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully Registered',
    status: HttpStatus.OK,
    type: SuccessResponse,
  })
  @ApiOperation({ summary: 'Registers a new lesson into a course' })
  @UseGuards(JwtAccessTokenGuard)
  async addCourse(
    @Body() courserRegistrationDto: CourseIndvRequestDto,
    @Res() res: Response,
  ): Promise<any> {
    await this._courseService.addSubCourse(courserRegistrationDto);
    res
      .status(HttpStatus.OK)
      .json({
        [responseKey.STATUS]: ResponseCode.SUCCESS_CODE,
        [responseKey.MESSAGE]: ResponseName.SUCCESS,
      })
      .send();
  }

  @Post('getListLesson')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully Registered',
    status: HttpStatus.OK,
    type: SuccessResponse,
  })
  @ApiOperation({ summary: 'retrieves a complete list about all the courses' })
  @UseGuards(JwtAccessTokenGuard)
  async getListLesson(
    @Body() courserRegistrationDto: CourseLessonGetRequestDto,
    @Res() res: Response,
  ): Promise<any> {
    const resultLessons = await this._courseService.getListLesson(
      courserRegistrationDto,
    );

    res
      .status(HttpStatus.OK)
      .json({
        [responseKey.STATUS]: ResponseCode.SUCCESS_CODE,
        [responseKey.MESSAGE]: ResponseName.SUCCESS,
        [responseKey.DATA]: resultLessons,
      })
      .send();
  }

  @Post('getListLessons')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully Registered',
    status: HttpStatus.OK,
    type: SuccessResponse,
  })
  @ApiOperation({ summary: 'retrieves a complete list about all the courses' })
  @UseGuards(JwtAccessTokenGuard)
  async getListLessons(
    @Body() courserRegistrationDto: CourseLessonsGetRequestDto,
    @Res() res: Response,
  ): Promise<any> {
    const resultLessons = await this._courseService.getListLessons(
      courserRegistrationDto,
    );

    res
      .status(HttpStatus.OK)
      .json({
        [responseKey.STATUS]: ResponseCode.SUCCESS_CODE,
        [responseKey.MESSAGE]: ResponseName.SUCCESS,
        [responseKey.DATA]: resultLessons,
      })
      .send();
  }
}
