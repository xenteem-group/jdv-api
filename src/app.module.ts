import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ProductsModule } from './products/products.module';
import { MediasModule } from './medias/medias.module';
import { LoginsModule } from './logins/logins.module';
import * as mongoose from 'mongoose';
import { MulterModule } from '@nestjs/platform-express';
import config from './config/keys';




mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true}),
    MulterModule.register({ dest: '../uploads' }),
    AuthModule, 
    UsersModule,
    LoginsModule,
    MediasModule,
    AdminModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
