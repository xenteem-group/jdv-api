import { Module } from '@nestjs/common';
import { LoginsService } from './logins.service';
import { LoginsController } from './logins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './logins.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }])],
  providers: [LoginsService],
  controllers: [LoginsController],
  exports: [LoginsService]
})
export class LoginsModule {}
