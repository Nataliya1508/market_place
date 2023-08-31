import { BuyerController } from '@app/buyer/buyer.controller';
import { BuyerEntity } from '@app/buyer/buyer.entity';
import { BuyerService } from '@app/buyer/buyer.service';
import { SalerEntity } from '@app/saler/saler.entity';
import { SalerModule } from '@app/saler/saler.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { BuyerModule } from './buyer/buyer.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<number>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: false,
        ssl:
          configService.get<string>('DATABASE_SSL_ENABLED') === 'true'
            ? {
                rejectUnauthorized:
                  configService.get<string>('DATABASE_REJECT_UNAUTHORIZED') ===
                  'true',
              }
            : undefined,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/**/*{.ts, .js}'],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([BuyerEntity, SalerEntity]),
    BuyerModule,
    SalerModule,
    MailModule,
    MailerModule,
    AuthModule,
  ],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
