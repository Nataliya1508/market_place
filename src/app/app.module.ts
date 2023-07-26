import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(ormconfig)],
  controllers: [UserController, AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
