import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreatePermissionDto } from './DTO/create.permission.dto';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {
	constructor(private readonly permissinoService: PermissionService) { }

	@Get()
	async all(): Promise<any> {
		return await this.permissinoService.all();
	}

	//@UseGuards(AuthGuard)
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
