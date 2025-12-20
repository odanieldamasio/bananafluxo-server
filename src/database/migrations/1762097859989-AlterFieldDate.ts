import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterFieldDate1762097859989 implements MigrationInterface {
    name = 'AlterFieldDate1762097859989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "date" date NOT NULL`);
    }

}
