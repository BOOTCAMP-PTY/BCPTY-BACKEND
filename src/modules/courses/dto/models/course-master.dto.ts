import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities';


export class CourseMasterDto {

    @ApiProperty({ description: 'User pin code' })
    readonly courseCollectionName: string;

    @ApiProperty({ description: 'User pin code' })
    readonly courseCollectionUserEmail: string;

    @ApiProperty({ description: 'rol user´s' })
    readonly courseCollectionDesc: string;

    @ApiProperty({ description: 'User email address' })
    readonly courseCollectionCategory: string;

    @ApiProperty({ description: 'User last successful logged date' })
    readonly courseCollectionReq: string;

    @ApiProperty({ description: 'User last failed logged date' })
    readonly courseCollectionRating: string;

    @ApiProperty({ description: 'User last logout date' })
    readonly courseCollectionIdiom: string;


    @ApiProperty({ description: 'User first name' })
    readonly authorUser: string;

    @ApiProperty({ description: 'User first name' })
    readonly authorEmail: string;


    @ApiProperty({ description: 'User birthdate' })
    readonly User: UserEntity;



    constructor(User:UserEntity) {

        this.User = User;
   
    }
}
