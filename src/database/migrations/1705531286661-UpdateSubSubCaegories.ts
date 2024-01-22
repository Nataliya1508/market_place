import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSubSubCaegories1705531286661 implements MigrationInterface {
    name = 'UpdateSubSubCaegories1705531286661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-subcategories" RENAME COLUMN "subCategory" TO "name"`);
        await queryRunner.query(`ALTER TYPE "public"."sub-subcategories_subcategory_enum" RENAME TO "sub-subcategories_name_enum"`);
        // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '[object Object]'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-subcategories" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" ADD "name" "public"."sub-subcategories_name_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`ALTER TYPE "public"."sub-subcategories_name_enum" RENAME TO "sub-subcategories_subcategory_enum"`);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" RENAME COLUMN "name" TO "subCategory"`);
    }

}
