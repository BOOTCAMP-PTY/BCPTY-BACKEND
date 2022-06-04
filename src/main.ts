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
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { HttpExceptionFilter, QueryFailedFilter } from './filters';
import { AppModule } from './modules/app';

import { setupSwagger } from './utils/swagger';


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
  setupSwagger(app);

  await app.listen(configService.get('APP_PORT'));
  Logger.log(
    `Application is running on: ${(await app.getUrl()).removeSlashAtEnd + '/'
    }${configService.get('APP_PREFIX')}`,
    'InstanceLoader',
  );
}

void bootstrap();
