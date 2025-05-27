import { MigrationInterface, QueryRunner } from 'typeorm';

export class InterviewModel1748342005356 implements MigrationInterface {
  name = 'InterviewModel1748342005356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hackaton"."companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" json NOT NULL, "contact" json NOT NULL, "website" character varying NOT NULL DEFAULT false, "type" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e57cd6c6afae8f303847f159d" ON "hackaton"."companies" ("type") `,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "phone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "contact"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "website"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "phone" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "contact" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "website" character varying NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "initialScreen" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "technicalInterviewDate" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "interviewFeedback" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD CONSTRAINT "FK_ee0839cba07cb0c52602021ad4b" FOREIGN KEY ("user_id") REFERENCES "hackaton"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP CONSTRAINT "FK_ee0839cba07cb0c52602021ad4b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "interviewFeedback"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "technicalInterviewDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "initialScreen"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "website"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "contact"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "phone"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "website" character varying NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "contact" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "phone" json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hackaton"."companies" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "hackaton"."IDX_1e57cd6c6afae8f303847f159d"`,
    );
    await queryRunner.query(`DROP TABLE "hackaton"."companies"`);
  }
}
