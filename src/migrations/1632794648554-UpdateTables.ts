import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTables1632794648554 implements MigrationInterface {
  name = 'UpdateTables1632794648554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "birthdate" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."users" ALTER COLUMN "birthdate" SET NOT NULL`,
    );
  }
}
