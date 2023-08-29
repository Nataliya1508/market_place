import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1693328398801 implements MigrationInterface {
    name = 'UpdateTables1693328398801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."buyers_role_enum" AS ENUM('seller', 'buyer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "buyers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "role" "public"."buyers_role_enum" NOT NULL DEFAULT 'buyer', "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_c63a289e65c35c1971da0c2f7bd" UNIQUE ("email"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "salers" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "typeSaler" character varying NOT NULL DEFAULT '', "address" character varying NOT NULL, "workingHours" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "logo" character varying NOT NULL DEFAULT '', "aboutUs" character varying NOT NULL DEFAULT '', "contactPerson" integer NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_3b9b2ad1c2ad2143b85aa4951e2" UNIQUE ("email"), CONSTRAINT "PK_dfaf603cc49ae7da512373d9e10" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "salers"`);
        await queryRunner.query(`DROP TABLE "buyers"`);
        await queryRunner.query(`DROP TYPE "public"."buyers_role_enum"`);
    }

}
