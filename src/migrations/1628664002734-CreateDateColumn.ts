import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDateColumn1628664002734 implements MigrationInterface {
    name = 'CreateDateColumn1628664002734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "date"`);
    }

}
