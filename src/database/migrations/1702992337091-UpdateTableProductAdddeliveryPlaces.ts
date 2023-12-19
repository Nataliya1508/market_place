import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableProductAdddeliveryPlaces1702992337091 implements MigrationInterface {
    name = 'UpdateTableProductAdddeliveryPlaces1702992337091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "deliveryPlaces" json`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deliveryPlaces"`);
    }

}
