import { Types } from "mongoose";

export class OrderDto {
    readonly order: Types.ObjectId;
    readonly product: Types.ObjectId;
    readonly qty: number;
    readonly price: number;
}