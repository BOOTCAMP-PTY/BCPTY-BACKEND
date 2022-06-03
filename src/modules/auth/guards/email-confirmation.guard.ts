import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUserInterface } from '../interfaces';


@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: RequestWithUserInterface = context
      .switchToHttp()
      .getRequest();

    if (!request.user?.userAuth?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
