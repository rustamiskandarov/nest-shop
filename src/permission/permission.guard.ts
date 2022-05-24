import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private authService: AuthService,
		private userService: UserService,
		private roleService: RoleService
		){

	}
	async canActivate(
		context: ExecutionContext,
	): Promise<boolean> {
		const access = this.reflector.get<string>('access', context.getHandler());
		if(!access){
			return true
		};
		const request = context.switchToHttp().getRequest();
		const id = await this.authService.userId(request);
		const user = await this.userService.findOne({id}, ['role']);
		const role = await this.roleService.findOne({id: user.role.id}, ['permissions'])
		if(request.method === 'GET'){
			return role.permissions.some(p=>(p.name===`view_${access}`)||(p.name === `edit_${access}`));
		}
		return role.permissions.some(p=>p.name === access);
	}
}
