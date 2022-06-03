import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces';


export class PageMetaDto {
  @ApiProperty({ description: 'Current page' })
  readonly page: number;

  @ApiProperty({ description: 'Records per page' })
  readonly take: number;

  @ApiProperty({ description: 'Total records' })
  readonly itemCount: number;

  @ApiProperty({ description: 'Total pages' })
  readonly pageCount: number;

  @ApiProperty({
    description: 'Whether current object has a next page to be shown',
  })
  readonly hasNextPage: boolean;

  @ApiProperty({
    description: 'Whether current object has a previous page to be shown',
  })
  readonly hasPreviousPage: boolean;

  constructor({ options, itemCount }: PageMetaDtoParameters) {
    this.page = options.page;
    this.take = options.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
