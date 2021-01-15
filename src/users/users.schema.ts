import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Media } from "src/medias/medias.schema";

export type UserDocument = User & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class User {

    @Prop({ required: true, trim: true })
    firstName: string;

    @Prop({ trim: true })
    middleName: string;

    @Prop({ required: true, trim: true })
    lastName: string;

    @Prop({ required: true, trim: true, unique:true })
    email: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ required: true, trim: true, unique:true })
    mobileNo: string;

    @Prop({ required: true, trim: true,})
    address1: string;

    @Prop({ required: true, trim: true,})
    address2: string;

    @Prop({ required: true, trim: true,})
    district: string;

    @Prop({ type: Types.ObjectId, ref: Media.name })
    image: string;

    @Prop({ default: false })
    deleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);