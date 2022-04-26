import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/models/login.dto';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { User } from './models/user.entity';

@Injectable()
export class UserService {

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){

	}

	async all(): Promise<User[]>{
		return await this.userRepository.find();
	}
	async create(data): Promise<User>{
		return await this.userRepository.save(data);
	}

	async paginate(page: number = 1, take: number = 1){
		const [users, total] = await this.userRepository.findAndCount({
			take, 
			skip: (page - 1) * take
		});

		return {
			data: users,
			meta: {
				total,
				page,
				last_page: Math.ceil(total/take)
			}

		}
	}

	async findOne(id): Promise<User> {
		const user = await this.userRepository.findOne(id);
		console.log(user);
		return user;
	}
	async findOneByEmail(email): Promise<User> {
		return await this.userRepository.findOne({email})
	}

	async update(id: number, data ): Promise<any> {
		const result:UpdateResult = await this.userRepository.update(id, data);
		console.log(result);
		if(result){
			return await this.userRepository.findOne(id);
		}
		
	}

	
}
