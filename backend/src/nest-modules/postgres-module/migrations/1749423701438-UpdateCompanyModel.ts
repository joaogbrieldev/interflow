import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCompanyModel1749423701438 implements MigrationInterface {
    name = 'UpdateCompanyModel1749423701438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "website" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "website" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "website" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "website" SET NOT NULL`);
    }

}
