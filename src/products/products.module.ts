import { Module } from '@nestjs/common';
import { GemsService } from './products.service';
import { GemsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  providers: [GemsService],
  controllers: [GemsController]
})
export class GemsModule {}
