import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';

import { UserEntity } from '../../../modules/user/entities';
import { CONFIRM_REGISTRATION, MAIL_QUEUE } from '../constants';


@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(
    private readonly _configService: ConfigService,
    private readonly _mailerService: MailerService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job): void {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job): void {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any): void {
    this._logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(CONFIRM_REGISTRATION)
  public async confirmRegistration(
    job: Job<{ user: UserEntity; confirmUrl: string }>,
  ) {
    this._logger.log(
      `Sending confirm registration email to '${job.data.user.userAuth.email}'`,
    );

    try {
      return this._mailerService.sendMail({
        to: job.data.user.userAuth.email,
        from: this._configService.get('EMAIL_FROM'),
        subject: 'User registration',
        template: './registration',
        context: {
          confirmUrl: job.data.confirmUrl,
          recipientName: job.data.user.firstName,
          apiTitle: this._configService.get('APP_SITE_TITLE'),
          apiLogoUrl: this._configService.get('APP_SITE_LOGO_URL'),
          senderName: this._configService.get('APP_SITE_TITLE'),
          senderAddress: this._configService.get('APP_CONTACT_ADDRESS'),
          senderCity: this._configService.get('APP_CONTACT_CITY'),
          senderState: this._configService.get('APP_CONTACT_STATE_ABBR'),
          senderPostalCode: this._configService.get('APP_CONTACT_POSTAL_CODE'),
          contactUrl: this._configService.get('APP_CONTACT_URL'),
          unsubscribeUrl: this._configService.get('APP_UNSUBSCRIBE_URL'),
          unsubscribePreferencesUrl: this._configService.get(
            'APP_UNSUBSCRIBE_PREFERENCES_URL',
          ),
        },
      });
    } catch {
      this._logger.error(
        `Failed to send confirmation email to '${job.data.user.userAuth.email}'`,
      );
    }
  }
}
