import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTypeColumn1628645936163 implements MigrationInterface {
    name = 'CreateTypeColumn1628645936163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "email" character varying NOT NULL`);
    }

}
