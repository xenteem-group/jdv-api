import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Media } from "src/medias/medias.schema";

export type AdminDocument = Admin & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class Admin {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true })
    adminname: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ type: Types.ObjectId, ref: Media.name })
    image: string;

    @Prop({ required: true, enum: [ 'admin', 'admin' ] })
    role: string;

    @Prop({ default: false })
    deleted: boolean;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);