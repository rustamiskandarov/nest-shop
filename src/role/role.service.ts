import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService {

	constructor (@InjectRepository(Role) private readonly roleRepository: Repository<Role>){
		
	}
	async create(data): Promise<Role> {
		return await this.roleRepository.save(data);
	}
	async get(): Promise<Role[]> {
		return await this.roleRepository.find();
	}
	async update(id: number, data): Promise<Role> {
		const result: UpdateResult = await this.roleRepository.update(id, data);
		if(result){
			
			return await this.roleRepository.findOne(id);
		}
		
		return null;
		
	}
	async findOne(id: number): Promise<Role> {
		return await this.roleRepository.findOneOrFail(id, {relations: ['permissions']});
	}
	async delete(id: number): Promise<UpdateResult> {
		return await this.roleRepository.softDelete(id);
	}
}
