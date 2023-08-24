import { MigrationInterface, QueryRunner } from "typeorm";

export class NewBase1692878556423 implements MigrationInterface {
    name = 'NewBase1692878556423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('seller', 'buyer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "salers" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "typeSaler" character varying NOT NULL DEFAULT '', "address" character varying NOT NULL, "workingHours" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "logo" character varying NOT NULL DEFAULT '', "aboutUs" character varying NOT NULL DEFAULT '', "contactPerson" integer NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_3b9b2ad1c2ad2143b85aa4951e2" UNIQUE ("email"), CONSTRAINT "PK_dfaf603cc49ae7da512373d9e10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
