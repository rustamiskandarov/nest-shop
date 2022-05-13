import { ClassSerializerInterceptor, Controller, Get, Query, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
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




}
