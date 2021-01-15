import { Types } from "mongoose";

export class OrderDto {
    readonly id: Types.ObjectId;
    readonly user: Types.ObjectId;
    readonly status: string;
    readonly subTotal: number;
    readonly grandTotal: number;
}