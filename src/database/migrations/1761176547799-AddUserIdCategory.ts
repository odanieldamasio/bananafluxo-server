import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSoftDeleteInTransactionAndCategory1761176547799
  implements MigrationInterface
{
  name = 'AddSoftDeleteInTransactionAndCategory1761176547799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "userId"`);
  }
}
