// import { MigrationInterface, QueryRunner } from "typeorm";

// export class UpdateTables1696628690083 implements MigrationInterface {
//     name = 'UpdateTables1696628690083'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TYPE "public"."sellers_typesaler_enum" AS ENUM('privatePerson', 'business')`);
//         await queryRunner.query(`CREATE TABLE "sellers" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL, "typeSaler" "public"."sellers_typesaler_enum" NOT NULL DEFAULT 'privatePerson', "address" character varying NOT NULL DEFAULT '', "workingHours" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "logo" character varying NOT NULL DEFAULT '', "aboutUs" character varying NOT NULL DEFAULT '', "contactPerson" integer, "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_7e871210364bc7ca8c395f8f89c" UNIQUE ("phoneNumber"), CONSTRAINT "REL_4c1c59db4ac1ed90a1a7c0ff3d" UNIQUE ("userId"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TABLE "buyers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL, "address" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber"), CONSTRAINT "REL_545e00f05d8af4c162fc52c889" UNIQUE ("userId"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'admin')`);
//         await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//         await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
//         await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
//         await queryRunner.query(`DROP TABLE "users"`);
//         await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
//         await queryRunner.query(`DROP TABLE "buyers"`);
//         await queryRunner.query(`DROP TABLE "sellers"`);
//         await queryRunner.query(`DROP TYPE "public"."sellers_typesaler_enum"`);
//     }

// }
