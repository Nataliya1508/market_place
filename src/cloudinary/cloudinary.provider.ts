import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME || 'debx785xm',
      api_key: process.env.CLOUDINARY_API_KEY || '371461152977454',
      api_secret:
        process.env.CLOUDINARY_API_SECRET || 'C2cxtOFWn5PrAHxlz_C7FVGcV-8',
    });
  },
};
