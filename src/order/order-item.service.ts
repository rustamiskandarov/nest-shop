import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstrictService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { OrderItem } from './models/order-item.entity';

@Injectable()
export class OrderItemService extends AbstrictService {
	constructor(@InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>){
		super(orderItemRepository)
	}
}
