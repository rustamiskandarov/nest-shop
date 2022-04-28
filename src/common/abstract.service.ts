import { Injectable } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { PaginatedResult } from "./paginated-result.interface";

@Injectable()
export abstract class AbstrictService  {
	protected constructor(protected readonly repsitory: Repository<any>) {}

	async all(): Promise<any[]> {
		return this.repsitory.find();
	}
	async create(data): Promise<any> {
		return await this.repsitory.save(data);
	}

	async paginate(page: number = 1, take: number = 10):Promise<PaginatedResult> {
		const [users, total] = await this.repsitory.findAndCount({
			take,
			skip: (page - 1) * take
		});

		return {
			data: users,
			meta: {
				total,
				page,
				last_page: Math.ceil(total / take)
			}

		}
	}

	async findOne(id): Promise<any> {
		return await this.repsitory.findOne(id);
	}
	
	async findOneByEmail(email): Promise<any> {
		return await this.repsitory.findOne({ email })
	}

	async update(id: number, data): Promise<any> {
		const result: UpdateResult = await this.repsitory.update(id, data);
		if (result) {
			return await this.repsitory.findOne(id);
		}

	}

}