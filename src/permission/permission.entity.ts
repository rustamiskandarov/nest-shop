import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;

	@Column()
	description: string;
}