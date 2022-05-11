import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstrictService } from 'src/common/abstract.service';
import { Repository, UpdateResult } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService extends AbstrictService{

	constructor (@InjectRepository(Role) private readonly roleRepository: Repository<Role>){
		super(roleRepository)
	}

}
