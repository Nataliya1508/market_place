import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsAndCategoryTable1698172634347 implements MigrationInterface {
    name = 'CreateProductsAndCategoryTable1698172634347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sub-subcategories_subcategory_enum" AS ENUM('Cow Milk', 'Goat Milk', 'Cottage Cheese', 'Cream', 'Butter', 'Olive Oil', 'Sunflower Oil', 'Corn Oil', 'Grapeseed Oil', 'Beef', 'Pork', 'Chicken', 'Turkey', 'Lamb', 'Steaks', 'Salami', 'Sausages', 'Smoked Meat')`);
        await queryRunner.query(`CREATE TABLE "sub-subcategories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subCategory" "public"."sub-subcategories_subcategory_enum" NOT NULL, "subcategoryId" uuid, CONSTRAINT "PK_a5f25877a57116d4c9b15274c47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sub-categories_subcategory_enum" AS ENUM('Tea', 'Coffee', 'Water, Juice & Soft Drinks', 'Fresh', 'Soft', 'Semi-hard', 'Hard', 'Blue', 'Salty', 'Sweet', 'Milk', 'Other Dairy', 'Chicken', 'Quail', 'Fruits', 'Vegetables', 'Greens', 'Cereals', 'Pasta', 'Spices', 'Flour', 'Oil', 'Fresh Meat', 'Sausages')`);
        await queryRunner.query(`CREATE TABLE "sub-categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subCategory" "public"."sub-categories_subcategory_enum" NOT NULL, "categoryId" uuid, CONSTRAINT "PK_9174a36d554efe3a3d0d910888b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."categories_name_enum" AS ENUM('Meat', 'Dairy', 'Cheeses', 'Fruits & Vegetables', 'Eggs', 'Grocery', 'Drinks', 'Craft food')`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."categories_name_enum" NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."products_deliverytype_enum" AS ENUM('Courier', 'Pickup')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "favorites" boolean NOT NULL DEFAULT false, "caloricContent" character varying NOT NULL DEFAULT '', "proteins" character varying NOT NULL DEFAULT '', "fats" character varying NOT NULL DEFAULT '', "carbohydrates" character varying NOT NULL DEFAULT '', "price" integer, "quantity" integer, "unit" character varying, "deliveryType" "public"."products_deliverytype_enum" NOT NULL, "address" character varying, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "specialOffer" boolean, "topProduct" boolean, "newProduct" boolean, "isActive" boolean, "sellerId" integer, "categoryId" uuid, "subcategoryId" uuid, "subsubcategoryId" uuid, CONSTRAINT "UQ_53f05cdb774e5f5fed11ad904c0" UNIQUE ("phoneNumber"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sellers_typesaler_enum" AS ENUM('privatePerson', 'business')`);
        await queryRunner.query(`CREATE TABLE "sellers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "companyName" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL, "typeSaler" "public"."sellers_typesaler_enum" NOT NULL DEFAULT 'privatePerson', "address" character varying NOT NULL DEFAULT '', "workingHours" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "logo" character varying NOT NULL DEFAULT '', "aboutUs" character varying NOT NULL DEFAULT '', "contactPerson" integer, "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_7e871210364bc7ca8c395f8f89c" UNIQUE ("phoneNumber"), CONSTRAINT "REL_4c1c59db4ac1ed90a1a7c0ff3d" UNIQUE ("userId"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "phoneNumber" character varying NOT NULL, "address" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "UQ_e0171e178c0edb2c24cc44e143a" UNIQUE ("phoneNumber"), CONSTRAINT "REL_545e00f05d8af4c162fc52c889" UNIQUE ("userId"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" ADD CONSTRAINT "FK_dc7ac4e656fbca36f84f0c3b061" FOREIGN KEY ("subcategoryId") REFERENCES "sub-categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub-categories" ADD CONSTRAINT "FK_91284dc2a7b866daa8fe2b6f3a5" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6" FOREIGN KEY ("sellerId") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d" FOREIGN KEY ("subcategoryId") REFERENCES "sub-categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a414a74a9abb0d979cfd410b3fc" FOREIGN KEY ("subsubcategoryId") REFERENCES "sub-subcategories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_545e00f05d8af4c162fc52c8892" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_545e00f05d8af4c162fc52c8892"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_4c1c59db4ac1ed90a1a7c0ff3df"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a414a74a9abb0d979cfd410b3fc"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7527f75cb36bea4b7f2b86f7d1d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_e40a1dd2909378f0da1f34f7bd6"`);
        await queryRunner.query(`ALTER TABLE "sub-categories" DROP CONSTRAINT "FK_91284dc2a7b866daa8fe2b6f3a5"`);
        await queryRunner.query(`ALTER TABLE "sub-subcategories" DROP CONSTRAINT "FK_dc7ac4e656fbca36f84f0c3b061"`);
        await queryRunner.query(`DROP TABLE "buyers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TYPE "public"."sellers_typesaler_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_deliverytype_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TYPE "public"."categories_name_enum"`);
        await queryRunner.query(`DROP TABLE "sub-categories"`);
        await queryRunner.query(`DROP TYPE "public"."sub-categories_subcategory_enum"`);
        await queryRunner.query(`DROP TABLE "sub-subcategories"`);
        await queryRunner.query(`DROP TYPE "public"."sub-subcategories_subcategory_enum"`);
    }

}
