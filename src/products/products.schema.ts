import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

    @Prop({ required: true, unique: true })
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    qty: number;

    @Prop([String])
    tags: string[];

    @Prop({ type: [String], required: true })
    images: string[];

    @Prop({ required: true, default: false })
    published: boolean;

    @Prop({ required: true, default: false })
    deleted: boolean;

}

export const ProductSchema = SchemaFactory.createForClass(Product);