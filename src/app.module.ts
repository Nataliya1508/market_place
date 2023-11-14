import { AuthMiddleware } from '@app/auth/middlewares/auth.middleware';
import { BuyerController } from '@app/buyer/buyer.controller';
import { BuyerService } from '@app/buyer/buyer.service';
import { SellerEntity } from '@app/saler/entities/saler.entity';
import { SalerModule } from '@app/saler/saler.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';
import { BuyerEntity } from './buyer/entities/buyer.entity';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { ProductEntity } from './product/entities/product.entity';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { SubSubcategoriesModule } from './sub-subcategories/sub-subcategories.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FilesModule } from './files/files.module';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';
// import { AppService } from '../app.service';
// import { AppController } from '../app.controller';
// import { AppService } from '../app.service';
// import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, CloudinaryModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<number>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        ssl:
          configService.get<string>('DATABASE_SSL_ENABLED') === 'false'
            ? {
                rejectUnauthorized:
                  configService.get<string>('DATABASE_REJECT_UNAUTHORIZED') ===
                  'false',
              }
            : undefined,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/**/*{.ts, .js}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([BuyerEntity, SellerEntity, ProductEntity]),
    BuyerModule,
    SalerModule,
    MailModule,
    MailerModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    SubCategoryModule,
    SubSubcategoriesModule,
    CloudinaryModule,
    FilesModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService, ProductService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
