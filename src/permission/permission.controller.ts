import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateResult } from 'typeorm';
import { CreatePermissionDto } from './DTO/create.permission.dto';
import { HasPermission } from './permission.decorator';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
	constructor(private readonly permissinoService: PermissionService) { }

	@Get()
	@HasPermission('permissions')
	async all(): Promise<any> {
		return await this.permissinoService.all();
	}

	
	@Post('')
	async create(@Body() body: CreatePermissionDto): Promise<Permission> {
		const { ...data } = body;
		return await this.permissinoService.create(
			{
				...data
			}
		);
	}
	//@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param() id: number, @Body() body: CreatePermissionDto): Promise<UpdateResult> {
		const { ...data } = body;
		return await this.permissinoService.update( id,
			{
				...data
			}
		);
	}


	//@UseGuards(AuthGuard)
	@Delete(':id')
	async delete(@Param() id: number) {
		return await this.permissinoService.delete(id);
	}
}
