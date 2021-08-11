import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTypeColumn1628663179497 implements MigrationInterface {
    name = 'CreateTypeColumn1628663179497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "type"`);
    }

}
