import { Injectable } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { PaginatedResult } from "./paginated-result.interface";

@Injectable()
export abstract class AbstrictService {
	protected constructor(protected readonly repsitory: Repository<any>) { }

	async all(relations = []): Promise<any[]> {
		return this.repsitory.find({relations});
	}
	
	async paginate(page: number = 1, take: number = 10, relations: any[]=[]): Promise<PaginatedResult> {
		const [data, total] = await this.repsitory.findAndCount({
			take,
			skip: (page - 1) * take,
			relations
		});

		return {
			data,
			meta: {
				total,
				page,
				last_page: Math.ceil(total / take)
			}

		}
	}

	async create(data): Promise<any> {
		return await this.repsitory.save(data);
	}

	async findOne(conditions, relations = []): Promise<any> {
		return await this.repsitory.findOne(conditions, {
			relations
		});
	}

	async update(id: number, data): Promise<any> {
		return await this.repsitory.update(id, data);
	}

	async delete(id: number): Promise<any> {
		return await this.repsitory.delete(id);
	}

}