import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Order } from '../constants';


export class PageOptionsDto {
  @ApiPropertyOptional({
    description: 'Paging options for sorting the items',
    enum: Order,
    default: Order.ASC,
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    description: 'Current object page',
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    description: 'Records per page to be shown',
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  @ApiPropertyOptional({
    description: 'Additional query criteria to filter current object',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly q?: string;
}
