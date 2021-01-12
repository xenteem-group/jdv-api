import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { MediaDto } from './medias.dto';
import { Media } from './medias.schema';
import { MediasService } from './medias.service';

@Controller('medias')
export class MediasController {

  constructor(private readonly mediasService: MediasService) {}

  @Public()
  @Get()
  findAll(): Promise<Media[]> {
    return this.mediasService.findAll(); 
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Media> {
    return this.mediasService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Body() mediaDto: MediaDto): Promise<Media> {
    return this.mediasService.create(mediaDto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(@UploadedFile() file, @Body() mediaDto: MediaDto, @Param('id') id: string): Promise<Media> {
    return this.mediasService.update(id, mediaDto, file);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Media> {
    return this.mediasService.delete(id);
  }

  //returns image itself
  @Public()
  @Get(':type/:imgpath')
  seeUploadedFile(@Param('type') type, @Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: '../uploads/' + type });
  }

}
