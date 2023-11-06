import { Controller, Post } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('cloudinary')
export class CloudinaryController {
    cloudinaryService: any;
    @Post('upload/single')
@UseInterceptors(FileInterceptor('image'))
@ApiOkResponse({ description: 'Upload image', type: String })
public async uploadSingleImage(@UploadedFile() file: Express.Multer.File) {
        const result = await this.cloudinaryService.uploadFile(file);
  return result.secure_url;
}
}
