import { Body, ClassSerializerInterceptor, ConsoleLogger, Controller, Get, Header, HttpStatus, NotFoundException, Param, Post, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { NotFoundError } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { Product } from 'src/product/models/product.entity';
import { OrderCreateDto } from './models/order-create.dto';
import { OrderItemAddDto } from './models/order-item-add.dto';
import { OrderItem } from './models/order-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderService } from './order.service';


@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(AuthGuard)
@Controller()
export class OrderController {
	constructor(
		private readonly orderService: OrderService,
		private readonly orderItemService:OrderItemService,
		) { }
	@Get('orders')
	async all(@Query('page') page: number = 1, @Query('take') take: number = 10, relations: any[] = []): Promise<any> {
		///return await this.orderService.paginate(page, take, relations);
		return await this.orderService.all(['order_items']);
	}


	@Post('export')
	@Header('Content-Type', 'text/csv')
	async export(@Res() res: Response){
		const parser = new Parser({
			fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
		});
		const orders = await this.orderService.all(['order_items']);

		const json = [];

		orders.forEach((o)=>{
			json.push({
				ID:o.id,
				Name: o.name,
				Email: o.email,
				'Product Title': '',
				Price: '',
				Quantity: '',
			});
			o.order_items.forEach(i => {
				json.push({
					ID: '',
					Name: '',
					Email: '',
					'Product Title': i.product_title,
					Price: i.price,
					Quantity: i.quantity,
				})
			});
		})
		console.log(json)
		const csv = parser.parse(json);
		res.header('Content-Type', 'text/csv');
		res.attachment('orders.csv')
		res.status(HttpStatus.CREATED).send(csv);

	}

	@Post('orders/create')
	async create (@Body() body: OrderCreateDto ):Promise<Product>{
		return await this.orderService.create(body);
	}

	@Post('orders/:orderId/add-item')
	async addItem(@Param('orderId') orderId: number, @Body() body: OrderItemAddDto): Promise<OrderItem> {
		const order = await this.orderService.findOne(orderId, ['order_items']);

		if(!order){
			throw new NotFoundException(`Заказ с №${orderId} не найден`)
		}

		const findedItems = order.order_items.find(i => i.product_slug === body.product_slug)
		if (findedItems){
			++findedItems.quantity;
			await this.orderItemService.update(findedItems.id, findedItems);	
		}else{
			const item = await this.orderItemService.create(body);
		
			order.order_items.push(item);
			await this.orderService.create(order);
		}
		
		return order;
	}
	@Get('orders/chart')
	async getChart():Promise<any>{
		return await this.orderService.chart();
	}
}
