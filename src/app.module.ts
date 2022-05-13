import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';


@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 33066,
			username: 'root',
			password: 'root',
			database: 'admin',
			autoLoadEntities: true,
			synchronize: true

		}),
		UserModule,
		AuthModule,
		CommonModule,
		RoleModule,
		PermissionModule,
		ProductModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
