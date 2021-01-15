import { Types } from "mongoose";

export class PaymentDto {
    readonly id: Types.ObjectId;
    readonly type: string;
    readonly status: string;
}