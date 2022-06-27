import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { UserCreateDto, UserDto } from '../dtos';
import { UserAuthEntity, UserEntity } from '../entities';
import { UserAuthService } from '../services';
import {
  generateHash,
  generateRandomInteger,
  isEmail,
  isNumeric,
  isUUID,
} from '../../../common/utils';
import { PageDto, PageOptionsDto } from '../../../common/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PinCodeGenerationErrorException } from '../exceptions';
import { RoleType } from '../constants/role-type.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _userAuthService: UserAuthService,
    private DataSourceService: DataSource,
  ) {}

  public async createUser(userCreateDto: any): Promise<any> {
    await this.DataSourceService.manager.transaction(
      async (transactionalEntityManager) => {
        const user = await transactionalEntityManager.save(
          UserEntity,
          userCreateDto,
        );
        const pinCode = await this._createPinCode();
        const password = await generateHash(user.password);
        const createdUser = { ...userCreateDto, user, pinCode, password };
        await transactionalEntityManager.save(UserAuthEntity, createdUser);

        return this.findUser({ uuid: user.uuid });
      },
    );

    //await this._userRepository.save(user);

    // const createdUser = { ...userCreateDto, user };

    //  await Promise.all([this._userAuthService.createUserAuth(createdUser)]);
  }
  private async _createPinCode(): Promise<number> {
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
  public async findUserAuth(
    options: Partial<{ pinCode: number; role: RoleType }>,
  ): Promise<UserEntity | undefined> {
    return this.findUser(options);
  }
  public async findUser(
    options: Partial<{ uuid: string; email: string; pinCode: number }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect('user.userAuth', 'userAuth');

    if (options.uuid && isUUID(options.uuid)) {
      queryBuilder.orWhere('user.uuid = :uuid', { uuid: options.uuid });
    }

    if (options.pinCode && isNumeric(options.pinCode)) {
      queryBuilder.orWhere('userAuth.pinCode = :pinCode', {
        pinCode: options.pinCode,
      });
    }

    if (options.email && isEmail(options.email)) {
      queryBuilder.orWhere('userAuth.email = :email', { email: options.email });
    }

    return queryBuilder.getOne();
  }

  public async getUser(uuid: string): Promise<UserEntity | undefined> {
    return this.findUser({ uuid });
  }
  public async getUserByMail(email: string): Promise<any | undefined> {
    return this.findUser({ email });
  }
  public async getUsers(options: PageOptionsDto): Promise<PageDto<UserDto>> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');

    const [users, itemCount] = await queryBuilder
      .orderBy('user.createdAt', options.order)
      .skip(options.skip)
      .take(options.take)
      .getManyAndCount();

    return;
  }
}
