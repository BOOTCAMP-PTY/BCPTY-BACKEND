import { QueryRunner } from 'typeorm';

const qr = {
  manager: {},
} as QueryRunner;

export class ConnectionMock {
  createQueryRunner(mode ?: 'master' | 'slave'): QueryRunner {
    return qr;
  }
}