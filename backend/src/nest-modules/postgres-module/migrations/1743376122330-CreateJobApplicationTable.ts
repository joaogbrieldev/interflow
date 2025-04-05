import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobApplicationTable1743376122330 implements MigrationInterface {
    name = 'CreateJobApplicationTable1743376122330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "hackaton"."job_applications_status_enum" AS ENUM('applied', 'screening', 'interview', 'technical_interview', 'offer', 'accepted', 'rejected', 'withdrawn')`);
        await queryRunner.query(`CREATE TABLE "hackaton"."job_applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "link" character varying NOT NULL, "status" "hackaton"."job_applications_status_enum" NOT NULL DEFAULT 'applied', "salary" numeric(10,2) NOT NULL, "is_equity" boolean NOT NULL DEFAULT false, "is_international" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_c56a5e86707d0f0df18fa111280" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71763b46a8e2cbb09972674f8a" ON "hackaton"."job_applications" ("type") `);
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" ADD CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db" FOREIGN KEY ("user_id") REFERENCES "hackaton"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hackaton"."job_applications" DROP CONSTRAINT "FK_fcfc78a3be953dac2443b9b53db"`);
        await queryRunner.query(`DROP INDEX "hackaton"."IDX_71763b46a8e2cbb09972674f8a"`);
        await queryRunner.query(`DROP TABLE "hackaton"."job_applications"`);
        await queryRunner.query(`DROP TYPE "hackaton"."job_applications_status_enum"`);
    }

}
