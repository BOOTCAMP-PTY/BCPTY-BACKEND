import { Injectable } from '@nestjs/common';
import { userArchiveDto } from '../dto/models/user_archive.dto';
import { userArchiveAddRequest } from '../dto/request/user_archive_add_request.dto';
import { userArchiveGetRequest } from '../dto/request/user_archive_get_request.dto';
import { userArchiveRepository } from '../repositories/user_archive.repository';


@Injectable()
export class UserArchiveService {
  constructor(
    private readonly _userArchiveRepository: userArchiveRepository
  ) { }

  public async getAllArchives(userGetRequest:userArchiveGetRequest): Promise<any> {
    const queryBuilder = this._userArchiveRepository.createQueryBuilder('user_archives')
    .where("email_master = :email", { email: userGetRequest.userMasterEmail }).execute()
    return queryBuilder;

  }
  public async addOneArchive(UserAddRequest: userArchiveAddRequest): Promise<any> {
    const archive = UserAddRequest;
    const user = this._userArchiveRepository.create(archive);
    return await this._userArchiveRepository.save(user);
  }


}



