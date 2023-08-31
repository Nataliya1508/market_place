import { SalerEntity } from '@app/saler/saler.entity';
import { SalerModule } from '@app/saler/saler.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { BuyerController } from '@app/buyer/buyer.controller';
import { BuyerEntity } from '@app/buyer/buyer.entity';
import { BuyerService } from '@app/buyer/buyer.service';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        console.log(configService.get<string>('DATABASE_HOST'));
        console.log(configService.get<number>('DATABASE_PORT'));
        console.log(configService.get<string>('DATABASE_USERNAME'));
        console.log(configService.get<string>('DATABASE_PASSWORD'));
        console.log(configService.get<string>('DATABASE_NAME'));

        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: Number(configService.get<number>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
          migrations: [__dirname + '/database/migrations/**/*{.ts, .js}'],
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([BuyerEntity, SalerEntity]),
    BuyerModule,
    SalerModule,
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
