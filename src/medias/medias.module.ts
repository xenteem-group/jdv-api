import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MediasController } from './medias.controller';
import { Media, MediaSchema } from './medias.schema';
import { MediasService } from './medias.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }])],
  controllers: [MediasController],
  providers: [MediasService]
})
export class MediasModule {}
