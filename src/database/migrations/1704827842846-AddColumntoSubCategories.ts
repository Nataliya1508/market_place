import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumntoSubCategories1704827842846 implements MigrationInterface {
    name = 'AddColumntoSubCategories1704827842846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-categories" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deliveryTypes" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '[object Object]'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deliveryTypes" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub-categories" DROP COLUMN "name"`);
    }

}
