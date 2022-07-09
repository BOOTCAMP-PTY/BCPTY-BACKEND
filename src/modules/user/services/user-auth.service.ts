import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { RoleType } from '../constants/role-type.constant';
import { UserAuthEntity, UserEntity } from '../../user/entities';
import {
  PinCodeGenerationErrorException,
} from '../../user/exceptions';
import { UserService } from '../../user/services';
import { generateRandomInteger } from '../../../common/utils';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuthEntity)
    private readonly _userAuthRepository: Repository<UserAuthEntity>,
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService
  ) {}


  public async findUserAuth(
    options: Partial<{ pinCode: number; role: RoleType }>,
  ): Promise<UserEntity | undefined> {
    return this._userService.findUser(options);
  }

  public async markEmailAsConfirmed(email: string): Promise<UpdateResult> {
    return this._userAuthRepository.update(
      { email },
      { isEmailConfirmed: true },
    );
  }

  public async updateRefreshToken(
    userAuthId: number,
    currentHashedRefreshToken: string,
  ): Promise<UpdateResult> {
    return this._userAuthRepository.update(userAuthId, {
      currentHashedRefreshToken,
    });
  }

  public async _createPinCode(): Promise<number> {
    const pinCode = this._generatePinCode();
    const user = await this.findUserAuth({ pinCode });

    try {
      return user ? await this._createPinCode() : pinCode;
    } catch (error) {
      throw new PinCodeGenerationErrorException(error);
    }
  }

  private _generatePinCode(): number {
    return generateRandomInteger(1, 10e5 - 1);
  }
}
