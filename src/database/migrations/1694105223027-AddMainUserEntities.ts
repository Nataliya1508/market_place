import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMainUserEntities1694105223027 implements MigrationInterface {
    name = 'AddMainUserEntities1694105223027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('seller_individual', 'seller_company', 'buyer', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', "emailVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber"), CONSTRAINT "REL_545e00f05d8af4c162fc52c889" UNIQUE ("userId"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sellers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "isActive" character varying NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "REL_4c1c59db4ac1ed90a1a7c0ff3d" UNIQUE ("userId"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "individuals" ("id" SERIAL NOT NULL, "image" character varying, "about" character varying NOT NULL, "contactPersonFullName" character varying NOT NULL, "address" character varying NOT NULL, "workingHours" character varying NOT NULL, "bankCardNumber" character varying NOT NULL, "bankCardExpirationDate" character varying NOT NULL, "sellerId" integer, CONSTRAINT "REL_aef44b5ef567eeca0750c75fcd" UNIQUE ("sellerId"), CONSTRAINT "PK_ebf809180acc8fce381144eb48b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "logo" character varying, "about" character varying NOT NULL, "contactPersonFullName" character varying NOT NULL, "address" character varying NOT NULL, "workingHours" character varying NOT NULL, "iban" character varying, "bankName" character varying, "mfo" character varying, "edrpou" character varying, "sellerId" integer, CONSTRAINT "REL_3a30a08d7f14d52252323ad8d2" UNIQUE ("sellerId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "individuals" ADD CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d"`);
        await queryRunner.query(`ALTER TABLE "individuals" DROP CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "individuals"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TABLE "buyers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
