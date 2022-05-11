import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstrictService } from 'src/common/abstract.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService extends AbstrictService {
	
	constructor(
		@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission> )
		{
		super(permissionRepository);
	}

}
