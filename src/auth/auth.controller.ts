import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Inject, NotFoundException, Post, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { LoginDto } from './models/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly authService: AuthService
		){}
	@Post('register')
	async register(@Body() body: RegisterDto):Promise<User>{
		if(body.password !== body.password_confirm){
			throw new BadRequestException('Password do not match!')
		}
		try {
			await this.userService.findOneByEmail(body.email);
		} catch (error) {
			throw new BadRequestException("Email id busy ")
		}
		let newUser = new User();
		newUser.email = body.email;
		newUser.last_name = body.last_name;
		newUser.first_name = body.first_name;
		newUser.password = await bcrypt.hash(body.password, 12);

		return await this.userService.create(newUser);
	}
	@Post('login')
	async login(
		@Body() body: LoginDto,
		@Res({passthrough: true}) res: Response
		):Promise<User>{
		const user = await this.userService.findOneByEmail(body.email);

		if(!user){
			throw new NotFoundException('User not found');
		}

		if(!await bcrypt.compare(body.password, user.password)){
			throw new BadRequestException('Invalid login or password')
		}

		const jwt = await this.jwtService.signAsync({id: user.id, first_name: user.first_name, email: user.email});
		res.cookie('jwt', jwt, {httpOnly: true})
		return user;
	}
	@UseGuards(AuthGuard)
	@Get('user')
	async user(@Req() req: Request){
		const id = await this.authService.userId(req);
		return await this.userService.findOne({ id });

	}
	@UseGuards(AuthGuard)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response){
		res.clearCookie('jwt');
		return {
			message: "success"
		}
	}
}
