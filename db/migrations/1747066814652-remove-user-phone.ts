import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserPhone1747066814652 implements MigrationInterface {
    name = 'RemoveUserPhone1747066814652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
