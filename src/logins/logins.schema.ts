import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/users/users.schema";

export type LoginDocument = Login & Document;

@Schema({ timestamps: {createdAt: 'created', updatedAt: 'updated'} })
export class Login {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    ipAddress: string;

    @Prop({ type: raw({
        os: { type: String },
        device: { type: String },
        client: { type: String },
    }), required: true })
    userAgent: Record<string, any>;

    @Prop({type: Date, required: true})
    tokenExpiresIn: Date;

    @Prop()
    jwtToken: string;

    @Prop({ required: true, default: new Date() })
    loggedAt: Date;

    @Prop()
    loggedOutAt: Date;

}

export const LoginSchema = SchemaFactory.createForClass(Login);