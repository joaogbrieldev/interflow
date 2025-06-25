import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRequiredFieldInCompanyModel1750814243653 implements MigrationInterface {
    name = 'ChangeRequiredFieldInCompanyModel1750814243653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "contact" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "contact" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
