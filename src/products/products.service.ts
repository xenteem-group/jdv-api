import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './products.dto';
import { Product, ProductDocument } from './products.schema';

@Injectable()
export class ProductsService {

    constructor( @InjectModel(Product.name) private readonly productModel: Model<ProductDocument> ) {}

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findOne(name: string): Promise<Product> {
        let product: Product;
        try {
            product = await this.productModel.findOne({ name: name });
        }
        catch(error) {
            throw new NotFoundException('Item not found');
        }
        
        if(!product) {
            throw new NotFoundException('Item not found');
        }
        
        return product;
    }

    async create(productDto: ProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto);
        return await newProduct.save();
    }

    async update(id: string, productDto: ProductDto): Promise<Product> {
        const updatedProduct = new this.productModel(productDto);
        return await this.productModel.findByIdAndUpdate(id, updatedProduct, { new: true });
    }

    async delete(id: string): Promise<Product> {
        return await this.productModel.findByIdAndRemove(id);
    }

}
