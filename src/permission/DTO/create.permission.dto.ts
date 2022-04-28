import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreatePermissionDto {
	@IsNotEmpty()
	@MinLength(2, {
		message: 'Title is too short',
	})
	@MaxLength(20, {
		message: 'Title is too long',
	})
	name: string;
	@IsNotEmpty()
	@MinLength(2, {
		message: 'Title is too short',
	})
	@MaxLength(250, {
		message: 'Title is too long',
	})
	description: string;
}