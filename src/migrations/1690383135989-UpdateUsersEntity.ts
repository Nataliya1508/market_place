import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersEntity1690383135989 implements MigrationInterface {
    name = 'UpdateUsersEntity1690383135989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "image" character varying NOT NULL DEFAULT '', "role" character varying NOT NULL, "phoneNumber" integer NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
