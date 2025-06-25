import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertNameInJobModel1750809970463 implements MigrationInterface {
    name = 'InsertNameInJobModel1750809970463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "name"`);
    }

}
