import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserJobAppModels1744561280111 implements MigrationInterface {
    name = 'UpdateUserJobAppModels1744561280111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."users" RENAME COLUMN "id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."users" RENAME CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" TO "PK_96aac72f1574b88752e9fb00089"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME COLUMN "id" TO "job_application_id"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME CONSTRAINT "PK_c56a5e86707d0f0df18fa111280" TO "PK_474fd4ba2ff77238434570c6630"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME CONSTRAINT "PK_474fd4ba2ff77238434570c6630" TO "PK_c56a5e86707d0f0df18fa111280"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" RENAME COLUMN "job_application_id" TO "id"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."users" RENAME CONSTRAINT "PK_96aac72f1574b88752e9fb00089" TO "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."users" RENAME COLUMN "user_id" TO "id"`);
    }

}
