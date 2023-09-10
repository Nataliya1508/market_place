import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePhoneNumberNotUnique1694355339559 implements MigrationInterface {
    name = 'MakePhoneNumberNotUnique1694355339559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber")`);
    }

}
