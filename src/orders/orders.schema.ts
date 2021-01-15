import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/users/users.schema";


export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId;

    @Prop({ required: true, enum: ['pending', 'dispatched', 'delivered'] })
    status: string;

    @Prop({ required: true })
    subTotal: number;

    @Prop({ required: true })
    grandTotal: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);