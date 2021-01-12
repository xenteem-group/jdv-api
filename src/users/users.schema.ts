import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Media } from "src/medias/medias.schema";

export type UserDocument = User & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class User {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, minlength: 6 })
    password: string;

    @Prop({ type: Types.ObjectId, ref: Media.name })
    image: string;

    @Prop({ required: true, enum: [ 'admin', 'user' ] })
    role: string;

    @Prop({ default: false })
    deleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);