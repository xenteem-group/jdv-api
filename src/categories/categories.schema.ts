import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Media } from '../medias/medias.schema';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class Category {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    phrase: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
    media: string[];

    @Prop({ default: false })
    deleted: boolean;
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);