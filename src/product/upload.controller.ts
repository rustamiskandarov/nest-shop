import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller()
export class UploadController {

	@Post('upload')
	@UseInterceptors(FileInterceptor('image', {
		storage: diskStorage({
			destination: './uploads',
			filename(_, file, callback){
				const randomName = Array(32).fill(null).map(()=>(Math.round(Math.random()*16)).toString()).join('');
				return callback(null, `${randomName}${extname(file.originalname)}`);
			}
		})
	}))
	uploadFile(@UploadedFile() file) {
		return {
			url: `http://localhost:3000/api/${file.path}`
		}
	}
	@Get('uploads/:filename')
	async getImage(
		@Param('filename') filename,
		@Res() res: Response){
		res.sendFile(filename, {root: 'uploads'})
	}

}
