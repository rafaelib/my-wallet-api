import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypeColumn1628667886026 implements MigrationInterface {
    name = 'ChangeTypeColumn1628667886026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "date" TIMESTAMP NOT NULL`);
    }

}
