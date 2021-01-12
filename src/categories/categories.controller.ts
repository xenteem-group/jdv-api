import { Controller, Get, Post, Patch, Delete, Body, Param, UseInterceptors, UploadedFiles, CacheInterceptor, Query } from '@nestjs/common';
import { CategoryDto } from './categories.dto';
import { CategoriesService } from './categories.service';
import { Category } from './categories.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('categories')
@UseInterceptors(CacheInterceptor)
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Public()
    @Get()
    findAll(@Query() query): Promise<Category[]> {
        return this.categoriesService.findAll(query); 
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string, @Query() query): Promise<Category> {
        return this.categoriesService.findOne(id, query);
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    create(@UploadedFiles() files, @Body() categoryDto: CategoryDto): Promise<Category> {
        console.log('files>>>>>>>>..', files);
        return this.categoriesService.create(categoryDto);
    }

    @Patch(':id')
    update(@Body() categoryDto: CategoryDto, @Param('id') id: string): Promise<Category> {
        return this.categoriesService.update(id, categoryDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.delete(id);
    }

}
