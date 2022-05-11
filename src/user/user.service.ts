import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/models/login.dto';
import { AbstrictService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstrictService{

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){
		super (userRepository)
	}


	async paginate(page: number = 1, take: number = 10, relations:any[] = []): Promise<PaginatedResult>{
		const {data, meta} = await super.paginate(page, take, relations);

		return {
			data: data.map(user => {
				const { password, ...data } = user;
				return data;
			}),
			meta

		}
	}

	// async findOne(id): Promise<User> {
	// 	const user = await this.userRepository.findOne(id);
	// 	console.log(user);
	// 	return user;
	// }
	async findOneByEmail(email): Promise<User> {
		return await this.userRepository.findOne({email})
	}

	// async update(id: number, data ): Promise<any> {
	// 	const result:UpdateResult = await this.userRepository.update(id, data);
	// 	console.log(result);
	// 	if(result){
	// 		return await this.userRepository.findOne(id);
	// 	}
		
	// }

	
}
