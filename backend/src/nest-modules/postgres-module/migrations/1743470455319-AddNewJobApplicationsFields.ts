import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewJobApplicationsFields1743470455319 implements MigrationInterface {
    name = 'AddNewJobApplicationsFields1743470455319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "companyName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ALTER COLUMN "companyName" SET NOT NULL`);
    }

}
