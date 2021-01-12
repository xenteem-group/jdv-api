import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import imageUpload from 'src/config/imageUpload';
import { MediaDto } from './medias.dto';
import { Media, MediaDocument } from './medias.schema';
require('dotenv').config();

const baseURL = process.env.ENVIRONMENT === 'development' ? 'http://localhost:3000/' : 'https://api.axiasgems.com/';

const extensions = {
    'image/png': '.png',
    'image/tiff': '.tiff',
    'image/vnd.wap.wbmp': '.wbmp',
    'image/x-icon': '.ico',
    'image/x-jng': '.jng',
    'image/x-ms-bmp': '.bmp',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/jpeg': '.jpeg',
    'image/jpg': '.jpg',
}

@Injectable()
export class MediasService {

    constructor( @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument> ) {}

    async findAll(): Promise<Media[]> {
        return await this.mediaModel.find().exec();
    }

    async findOne(id: string): Promise<Media> {
        let media: Media;
        try {
            media = await this.mediaModel.findById(id);
        }
        catch(error) {
            throw new NotFoundException('Item not found');
        }
        
        if(!media) {
            throw new NotFoundException('Item not found');
        }
        
        return media;
    }

    async create(mediaDto: MediaDto, file): Promise<Media> {
        if(file) {
            const name = 'img' + new Date().getTime() + extensions[file.mimetype];
            imageUpload(file, name);

            const newMedia = {
                ...mediaDto,
                original: baseURL + 'medias/original/' + name,
                thumb200: baseURL + 'medias/thumb200/' + name,
                thumb400: baseURL + 'medias/thumb400/' + name,
            }
            mediaDto = newMedia;
        }
        const newMedia = new this.mediaModel(mediaDto);
        return await newMedia.save();
    }

    async update(id: string, mediaDto: MediaDto, file): Promise<Media> {
        if(file) {
            const name = 'img' + new Date().getTime() + extensions[file.mimetype];
            imageUpload(file, name);

            const newMedia = {
                ...mediaDto,
                original: baseURL + 'medias/original/' + name,
                thumb200: baseURL + 'medias/thumb200/' + name,
                thumb400: baseURL + 'medias/thumb400/' + name,
            }
            mediaDto = newMedia;
        }
        return await this.mediaModel.findByIdAndUpdate(id, mediaDto, { new: true });
    }

    async delete(id: string): Promise<Media> {
        return await this.mediaModel.findByIdAndRemove(id);
    }

}
