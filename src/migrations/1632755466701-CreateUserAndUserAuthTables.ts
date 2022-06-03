import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndUserAuthTables1632755466701
  implements MigrationInterface
{
  name = 'CreateUserAndUserAuthTables1632755466701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "middle_name" character varying, "last_name" character varying NOT NULL, "mother_name" character varying, "birthdate" TIMESTAMP NOT NULL, "phone" character varying, "avatar" character varying, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "users_auth_role_enum" AS ENUM('SUSPENSION_ROLE', 'USER_ROLE', 'ADMIN_ROLE', 'SU_ROLE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_auth" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "users_auth_role_enum" NOT NULL DEFAULT 'USER_ROLE', "pin_code" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "last_successful_logged_date" TIMESTAMP, "last_failed_logged_date" TIMESTAMP, "last_logout_date" TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "current_hashed_refresh_token" character varying, "is_email_confirmed" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "UQ_e408bc41761f8c34601a140899f" UNIQUE ("pin_code"), CONSTRAINT "UQ_06288dfa12f07342f17cc767287" UNIQUE ("email"), CONSTRAINT "REL_8d4681a2d24fe0a272f0f6cce7" UNIQUE ("user_id"), CONSTRAINT "PK_32ddc1ae708e8261a870a6eb3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_auth" ADD CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_auth" DROP CONSTRAINT "FK_8d4681a2d24fe0a272f0f6cce7f"`,
    );
    await queryRunner.query(`DROP TABLE "users_auth"`);
    await queryRunner.query(`DROP TYPE "users_auth_role_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
