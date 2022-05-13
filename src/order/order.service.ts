import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstrictService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstrictService {
	constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>){
		super(orderRepository)
	}

	async paginate(page: number = 1, take: number = 10, relations: any[] = []): Promise<PaginatedResult> {
		const { data, meta } = await super.paginate(page, take, relations);

		return {
			data: data.map((order: Order )=> ({
				id: order.id,
				name: order.name,
				email: order.email,
				total: order.total,
				create_at: order.created_at,
				order_items: order.order_items,
			})),
			meta

		}
	}
}
