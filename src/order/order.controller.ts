import { ClassSerializerInterceptor, Controller, Get, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller()
export class OrderController {
	constructor(private readonly orderService: OrderService) { }
	@Get('orders')
	async all(@Query('page') page: number = 1, @Query('take') take: number = 10, relations: any[] = []): Promise<any> {
		///return await this.orderService.paginate(page, take, relations);
		return await this.orderService.all(['order_items']);
	}

	@Get('export')
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
			})
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

		const csv = parser.parse(json);
		res.header('Content-Type', 'text/csv');
		res.attachment('orders.csv')
		return res.send(csv);


	}


}
