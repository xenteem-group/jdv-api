import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';

@Injectable()
export class CategoriesService {

    constructor( @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument> ) {}

    async findAll(query): Promise<Category[]> {
        if(query.origin === 'client') {
            return await this.categoryModel
                .find({ deleted: false })
                .select('id name media')
                .populate({path: 'media', options: {limit: 1} })
                .exec(); 
        }
        return await this.categoryModel.find().select(query.select).exec();
    }

    async findOne(id: string, query): Promise<Category> {
        let category: any;
        try {
            if(query.origin === 'client') {
                category = await this.categoryModel
                    .findOne({ name: id, deleted: false })
                    .select('-deleted')
                    .populate('media')
                    .exec();
            }
            else {
                category = await this.categoryModel.findById(id);
            }
        }
        catch(error) {
            throw new NotFoundException('Item not found');
        }
        
        if(!category) {
            throw new NotFoundException('Item not found');
        }
        
        return category;
    }

    async create(category: Category): Promise<Category> {
        const newCategory = new this.categoryModel(category);
        return await newCategory.save();
    }

    async update(id: string, category: Category): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(id, category, { new: true });
    }

    async delete(id: string): Promise<Category> {
        return await this.categoryModel.findByIdAndRemove(id);
    }
    
}
