import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { UserCreateDto, UserDto } from '../dtos';
import { UserEntity } from '../entities';
import { UserAuthService } from '../services';
import { isEmail, isNumeric, isUUID } from '../../../common/utils';
import { PageDto, PageMetaDto, PageOptionsDto } from '../../../common/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
    private readonly _userAuthService: UserAuthService,
  ) {}

  @Transactional()
  public async createUser(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const user = this._userRepository.create(userCreateDto);
    await this._userRepository.save(user);

    const createdUser = { ...userCreateDto, user };

    await Promise.all([this._userAuthService.createUserAuth(createdUser)]);

    return this.findUser({ uuid: user.uuid });
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
  public async getUserByMail(email: string): Promise< any | undefined> {
    return this.findUser({ email});
  }
  public async getUsers(options: PageOptionsDto): Promise<PageDto<UserDto>> {
    const queryBuilder = this._userRepository.createQueryBuilder('user');

    const [users, itemCount] = await queryBuilder
      .orderBy('user.createdAt', options.order)
      .skip(options.skip)
      .take(options.take)
      .getManyAndCount();

    return new PageDto(users.toDtos(), new PageMetaDto({ options, itemCount }));
  }
}
