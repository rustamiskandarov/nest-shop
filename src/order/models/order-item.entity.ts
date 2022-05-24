import { isNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	product_title: string;

	@Column()
	product_slug: string;

	@Column()
	price: number;

	@Column()
	productId: number;

	@Column({default: 1})
	quantity: number;

	@ManyToOne(() => Order, order=>order.order_items)
	@JoinColumn({name: 'order_id'})
	order: Order;
}