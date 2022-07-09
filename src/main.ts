import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import RateLimit from 'express-rate-limit';

import  helmet from 'helmet';

import * as morgan from 'morgan';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { HttpExceptionFilter, QueryFailedFilter } from './common/filters';
import { AppModule } from './app';
import { SnakeNamingStrategy } from './modules/database/strategies';
import { UserAuthEntity, UserEntity } from './modules/user/entities';

import { setupSwagger } from './common/utils/swagger';
import { CourseMaster } from './modules/courses/entities/course-master.entity';
import { CourseIndividual } from './modules/courses/entities/course.entity';


async function bootstrap(): Promise<void> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );
  const configService = app.get(ConfigService);

  // Base URL
  app.setGlobalPrefix(configService.get('APP_PREFIX'));

  // Deployment
  app.enable('trust proxy');
  
  const ormdbconfig: DataSourceOptions = {
    name: 'default',
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      UserEntity,
      UserAuthEntity,
      CourseMaster,
      CourseIndividual],
    migrations: ["dist/migration/**/*.js"],
    migrationsRun: true,
    synchronize: false,
    logging: true,

  };
  const AppDataSource = new DataSource(ormdbconfig)
  AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })


  // Security
  app.use(cookieParser());
  app.use(helmet());
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'));

  const reflector = app.get(Reflector);

  // Serialization
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Global exception handling
  app.useGlobalFilters(
    new HttpExceptionFilter(reflector),
    new QueryFailedFilter(reflector),
  );

    // Documentation
  if (configService.get('APP_ENV') !== 'production') {
    setupSwagger(app);
  }
const portApp =  process.env.PORT || configService.get('APP_PORT');



  await app.listen(portApp);
  Logger.log(
    `Application is running on: ${(await app.getUrl()).removeSlashAtEnd + '/'}${configService.get('APP_PREFIX')}, 
    PORT API ${portApp} PORT 2:  ${process.env.PORT}`,
    'InstanceLoader',
  );
}

void bootstrap();
