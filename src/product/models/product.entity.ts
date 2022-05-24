import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product{
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	slug: string;
	@Column()
	title: string;
	@Column({ nullable: true })
	producer: string;
	@Column({ nullable: true })
	brand: string;
	@Column({nullable: true})
	description: string;
	@Column()
	image: string;
	@Column()
	price: number;
}