import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { User } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => UserModule),
		CommonModule
	],
	controllers: [AuthController],
	providers: [UserService, AuthService],
	exports: [AuthService]
})
export class AuthModule { }
