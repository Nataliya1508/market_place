import { CloudinaryModule } from '@app/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FilesModule {}
