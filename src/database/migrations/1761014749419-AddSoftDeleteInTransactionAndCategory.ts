import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDeleteInTransactionAndCategory1761014749419 implements MigrationInterface {
    name = 'AddSoftDeleteInTransactionAndCategory1761014749419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deletedAt"`);
    }

}
