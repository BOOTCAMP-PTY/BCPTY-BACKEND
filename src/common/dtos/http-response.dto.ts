import { ApiProperty } from "@nestjs/swagger";
import { ResponseName } from "../constants/response.constant";

export class SuccessResponse {

    @ApiProperty({
        example: ResponseName.SUCCESS,
        description: 'status',
    })
    status: string;
    @ApiProperty({
        description: 'status',
    })
    message?: string;

    @ApiProperty({
        description: 'could contain some info',        
    })
    data?: object;
    
}