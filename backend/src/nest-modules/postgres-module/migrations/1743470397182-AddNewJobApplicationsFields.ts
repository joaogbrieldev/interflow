import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewJobApplicationsFields1743470397182 implements MigrationInterface {
    name = 'AddNewJobApplicationsFields1743470397182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "companyName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "directContact" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "interviewDate" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "companyFeedback" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "userFellings" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "userFellings"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "companyFeedback"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "interviewDate"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "directContact"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "companyName"`);
    }

}
