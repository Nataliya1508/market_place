import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<any> {
   
    cloudinaryV2.config({
      cloud_name: 'debx785xm',
      api_key: '371461152977454',
      api_secret: 'C2cxtOFWn5PrAHxlz_C7FVGcV-8',
    });

    return new Promise((resolve, reject) => {
const uploadOptions: cloudinary.UploadApiOptions = {
  resource_type: 'image',
};
      cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }).end(file.buffer);
    });
  }
}

