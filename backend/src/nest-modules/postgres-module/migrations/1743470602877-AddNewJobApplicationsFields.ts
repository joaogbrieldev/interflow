import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewJobApplicationsFields1743470602877 implements MigrationInterface {
    name = 'AddNewJobApplicationsFields1743470602877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME COLUMN "companyName" TO "company_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME COLUMN "company_name" TO "companyName"`);
    }

}
