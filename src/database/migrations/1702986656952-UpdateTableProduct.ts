// import { MigrationInterface, QueryRunner } from "typeorm";

// export class UpdateTableProduct1702986656952 implements MigrationInterface {
//     name = 'UpdateTableProduct1702986656952'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "name"`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "lastName"`);
//         await queryRunner.query(`ALTER TABLE "products" ADD "isActive" boolean`);
//         await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
//         await queryRunner.query(`DROP TYPE "public"."categories_name_enum"`);
//         await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_53f05cdb774e5f5fed11ad904c0"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "image" SET DEFAULT 'https://res.cloudinary.com/debx785xm/image/upload/v1698740839/xqj2utbevda5n8hfjkxf.jpg'`);
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '[object Object]'`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
//         await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "image" SET DEFAULT ''`);
//         await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_53f05cdb774e5f5fed11ad904c0" UNIQUE ("phoneNumber")`);
//         await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
//         await queryRunner.query(`CREATE TYPE "public"."categories_name_enum" AS ENUM('Meat', 'Dairy', 'Cheeses', 'Fruits & Vegetables', 'Eggs', 'Grocery', 'Drinks', 'Craft food')`);
//         await queryRunner.query(`ALTER TABLE "categories" ADD "name" "public"."categories_name_enum" NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isActive"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "lastName" character varying NOT NULL DEFAULT ''`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "name" character varying NOT NULL`);
//     }

// }
