export class CreateRoleDto{
	
	name: string;

	description?:string;

	permissions?: number[];
}