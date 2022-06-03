import 'source-map-support/register';

import _ from 'lodash';
import { AbstractDto } from '../common/dtos';
import { AbstractEntity } from '../common/entities';

declare global {
  interface Array<T> {
    toDtos<B extends AbstractDto>(this: AbstractEntity<B>[]): B[];
  }
}

Array.prototype.toDtos = function <B extends AbstractDto>(options?: any): B[] {
  return <B[]>_(this)
    .map((item) => item.toDto(options))
    .compact()
    .value();
}