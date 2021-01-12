import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type MediaDocument = Media & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class Media {

    @Prop({ enum: ['image', 'video'], default: 'image' })
    type: string;

    @Prop()
    original: string;

    @Prop()
    thumb200: string;

    @Prop()
    thumb400: string;

    @Prop()
    videoUrl: string;

    @Prop({ required: true })
    alt: string;
    
}

export const MediaSchema = SchemaFactory.createForClass(Media);