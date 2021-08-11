import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDescriptionColumn1628663491103 implements MigrationInterface {
    name = 'CreateDescriptionColumn1628663491103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "description"`);
    }

}
