import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTable1695395836026 implements MigrationInterface {
    name = 'UpdateTable1695395836026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."sellers_typesaler_enum" RENAME TO "sellers_typesaler_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."sellers_typesaler_enum" AS ENUM('privatePerson', 'business')`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" TYPE "public"."sellers_typesaler_enum" USING "typeSaler"::"text"::"public"."sellers_typesaler_enum"`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" SET DEFAULT 'privatePerson'`);
        await queryRunner.query(`DROP TYPE "public"."sellers_typesaler_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sellers_typesaler_enum_old" AS ENUM('privateTutor', 'legalEntity')`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" TYPE "public"."sellers_typesaler_enum_old" USING "typeSaler"::"text"::"public"."sellers_typesaler_enum_old"`);
        await queryRunner.query(`ALTER TABLE "sellers" ALTER COLUMN "typeSaler" SET DEFAULT 'privateTutor'`);
        await queryRunner.query(`DROP TYPE "public"."sellers_typesaler_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."sellers_typesaler_enum_old" RENAME TO "sellers_typesaler_enum"`);
    }

}
