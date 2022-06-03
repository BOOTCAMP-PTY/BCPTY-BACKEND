import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtConfirmTokenGuard extends AuthGuard('jwt-confirm-token') {}
