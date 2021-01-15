export class ProductDto {
    readonly code: string;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly qty: number;
    readonly images: string[];
    readonly published: boolean;
    readonly deleted: boolean;
}