import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "src/categories/categories.schema";
import { Media } from "src/medias/medias.schema";


export type ProductDocument = Product & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class Product {

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
    category: Category;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    description: string;

    @Prop()
    color: string;

    @Prop({ required: true })
    price: number;

    @Prop({ type: [{ type: Types.ObjectId, ref: Media.name }] })
    media: string[];

    @Prop({ required: true, default: false })
    deleted: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);