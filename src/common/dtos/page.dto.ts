import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @ApiProperty({ description: 'Items list', isArray: true })
  @IsArray()
  readonly data: T[];

  @ApiProperty({
    description: 'Meta information object',
    type: () => PageMetaDto,
  })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
