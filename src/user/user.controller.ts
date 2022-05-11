import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './DTO/createUser.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request, Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private authService: AuthService
	) { }

	@Get()
	async all(@Query() params): Promise<any> {
		return await this.userService.paginate(params.page, params.take, ['role']);
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
			role: { id: body.role_id }
		});
	}

	@UseGuards(AuthGuard)
	@Get(':id')
	async getOneById(@Param('id') id: number): Promise<User> {
		return await this.userService.findOne({ id }, ['role']);
	}
	@UseGuards(AuthGuard)
	@Get(':email')
	async getOneByEmail(@Param('email') email: string): Promise<User> {
		return await this.userService.findOneByEmail({ email });
	}

	@Put('info')
	async updateInfo(@Req() request: Request, @Body() body: UpdateUserDto) {
		const id = await this.authService.userId(request);
		await this.userService.update(id, body);
		const user = await this.userService.findOne(id);
		return user;
	}

	@Put('password')
	async updatePassword(
		@Req() request: Request,
		@Body('password') password: string,
		@Body('password_confirm') password_confirm: string
	) {
		if (password !== password_confirm) {
			throw new BadRequestException("Пароли должны совпадать")
		}
		const id = await this.authService.userId(request);
		const hashed = await bcrypt.hash(password, 12);
		await this.userService.update(id, { password: hashed });
		return await this.userService.findOne(id);;
	}

	@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param() id: number, @Body() body: UpdateUserDto): Promise<any> {
		if (!await this.userService.findOne(id)) {
			throw new NotFoundException('Element not found');
		}

		if (body.password) {
			body.password = await bcrypt.hash(body.password, 12);
		}
		const { role_id, ...data } = body;

		const updatedUser = {
			...data,
			role: { id: role_id }
		}
		return await this.userService.update(id, updatedUser);
	}
}
