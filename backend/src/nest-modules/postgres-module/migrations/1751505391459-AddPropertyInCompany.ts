import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertyInCompany1751505391459 implements MigrationInterface {
    name = 'AddPropertyInCompany1751505391459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."companies" DROP COLUMN "country"`);
    }

}
