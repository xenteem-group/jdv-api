import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { ProductDto } from './products.dto';
import { Product } from './products.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Public()
    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Public()
    @Get(':name')
    findOne(@Param('name') name: string): Promise<Product> {
        return this.productsService.findOne(name);
    }

    @Post()
    create(@UploadedFiles() files, @Body() productDto: ProductDto): Promise<Product> {
        return this.productsService.create(productDto);
    }

    @Patch(':id')
    update(@Body() productDto: ProductDto, @Param('id') id: string): Promise<Product> {
        return this.productsService.update(id, productDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Product> {
        return this.productsService.delete(id);
    }

}
