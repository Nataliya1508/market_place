// import { MigrationInterface, QueryRunner } from "typeorm";

// export class UpdateSellersTable1701338425190 implements MigrationInterface {
//     name = 'UpdateSellersTable1701338425190'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "name" character varying NOT NULL`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "lastName" character varying NOT NULL DEFAULT ''`);
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '[object Object]'`);
//         await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "image" SET DEFAULT 'https://res.cloudinary.com/debx785xm/image/upload/v1698740839/xqj2utbevda5n8hfjkxf.jpg'`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "contactPerson"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "contactPerson" character varying`);
//         await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_53f05cdb774e5f5fed11ad904c0"`);
//         await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" SET DEFAULT ''`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" DROP DEFAULT`);
//         await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_53f05cdb774e5f5fed11ad904c0" UNIQUE ("phoneNumber")`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "contactPerson"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "contactPerson" integer`);
//         await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "image" SET DEFAULT ''`);
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "lastName"`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "name"`);
//     }

// }
