import { isNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	product_itle: string;

	@Column()
	price: number;

	@Column()
	quantity: number;

	@ManyToOne(() => Order, order=>order.order_items)
	@JoinColumn({name: 'order_id'})
	order: Order;
}