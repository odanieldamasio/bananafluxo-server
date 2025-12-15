import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInstallmentNumber1765594639373 implements MigrationInterface {
    name = 'AddInstallmentNumber1765594639373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" ADD "installmentNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP COLUMN "installmentNumber"`);
    }

}
