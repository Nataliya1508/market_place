import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteColumnToSubCategories1704829108898 implements MigrationInterface {
    name = 'DeleteColumnToSubCategories1704829108898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub-categories" DROP COLUMN "subCategory"`);
        await queryRunner.query(`DROP TYPE "public"."sub-categories_subcategory_enum"`);
        // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT '[object Object]'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`CREATE TYPE "public"."sub-categories_subcategory_enum" AS ENUM('Tea', 'Coffee', 'Water, Juice & Soft Drinks', 'Fresh', 'Soft', 'Semi-hard', 'Hard', 'Blue', 'Salty', 'Sweet', 'Milk', 'Other Dairy', 'Chicken', 'Quail', 'Fruits', 'Vegetables', 'Greens', 'Cereals', 'Pasta', 'Spices', 'Flour', 'Oil', 'Fresh Meat', 'Sausages')`);
        await queryRunner.query(`ALTER TABLE "sub-categories" ADD "subCategory" "public"."sub-categories_subcategory_enum" NOT NULL`);
    }

}
