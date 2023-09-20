import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1695202043794 implements MigrationInterface {
    name = 'CreateTables1695202043794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."salers_typesaler_enum" AS ENUM('privateTutor', 'legalEntity')`);
        await queryRunner.query(`CREATE TABLE "salers" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "typeSaler" "public"."salers_typesaler_enum" NOT NULL DEFAULT 'privateTutor', "address" character varying NOT NULL, "workingHours" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "logo" character varying NOT NULL DEFAULT '', "aboutUs" character varying NOT NULL DEFAULT '', "contactPerson" integer NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_3b9b2ad1c2ad2143b85aa4951e2" UNIQUE ("email"), CONSTRAINT "REL_163582968389f35542d88f5077" UNIQUE ("userId"), CONSTRAINT "PK_dfaf603cc49ae7da512373d9e10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "phoneNumber" integer NOT NULL, "address" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', "buyerId" integer, "sellerId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_0a7059be4bd655c2ba370b8886" UNIQUE ("buyerId"), CONSTRAINT "REL_c9ceb2ea9a5df49b0d830fa765" UNIQUE ("sellerId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "address" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "UQ_545e00f05d8af4c162fc52c8892" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "buyers" ALTER COLUMN "lastName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "salers" ADD CONSTRAINT "FK_163582968389f35542d88f5077a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a7059be4bd655c2ba370b8886e" FOREIGN KEY ("buyerId") REFERENCES "buyers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c9ceb2ea9a5df49b0d830fa7653" FOREIGN KEY ("sellerId") REFERENCES "salers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c9ceb2ea9a5df49b0d830fa7653"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a7059be4bd655c2ba370b8886e"`);
        await queryRunner.query(`ALTER TABLE "salers" DROP CONSTRAINT "FK_163582968389f35542d88f5077a"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "phoneNumber" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber")`);
        await queryRunner.query(`ALTER TABLE "buyers" ALTER COLUMN "lastName" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "UQ_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "address" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "image" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "buyers"`);
        await queryRunner.query(`DROP TABLE "salers"`);
        await queryRunner.query(`DROP TYPE "public"."salers_typesaler_enum"`);
    }

}
