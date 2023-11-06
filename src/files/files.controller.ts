
import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './files.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
      
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
      
    try {
        const result = await this.fileService.uploadFile(file);
        console.log(file);
      return result;
    } catch (error) {
      throw new HttpException('Failed to upload file', HttpStatus.BAD_REQUEST);
    }
  }
}