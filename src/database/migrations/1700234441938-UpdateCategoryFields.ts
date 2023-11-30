// import { MigrationInterface, QueryRunner } from "typeorm";

// export class UpdateCategoryFields1700234441938 implements MigrationInterface {
//     name = 'UpdateCategoryFields1700234441938'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "contactPerson"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "contactPerson" character varying`);
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "contactPerson"`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD "contactPerson" integer`);
//     }

// }
