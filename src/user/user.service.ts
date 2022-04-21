import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/models/login.dto';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){

	}

	async all(): Promise<User[]>{
		return await this.userRepository.find();
	}
	async create(newUser: User): Promise<User>{
		return await this.userRepository.save(newUser);
	}

	async findOne(email): Promise<User> {
		return await this.userRepository.findOne({email: email})
	}

	
}
