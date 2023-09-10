import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersCascadeDeleting1694358691528 implements MigrationInterface {
    name = 'AddUsersCascadeDeleting1694358691528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d"`);
        await queryRunner.query(`ALTER TABLE "individuals" DROP CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "individuals" ADD CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "individuals" DROP CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`ALTER TABLE "individuals" ADD CONSTRAINT "FK_aef44b5ef567eeca0750c75fcd9" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_3a30a08d7f14d52252323ad8d2d" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
