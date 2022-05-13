import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploadController } from './upload.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([Product])
	],
  	providers: [ProductService],
	controllers: [ProductController, UploadController]
})
export class ProductModule {}
