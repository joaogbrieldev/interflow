import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyModel1748342587436 implements MigrationInterface {
    name = 'CompanyModel1748342587436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "hackaton"."interviews_status_enum" AS ENUM('sent', 'technical_test', 'technical_interview', 'proposal')`);
        await queryRunner.query(`CREATE TABLE "hackaton"."interviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "initialScreen" date NOT NULL, "technicalInterviewDate" date NOT NULL, "interviewFeedback" character varying NOT NULL, "status" "hackaton"."interviews_status_enum" NOT NULL DEFAULT 'sent', "type" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_fd41af1f96d698fa33c2f070f47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88bf14c15ca67e0c5b2c77af62" ON "hackaton"."interviews" ("type") `);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" DROP COLUMN "initialScreen"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" DROP COLUMN "technicalInterviewDate"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" DROP COLUMN "interviewFeedback"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD CONSTRAINT "FK_b6fa4e1fab2f948fb14c736cd7a" FOREIGN KEY ("user_id") REFERENCES "hackaton"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP CONSTRAINT "FK_b6fa4e1fab2f948fb14c736cd7a"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ADD "interviewFeedback" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ADD "technicalInterviewDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ADD "initialScreen" date NOT NULL`);
        await queryRunner.query(`DROP INDEX "hackaton"."IDX_88bf14c15ca67e0c5b2c77af62"`);
        await queryRunner.query(`DROP TABLE "hackaton"."interviews"`);
        await queryRunner.query(`DROP TYPE "hackaton"."interviews_status_enum"`);
    }

}
