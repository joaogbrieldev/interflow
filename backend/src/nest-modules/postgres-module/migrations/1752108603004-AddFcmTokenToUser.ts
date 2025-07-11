import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFcmTokenToUser1752108603004 implements MigrationInterface {
  name = 'AddFcmTokenToUser1752108603004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hackaton"."users" ADD "fcm_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hackaton"."users" DROP COLUMN "fcm_token"`,
    );
  }
}
