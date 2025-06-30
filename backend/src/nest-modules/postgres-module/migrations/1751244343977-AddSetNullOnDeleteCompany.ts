import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSetNullOnDeleteCompany1751244343977 implements MigrationInterface {
    name = 'AddSetNullOnDeleteCompany1751244343977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD "companyDeleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "hackaton"."companies"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP COLUMN "companyDeleted"`);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "hackaton"."companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
