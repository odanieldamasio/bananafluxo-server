import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInstallmentsDefault1765602298564 implements MigrationInterface {
    name = 'AddInstallmentsDefault1765602298564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "installments" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
