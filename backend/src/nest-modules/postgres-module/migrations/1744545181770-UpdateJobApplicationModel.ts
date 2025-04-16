import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateJobApplicationModel1744545181770 implements MigrationInterface {
    name = 'UpdateJobApplicationModel1744545181770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "directContact"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "interviewDate"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "companyFeedback"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "userFellings"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db" FOREIGN KEY ("user_id") REFERENCES "hackaton"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db" FOREIGN KEY ("user_id") REFERENCES "hackaton"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "userFellings" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "companyFeedback" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "interviewDate" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "directContact" character varying`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "company_name" character varying`);
    }

}
