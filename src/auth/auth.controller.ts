import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Inject, NotFoundException, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { LoginDto } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthInterceptor } from './auth.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
		){}
	@Post('register')
	async register(@Body() body: RegisterDto):Promise<User>{
		if(body.password !== body.password_confirm){
			throw new BadRequestException('Password do not match!')
		}
		let newUser = new User();
		newUser.email = body.email;
		newUser.last_name = body.last_name;
		newUser.firts_name = body.first_name;
		newUser.password = await bcrypt.hash(body.password, 12);

		return await this.userService.create(newUser);
	}
	@Post('login')
	async login(
		@Body() body: LoginDto,
		@Res(
			//{passthrough: true}
			) res: Response
		):Promise<User>{
		const user = await this.userService.findOne(body.email);

		if(!user){
			throw new NotFoundException('User not found');
		}

		if(!await bcrypt.compare(body.password, user.password)){
			throw new BadRequestException('Invalid login or password')
		}

		const jwt = await this.jwtService.signAsync({id: user.id, first_name: user.firts_name, email: user.email});
		res.cookie('jwt', jwt, {httpOnly: true})
		return user;
	}
	
	@Get('user')
	async user(@Req() req: Request){
		const cookie = req.cookies['jwt'];

		const data = await this.jwtService.verifyAsync(cookie);

		return this.userService.findOne({id: data['id']});

	}
}
