import { Types } from "mongoose";

export class ProductDto {
    readonly code: string;
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
    readonly description: string;
    readonly color: string;
    readonly media: string[];
    readonly deleted: boolean;
}