import { SalerEntity } from '@app/saler/saler.entity';
import { SalerModule } from '@app/saler/saler.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { UserController } from '@app/user/user.controller';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { UserModule } from './user/user.module';

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
    TypeOrmModule.forFeature([UserEntity, SalerEntity]),
    UserModule,
    SalerModule,
    MailModule,
    MailerModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
