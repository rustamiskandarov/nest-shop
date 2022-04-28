import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './DTO/createUser.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './DTO/updateUser.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Get()
	async all(@Query() params): Promise<any>{
		return await this.userService.paginate(params.page, params.take);
	}

	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() body: CreateUserDto): Promise<User> {
		const password = await bcrypt.hash(body.password, 12);
		try {
			await this.userService.findOneByEmail(body.email);
		} catch (error) {
			throw new BadRequestException("Email id busy ")
		}
		return await this.userService.create({
			email: body.email,
			last_name: body.last_name,
			first_name: body.first_name,
			password,
			role: { id: body.role_id}
		});
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async getOneById(@Param('id') id: number):Promise<User>{
		return await this.userService.findOne({id});
	}
	@UseGuards(AuthGuard)
	@Get(':email')
	async getOneByEmail(@Param('email') email: string):Promise<User>{
		return await this.userService.findOneByEmail({email});
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param() id: number, @Body() body: UpdateUserDto): Promise<any>{
		if(!await this.userService.findOne(id)){
			throw new NotFoundException('Element not found');
		}		

		if(body.password){
			body.password = await bcrypt.hash(body.password, 12);
		}
		const {role_id, ...data} = body;

		const updatedUser = {
			...data,
			role: {id: role_id}
		} 
		return await this.userService.update(id, updatedUser);
	}
}
