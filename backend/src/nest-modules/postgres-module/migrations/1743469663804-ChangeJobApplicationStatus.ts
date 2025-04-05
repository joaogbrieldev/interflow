import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeJobApplicationStatus1743469663804 implements MigrationInterface {
    name = 'ChangeJobApplicationStatus1743469663804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "hackaton"."job_applications_status_enum"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "hackaton"."job_applications_status_enum" AS ENUM('applied', 'screening', 'interview', 'technical_interview', 'offer', 'accepted', 'rejected', 'withdrawn')`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "status" "hackaton"."job_applications_status_enum" NOT NULL DEFAULT 'applied'`);
    }

}
