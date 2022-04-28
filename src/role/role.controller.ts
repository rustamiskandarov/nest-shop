import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateRoleDto } from './models/createRole.dto';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
	constructor(private readonly roleService: RoleService) { }

	@Get()
	async all(): Promise<any> {
		return await this.roleService.get();
	}

	//@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() body: CreateRoleDto): Promise<Role> {
		
		return await this.roleService.create(
			{
				name: body.name,
				permissions: body.permissions.map(id=>({id})),
				description: body.description,

			}
		);
	}

	//@UseGuards(AuthGuard)
	@Get(':id')
	async getOneById(@Param('id') id: number): Promise<Role> {
		let role:Role;
		try {
			role = await this.roleService.findOne(id)
		} catch (error) {
			throw new NotFoundException("Element not found");
		}
		return role;
	}
	
	//@UseGuards(AuthGuard)
	@Put(':id')
	async update(@Param() id: number, @Body() body: CreateRoleDto): Promise<any> {
		try {
			await this.roleService.findOne(id)
		} catch (error) {
			throw new NotFoundException("Element not found");
		}
		await this.roleService.update(id, {name: body.name, description: body.description});
		const role = await this.roleService.findOne(id);

		return await this.roleService.create({
			...role,
			permissions: body.permissions.map(id => ({ id })),
		});
	}

	//@UseGuards(AuthGuard)
	@Delete(':id')
	async delete(@Param() id: number){
		return await this.roleService.delete(id);
	}



}
