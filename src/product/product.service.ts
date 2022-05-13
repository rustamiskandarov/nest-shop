import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstrictService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService extends AbstrictService {
	constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>){
		super(productRepository);
	}
}
