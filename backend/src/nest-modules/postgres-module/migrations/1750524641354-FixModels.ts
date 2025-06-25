import { MigrationInterface, QueryRunner } from "typeorm";

export class FixModels1750524641354 implements MigrationInterface {
    name = 'FixModels1750524641354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "initialScreen"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "technicalInterviewDate"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "interviewFeedback"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "scheduled_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "initial_screen" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "interviewer_name" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "interview_link" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "feedback" text`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "notes" text`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "job_application_id" uuid`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "position" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "applied_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TYPE "hackaton"."interviews_status_enum" RENAME TO "interviews_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "hackaton"."interviews_status_enum" AS ENUM('sent', 'technical_test', 'technical_interview', 'proposal', 'scheduled')`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" TYPE "hackaton"."interviews_status_enum" USING "status"::"text"::"hackaton"."interviews_status_enum"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" SET DEFAULT 'scheduled'`);
        await queryRunner.query(`DROP TYPE "hackaton"."interviews_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "link" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "status" SET DEFAULT 'APPLIED'`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD CONSTRAINT "FK_f38d5158168b9984c9c17d4d3d5" FOREIGN KEY ("job_application_id") REFERENCES "hackaton"."job_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "hackaton"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP CONSTRAINT "FK_f38d5158168b9984c9c17d4d3d5"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "link" SET NOT NULL`);
        await queryRunner.query(`CREATE TYPE "hackaton"."interviews_status_enum_old" AS ENUM('sent', 'technical_test', 'technical_interview', 'proposal')`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" TYPE "hackaton"."interviews_status_enum_old" USING "status"::"text"::"hackaton"."interviews_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "status" SET DEFAULT 'sent'`);
        await queryRunner.query(`DROP TYPE "hackaton"."interviews_status_enum"`);
        await queryRunner.query(`ALTER TYPE "hackaton"."interviews_status_enum_old" RENAME TO "interviews_status_enum"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ALTER COLUMN "type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "company_id"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "applied_at"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "job_application_id"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "feedback"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "interview_link"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "interviewer_name"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "initial_screen"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" DROP COLUMN "scheduled_date"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "interviewFeedback" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "technicalInterviewDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."interviews" ADD "initialScreen" date NOT NULL`);
    }

}
