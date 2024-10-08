import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableProductDel1702989698083 implements MigrationInterface {
    name = 'UpdateTableProductDel1702989698083'

    // public async up(queryRunner: QueryRunner): Promise<void> {
    //     await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deliveryTypes" DROP NOT NULL`);
    //     await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
    // }
        // public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "products" ADD "deliveryTypes" DROP NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
    // }
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hasDeliveryTypesColumn = await queryRunner.hasColumn("products", "deliveryTypes");

        if (!hasDeliveryTypesColumn) {
            await queryRunner.query(`ALTER TABLE "products" ADD "deliveryTypes" json NOT NULL`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "deliveryTypes" SET NOT NULL`);
    }

}
