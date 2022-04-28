import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
	
	
	constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission> ){}

	async create(data):Promise<Permission> {
		return await this.permissionRepository.save(data);
	}
	async update(id, data):Promise<UpdateResult> {
		return await this.permissionRepository.update(id, data);
	}
	
	async delete(id: number):Promise<DeleteResult> {
		return await this.permissionRepository.delete(id);
	}
	
	async get(): Promise<Permission[]> {
		return await this.permissionRepository.find();
	}
}
