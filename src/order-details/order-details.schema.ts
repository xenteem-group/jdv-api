import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Order } from "src/orders/orders.schema";
import { Product } from "src/products/products.schema";


export type OrderDetailDocument = OrderDetail & Document;

@Schema({ timestamps: true })
export class OrderDetail {

    @Prop({ type: Types.ObjectId, ref: Order.name, required: true })
    order: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
    product: Types.ObjectId;

    @Prop({ required: true })
    qty: number;

    @Prop({ required: true })
    price: number;

}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);