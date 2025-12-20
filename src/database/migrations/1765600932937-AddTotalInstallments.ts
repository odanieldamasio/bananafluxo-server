import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalInstallments1765600932937 implements MigrationInterface {
    name = 'AddTotalInstallments1765600932937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "totalInstallments" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "totalInstallments"`);
    }

}
