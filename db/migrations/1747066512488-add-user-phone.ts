import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1747066512488 implements MigrationInterface {
    name = 'AddUserPhone1747066512488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
