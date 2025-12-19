import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleFieldInTransactions1765888162752 implements MigrationInterface {
    name = 'AddTitleFieldInTransactions1765888162752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "title"`);
    }

}
