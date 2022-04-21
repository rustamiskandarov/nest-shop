import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		UserModule,
		JwtModule.register({
			secret: 'secret',
			signOptions: {expiresIn: '1d'}
		})
	],
  	controllers: [AuthController],
  	providers: [UserService]
})
export class AuthModule {}
