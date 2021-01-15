import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/users/users.schema";


export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true, enum: ['visa', 'other'] })
    type: string;

    @Prop({ required: true })
    status: boolean;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);