import { IsNotEmpty, Max, Min } from "class-validator";

export class OrderItemAddDto {
	
	@IsNotEmpty()
	product_title: string;

	@IsNotEmpty()
	product_slug: string;

	@IsNotEmpty()
	price: number;

	@IsNotEmpty()
	@Min(1)
	quantity: number;

	@IsNotEmpty()
	productId: number;

}