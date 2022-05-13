import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateProductDto } from './models/create-product.dto';
import { Product } from './models/product.entity';
import { UpdateProductDto } from './models/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

	constructor(private readonly productService: ProductService) { }
	@Get()
	async all(@Query('page') page: number = 1, @Query('take') take: number = 10, relations: any[] = []): Promise<any> {
		return await this.productService.paginate(page, take, relations);
	}

	//@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() body: CreateProductDto): Promise<Product> {
		return await this.productService.create(body);
	}

	//@UseGuards(AuthGuard)
	@Get(':id')
	async getOne(@Param('id') id: number): Promise<Product> {
		return await this.productService.findOne(id);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() body: UpdateProductDto): Promise<Product> {
		await this.productService.update(id, body);
		return await this.productService.findOne({id});
	}
}
