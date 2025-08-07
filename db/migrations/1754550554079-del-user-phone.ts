import { MigrationInterface, QueryRunner } from "typeorm";

export class DelUserPhone1754550554079 implements MigrationInterface {
    name = 'DelUserPhone1754550554079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
