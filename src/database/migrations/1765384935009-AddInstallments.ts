import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInstallments1765384935009 implements MigrationInterface {
    name = 'AddInstallments1765384935009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`);
        await queryRunner.query(`CREATE TYPE "public"."installments_status_enum" AS ENUM('paid', 'pending', 'overdue')`);
        await queryRunner.query(`CREATE TABLE "installments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "transactionId" uuid NOT NULL, "amount" numeric(12,2) NOT NULL, "status" "public"."installments_status_enum" NOT NULL, "dueDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "recurring"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_status_enum" AS ENUM('paid', 'pending', 'overdue')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "status" "public"."transactions_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "dueDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_6ce3503cb22a2a2cf13d002914b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_020dadd4a9ff06108743d65838d" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`);
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_020dadd4a9ff06108743d65838d"`);
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_6ce3503cb22a2a2cf13d002914b"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "recurring" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "installments"`);
        await queryRunner.query(`DROP TYPE "public"."installments_status_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
